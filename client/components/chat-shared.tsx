import React from 'react';
import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useAui,
  useAuiState,
} from '@assistant-ui/react';
import {Send, Square} from 'lucide-react';
import {MAX_CHAT_INPUT_LENGTH} from '../constants/client-constants';
import {
  useTurnstileContainer,
  useTurnstileVerifying,
} from '../state/chat-runtime';

export const OnlineIndicator: React.FC<{textOpacity?: string}> = ({
  textOpacity = 'tw-text-white/50',
}) => (
  <div className="tw-flex tw-items-center tw-gap-1 tw-mt-0.5">
    <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-site-online tw-animate-pulse tw-shadow-online-glow" />
    <span className={`tw-text-[11px] ${textOpacity}`}>Online</span>
  </div>
);

export const STARTER_PROMPTS = [
  'Tell me about his experience',
  'What tech does he work with?',
  'How did he get into engineering?',
];

type Layout = 'mobile' | 'desktop';

const styles = {
  mobile: {
    starterContainer:
      'tw-flex tw-flex-col tw-items-center tw-text-center tw-px-6 tw-gap-4 tw-justify-center tw-flex-1 tw-py-6',
    starterText:
      'tw-text-[16px] tw-text-white/50 tw-leading-relaxed tw-max-w-[300px] tw-m-0',
    promptButton:
      'tw-text-[16px] tw-py-3.5 tw-px-5 tw-bg-site-msg-bot tw-border tw-border-white/[0.08] tw-rounded-[20px] tw-text-white/90 tw-cursor-pointer tw-text-left tw-transition-all tw-duration-150 hover:tw-bg-white/[0.08] hover:tw-border-site-accent/40 hover:tw-translate-x-0.5 tw-outline-none',
    userMsg:
      'tw-text-[17px] tw-max-w-[82%] tw-px-4 tw-py-2.5 tw-bg-site-msg-user tw-rounded-[16px] tw-rounded-br-[4px] tw-text-white tw-leading-relaxed tw-break-words',
    assistantAvatar:
      'tw-w-8 tw-h-8 tw-rounded-full tw-overflow-hidden tw-shrink-0 tw-mb-0.5',
    typingBubble:
      'tw-flex tw-items-center tw-gap-1.5 tw-py-3 tw-px-4 tw-bg-site-msg-bot tw-rounded-[16px] tw-rounded-bl-[4px]',
    typingDot: 'tw-w-2 tw-h-2 tw-rounded-full tw-bg-white/40 tw-animate-bounce',
    botMsg:
      'tw-text-[17px] tw-max-w-[82%] tw-px-4 tw-py-2.5 tw-bg-site-msg-bot tw-rounded-[16px] tw-rounded-bl-[4px] tw-text-white/90 tw-leading-relaxed tw-break-words',
    charCount: 'tw-text-[13px]',
    viewport: 'tw-px-4 tw-py-4 tw-gap-4',
    composerPill: 'tw-pl-5 tw-pr-2 tw-py-2',
    composerInput: 'tw-text-[17px] tw-max-h-32',
    sendButton: 'tw-w-10 tw-h-10',
    sendIconSize: 16,
  },
  desktop: {
    starterContainer:
      'tw-flex tw-flex-col tw-items-center tw-text-center tw-pt-8 tw-px-4 tw-gap-4',
    starterText:
      'tw-text-[13px] tw-text-white/50 tw-leading-relaxed tw-max-w-[300px] tw-m-0',
    promptButton:
      'tw-text-[12.5px] tw-py-2 tw-px-4 tw-bg-site-msg-bot tw-border tw-border-white/[0.08] tw-rounded-[20px] tw-text-white/90 tw-cursor-pointer tw-text-left tw-transition-all tw-duration-150 hover:tw-bg-white/[0.08] hover:tw-border-site-accent/40 hover:tw-translate-x-0.5 tw-outline-none',
    userMsg:
      'tw-text-[13.5px] tw-max-w-[78%] tw-px-3 tw-py-2 tw-bg-site-msg-user tw-rounded-[14px] tw-rounded-br-[4px] tw-text-white tw-leading-relaxed tw-break-words',
    assistantAvatar:
      'tw-w-7 tw-h-7 tw-rounded-full tw-overflow-hidden tw-shrink-0 tw-mb-0.5',
    typingBubble:
      'tw-flex tw-items-center tw-gap-1 tw-py-2.5 tw-px-3 tw-bg-site-msg-bot tw-rounded-[14px] tw-rounded-bl-[4px]',
    typingDot:
      'tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-white/35 tw-animate-bounce',
    botMsg:
      'tw-text-[13.5px] tw-max-w-[78%] tw-px-3 tw-py-2 tw-bg-site-msg-bot tw-rounded-[14px] tw-rounded-bl-[4px] tw-text-white/90 tw-leading-relaxed tw-break-words',
    charCount: 'tw-text-[11px]',
    viewport: 'tw-px-3 tw-py-4 tw-gap-3',
    composerPill: 'tw-pl-4 tw-pr-1.5 tw-py-1.5',
    composerInput: 'tw-text-[15px] tw-max-h-24',
    sendButton: 'tw-w-8 tw-h-8',
    sendIconSize: 14,
  },
} as const satisfies Record<Layout, Record<string, string | number>>;

const AVATAR_CLASS =
  'tw-w-14 tw-h-14 tw-rounded-full tw-overflow-hidden tw-shrink-0 tw-shadow-[0_4px_16px_rgba(74,127,255,0.35)]';

interface StarterPromptsProps {
  layout: Layout;
}

export const StarterPrompts: React.FC<StarterPromptsProps> = ({layout}) => {
  const aui = useAui();

  const handlePrompt = (prompt: string) => {
    aui.thread().append({
      role: 'user',
      content: [{type: 'text', text: prompt}],
    });
  };

  const s = styles[layout];

  return (
    <div className={s.starterContainer}>
      <div className={AVATAR_CLASS}>
        <img
          src="images/mokka.png"
          alt="Mokka"
          className="tw-w-full tw-h-full tw-object-cover"
        />
      </div>

      <p className={s.starterText}>
        Hey there! I&apos;m Mokka, Ben&apos;s assistant. Ask me anything about
        his work and skills.
      </p>

      <div className="tw-flex tw-flex-col tw-gap-2.5 tw-w-full">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className={s.promptButton}
            onClick={() => handlePrompt(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

// ── User message ────────────────────────────────────────────────────────────
interface UserMessageProps {
  layout: Layout;
}

export const UserMessage: React.FC<UserMessageProps> = ({layout}) => (
  <MessagePrimitive.Root className="tw-flex tw-flex-row-reverse tw-items-end tw-gap-2 tw-animate-fade-up">
    <div className={styles[layout].userMsg}>
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

interface AssistantMessageProps {
  layout: Layout;
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({layout}) => {
  const content = useAuiState((s) => s.message.content);
  const status = useAuiState(
    (s) => (s.message as {status?: {type: string}}).status,
  );
  const [isNew, setIsNew] = React.useState(false);
  const verifying = useTurnstileVerifying();

  const isEmpty =
    !content ||
    content.every((part) => part.type === 'text' && part.text.trim() === '');

  // Initialise to the *current* isEmpty so remounted messages that already have
  // content (e.g. after closing/reopening the panel) never trigger the glow.
  const wasEmptyRef = React.useRef(isEmpty);

  React.useEffect(() => {
    if (wasEmptyRef.current && !isEmpty) {
      setIsNew(true);
    }
    wasEmptyRef.current = isEmpty;
  }, [isEmpty]);

  const s = styles[layout];

  // Don't show typing dots if Turnstile is pending (bot isn't thinking yet),
  // or if the message completed with no content (cancelled/aborted run).
  if (isEmpty && (verifying || status?.type === 'complete')) return <></>;

  return (
    <MessagePrimitive.Root className="tw-flex tw-flex-row tw-items-end tw-gap-2 tw-animate-fade-up">
      <div className={s.assistantAvatar}>
        <img
          src="images/mokka.png"
          alt="Mokka"
          className="tw-w-full tw-h-full tw-object-cover"
        />
      </div>
      {isEmpty ? (
        <div className={s.typingBubble}>
          {[0, 200, 400].map((delay) => (
            <span
              key={delay}
              className={s.typingDot}
              style={{animationDelay: `${delay}ms`}}
            />
          ))}
        </div>
      ) : (
        <div
          className={`${s.botMsg}${isNew ? ' tw-animate-msg-arrive' : ''}`}
          onAnimationEnd={() => setIsNew(false)}
        >
          <MessagePrimitive.Content />
        </div>
      )}
    </MessagePrimitive.Root>
  );
};

const ComposerCharCount: React.FC<{layout: Layout}> = ({layout}) => {
  const text = useAuiState((s) => s.composer.text);
  const used = text.length;
  const remaining = MAX_CHAT_INPUT_LENGTH - used;

  const isWarning = remaining <= 50;
  const isCritical = remaining <= 10;

  return (
    <div
      className={`tw-text-right tw-mt-1.5 tw-pr-1 tw-tabular-nums tw-transition-colors tw-duration-150 ${
        isCritical
          ? 'tw-text-red-400'
          : isWarning
            ? 'tw-text-amber-400'
            : 'tw-text-white/50'
      } ${styles[layout].charCount}`}
    >
      {used} / {MAX_CHAT_INPUT_LENGTH}
    </div>
  );
};

interface ChatThreadProps {
  layout: Layout;
  composerStyle?: React.CSSProperties;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  layout,
  composerStyle,
}) => {
  const [shaking, setShaking] = React.useState(false);
  const turnstileContainer = useTurnstileContainer();
  const verifying = useTurnstileVerifying();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.currentTarget.value.length >= MAX_CHAT_INPUT_LENGTH &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      setShaking(true);
    }
  };

  // Stable component wrappers so ThreadPrimitive.Messages doesn't remount on every render
  const components = React.useMemo(
    () => ({
      UserMessage: () => <UserMessage layout={layout} />,
      AssistantMessage: () => <AssistantMessage layout={layout} />,
    }),
    [layout],
  );

  return (
    <ThreadPrimitive.Root className="tw-relative tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden tw-bg-site-panel">
      {verifying && (
        <div className="tw-absolute tw-inset-0 tw-z-20 tw-bg-black/60 tw-backdrop-blur-sm" />
      )}
      {turnstileContainer && (
        <div className="tw-absolute tw-inset-0 tw-z-30 tw-pointer-events-none tw-flex tw-items-center tw-justify-center">
          <div
            className={
              verifying
                ? 'tw-pointer-events-auto tw-bg-site-panel tw-border tw-border-white/[0.1] tw-rounded-2xl tw-p-5 tw-shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
                : 'tw-invisible'
            }
          >
            <div ref={turnstileContainer} />
          </div>
        </div>
      )}
      <ThreadPrimitive.Viewport
        className={`tw-flex-1 tw-overflow-y-auto tw-overscroll-contain tw-flex tw-flex-col tw-scroll-smooth tw-bg-site-panel [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent] ${styles[layout].viewport}`}
      >
        <ThreadPrimitive.Empty>
          <StarterPrompts layout={layout} />
        </ThreadPrimitive.Empty>
        {/* Spacer: mobile only. Pushes messages to the bottom (iMessage-style)
            when the chat is sparse. Collapses once messages fill the viewport. */}
        {layout === 'mobile' && <div className="tw-flex-1" />}
        <ThreadPrimitive.Messages components={components} />
      </ThreadPrimitive.Viewport>

      <div
        className="tw-border-t tw-border-white/[0.08] tw-p-3 tw-shrink-0 tw-bg-site-dark"
        style={composerStyle}
      >
        <ComposerPrimitive.Root
          className={`tw-flex tw-items-center tw-gap-2 tw-bg-site-input tw-border tw-border-white/[0.08] tw-rounded-3xl focus-within:tw-border-site-accent/50 tw-transition-colors tw-duration-150 ${shaking ? 'tw-animate-shake' : ''} ${styles[layout].composerPill}`}
          onAnimationEnd={() => setShaking(false)}
        >
          <ComposerPrimitive.Input
            className={`selection:tw-bg-site-accent-selection selection:tw-text-white tw-flex-1 tw-bg-transparent tw-border-none tw-outline-none tw-text-white/90 tw-leading-snug tw-resize-none tw-overflow-y-auto tw-py-0.5 placeholder:tw-text-white/35 ${styles[layout].composerInput}`}
            placeholder="Ask me anything..."
            maxLength={MAX_CHAT_INPUT_LENGTH}
            onKeyDown={handleKeyDown}
            disabled={verifying}
          />
          <ThreadPrimitive.If running>
            <ComposerPrimitive.Cancel
              className={`tw-rounded-full tw-bg-white/[0.12] tw-text-white tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-transition-all tw-duration-150 hover:tw-bg-white/20 active:tw-scale-90 tw-outline-none ${styles[layout].sendButton}`}
            >
              <Square
                size={styles[layout].sendIconSize}
                strokeWidth={2.5}
                fill="currentColor"
              />
            </ComposerPrimitive.Cancel>
          </ThreadPrimitive.If>
          <ThreadPrimitive.If running={false}>
            <ComposerPrimitive.Send
              className={`tw-rounded-full tw-bg-site-accent tw-text-white tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-transition-all tw-duration-150 hover:tw-bg-site-accent-hover active:tw-scale-90 disabled:tw-bg-white/[0.08] disabled:tw-cursor-not-allowed disabled:tw-text-white/35 tw-outline-none ${styles[layout].sendButton}`}
            >
              <Send size={styles[layout].sendIconSize} strokeWidth={2.5} />
            </ComposerPrimitive.Send>
          </ThreadPrimitive.If>
        </ComposerPrimitive.Root>
        <ComposerCharCount layout={layout} />
      </div>
    </ThreadPrimitive.Root>
  );
};
