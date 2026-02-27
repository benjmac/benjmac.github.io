import React, {useMemo} from 'react';
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from '@assistant-ui/react';

import type {
  ChatProxyMessage,
  ChatProxySuccessResponse,
  ChatProxyErrorResponse,
  ChatProxyTextBlock,
} from '../../types';
import {MAX_CHAT_INPUT_LENGTH} from '../constants/client-constants';

// Injected by webpack DefinePlugin at build time (see webpack.config.js).
// The global declaration in types/env.d.ts covers the project-wide case;
// this module-level declaration satisfies the TS compiler for this file.
declare const __CHAT_PROXY_URL__: string;

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
): Promise<ProxyResult> {
  let response: Response;
  try {
    response = await fetch(__CHAT_PROXY_URL__, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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

function buildAdapter(): ChatModelAdapter {
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

      const result = await callProxy(proxyMessages, abortSignal);

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
  // Stable adapter — never recreated, never coupled to the router.
  // Page context is snapshotted from window.location.hash at send time.
  const adapter = useMemo(() => buildAdapter(), []);

  const runtime = useLocalRuntime(adapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
};
