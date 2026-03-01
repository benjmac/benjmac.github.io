import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from '@assistant-ui/react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import type {
  ChatProxyMessage,
  ChatProxySuccessResponse,
  ChatProxyErrorResponse,
  ChatProxyTextBlock,
  PendingTurnstileChallenge,
} from '../../types';
import {MAX_CHAT_INPUT_LENGTH} from '../constants/client-constants';

declare const __API__: string;
declare const __TURNSTILE_KEY__: string;

/**
 * Callback ref passed to ChatThread — initializes the Turnstile widget the
 * moment the container div mounts, avoiding the timing issue where the panel
 * is closed (and the div absent) when ChatRuntimeProvider first mounts.
 */
// eslint-disable-next-line no-unused-vars
type TurnstileContainerCallback = (el: HTMLDivElement | null) => void;
// eslint-disable-next-line no-unused-vars
type CancelChallengeCallback = () => void;

interface TurnstileContextValue {
  containerCallback: TurnstileContainerCallback | null;
  verifying: boolean;
  cancelChallenge: CancelChallengeCallback;
}

const TurnstileContext = React.createContext<TurnstileContextValue>({
  containerCallback: null,
  verifying: false,
  cancelChallenge: () => {},
});

export function useTurnstileContainer(): TurnstileContainerCallback | null {
  return useContext(TurnstileContext).containerCallback;
}

export function useTurnstileVerifying(): boolean {
  return useContext(TurnstileContext).verifying;
}

export function useCancelChallenge(): CancelChallengeCallback {
  return useContext(TurnstileContext).cancelChallenge;
}

/** Thrown when the user closes the chat while a challenge is pending. Caught silently in the adapter. */
class ChallengeCancelledError extends Error {
  constructor() {
    super('cancelled');
  }
}

// ---------------------------------------------------------------------------
// Message conversion helpers
// ---------------------------------------------------------------------------

/**
 * Converts @assistant-ui/react ThreadMessages to the flat string-content
 * format the proxy worker expects.  Only user/assistant roles are forwarded;
 * tool-call/tool-result/image/system parts are silently dropped.
 */
function toProxyMessages(
  messages: ReadonlyArray<{
    role: string;
    content: ReadonlyArray<{type: string; [key: string]: unknown}>;
  }>,
): ChatProxyMessage[] {
  return messages
    .filter(
      (m): m is typeof m & {role: 'user' | 'assistant'} =>
        m.role === 'user' || m.role === 'assistant',
    )
    .map((m) => ({
      role: m.role,
      content: m.content
        .filter((p) => p.type === 'text')
        .map((p) => (p as {type: 'text'; text: string}).text)
        .join(''),
    }))
    .filter((m) => m.content.length > 0);
}

// ---------------------------------------------------------------------------
// Proxy call
// ---------------------------------------------------------------------------

type ProxyResult = {ok: true; text: string} | {ok: false; text: string};

async function callProxy(
  proxyMessages: ChatProxyMessage[],
  signal: AbortSignal,
  deviceId: string,
  turnstileToken: string,
): Promise<ProxyResult> {
  let response: Response;
  try {
    response = await fetch(__API__, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': deviceId,
        'X-Turnstile-Token': turnstileToken,
      },
      body: JSON.stringify({messages: proxyMessages}),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return {ok: false, text: ''};
    }
    return {
      ok: false,
      text: 'Network error. Please check your connection and try again.',
    };
  }

  if (response.status === 429) {
    let errorText = 'Too many requests. Please try again later.';
    try {
      const err = (await response.json()) as ChatProxyErrorResponse;
      if (typeof err.error === 'string' && err.error.length > 0) {
        errorText = err.error;
      }
    } catch {
      // Ignore JSON parse failure — stick with the default message.
    }
    return {ok: false, text: errorText};
  }

  if (!response.ok) {
    return {
      ok: false,
      text: 'Something went wrong on our end. Please try again.',
    };
  }

  let data: ChatProxySuccessResponse;
  try {
    data = (await response.json()) as ChatProxySuccessResponse;
  } catch {
    return {
      ok: false,
      text: 'Received an unexpected response. Please try again.',
    };
  }

  const text = data.content
    .filter((block): block is ChatProxyTextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('');

  if (!text) {
    return {ok: false, text: 'No response received. Please try again.'};
  }

  return {ok: true, text};
}

// ---------------------------------------------------------------------------
// Adapter factory
// ---------------------------------------------------------------------------

function buildAdapter(
  getDeviceId: () => string,
  executeChallenge: (_signal: AbortSignal) => Promise<string>,
): ChatModelAdapter {
  return {
    async *run({messages, abortSignal}) {
      // Validate the last user message length before hitting the network.
      const lastMessage = messages[messages.length - 1];
      const lastUserText = lastMessage.content
        .filter((p) => p.type === 'text')
        .map((p) => (p as {type: 'text'; text: string}).text)
        .join('');

      if (lastUserText.length > MAX_CHAT_INPUT_LENGTH) {
        yield {
          content: [
            {
              type: 'text' as const,
              text: `Please keep your message under ${MAX_CHAT_INPUT_LENGTH} characters.`,
            },
          ],
        };
        return;
      }

      const proxyMessages = toProxyMessages(messages);
      if (proxyMessages.length === 0) {
        return;
      }

      const deviceId = getDeviceId();

      // Obtain a fresh Turnstile token — holds here until the challenge
      // completes. The button stays in its loading state the whole time.
      let turnstileToken: string;
      try {
        turnstileToken = await executeChallenge(abortSignal);
      } catch (err) {
        // User closed the chat — discard silently, no error message.
        if (err instanceof ChallengeCancelledError) return;
        const msg =
          err instanceof Error
            ? err.message
            : 'Verification failed. Please refresh and try again.';
        yield {content: [{type: 'text' as const, text: msg}]};
        return;
      }

      const result = await callProxy(
        proxyMessages,
        abortSignal,
        deviceId,
        turnstileToken,
      );

      // Empty text means the user hit stop — they already know, so yield nothing.
      if (!result.ok && result.text === '') {
        return;
      }

      yield {content: [{type: 'text' as const, text: result.text}]};
    },
  };
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const ChatRuntimeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const deviceIdRef = useRef<string>('');
  const [verifying, setVerifying] = React.useState(false);

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then(({visitorId}) => {
        deviceIdRef.current = visitorId;
      })
      .catch(() => {});
  }, []);

  // --- Turnstile ------------------------------------------------------------
  const widgetIdRef = useRef<string>('');
  const pendingRef = useRef<PendingTurnstileChallenge | null>(null);
  // Holds the container element if it mounted before the Turnstile script loaded.
  const pendingContainerRef = useRef<HTMLDivElement | null>(null);

  const initWidget = useCallback((el: HTMLDivElement) => {
    if (!window.turnstile) return;
    widgetIdRef.current = window.turnstile.render(el, {
      sitekey: __TURNSTILE_KEY__,
      execution: 'execute',
      appearance: 'interaction-only',
      theme: 'dark',
      callback: (token) => {
        pendingRef.current?.resolve(token);
        pendingRef.current = null;
        setVerifying(false);
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      },
      'error-callback': () => {
        pendingRef.current?.reject(
          new Error('Verification failed. Please refresh and try again.'),
        );
        pendingRef.current = null;
        setVerifying(false);
      },
      'expired-callback': () => {
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      },
      'before-interactive-callback': () => {
        setVerifying(true);
      },
    });
  }, []);

  // Register the Turnstile onload hook once — if the container div is already
  // in the DOM by the time the script fires, initialize immediately.
  useEffect(() => {
    const prev = window.onloadTurnstileCallback;
    window.onloadTurnstileCallback = () => {
      prev?.();
      if (pendingContainerRef.current) {
        initWidget(pendingContainerRef.current);
      }
    };
  }, [initWidget]);

  // Callback ref — called by React when the container div mounts/unmounts.
  // This fires after the chat panel opens, solving the timing problem.
  const containerCallback = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        pendingContainerRef.current = el;
        if (window.turnstile) {
          initWidget(el);
        }
        // If turnstile hasn't loaded yet, onloadTurnstileCallback handles it.
      } else {
        pendingContainerRef.current = null;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = '';
        }
      }
    },
    [initWidget],
  );

  const executeChallenge = useCallback(
    (signal: AbortSignal): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!window.turnstile || !widgetIdRef.current) {
          reject(
            new Error(
              'Verification unavailable. Please refresh and try again.',
            ),
          );
          return;
        }

        // If the adapter is aborted before the challenge resolves, cancel it.
        const onAbort = () => {
          if (pendingRef.current) {
            pendingRef.current.reject(new ChallengeCancelledError());
            pendingRef.current = null;
          }
          setVerifying(false);
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        };
        signal.addEventListener('abort', onAbort, {once: true});

        pendingRef.current = {
          resolve: (token) => {
            signal.removeEventListener('abort', onAbort);
            resolve(token);
          },
          reject: (err) => {
            signal.removeEventListener('abort', onAbort);
            reject(err);
          },
        };
        window.turnstile.reset(widgetIdRef.current);
        window.turnstile.execute(widgetIdRef.current);
      });
    },
    [],
  );

  const cancelChallenge = useCallback(() => {
    if (pendingRef.current) {
      pendingRef.current.reject(new ChallengeCancelledError());
      pendingRef.current = null;
    }
    setVerifying(false);
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  const adapter = useMemo(
    () => buildAdapter(() => deviceIdRef.current, executeChallenge),
    [executeChallenge],
  );

  const runtime = useLocalRuntime(adapter);

  const turnstileValue = useMemo(
    () => ({containerCallback, verifying, cancelChallenge}),
    [containerCallback, verifying, cancelChallenge],
  );

  return (
    <TurnstileContext.Provider value={turnstileValue}>
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </TurnstileContext.Provider>
  );
};
