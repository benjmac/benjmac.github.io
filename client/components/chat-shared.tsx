/**
 * chat-shared.tsx
 *
 * Message components and thread body shared between mobile and desktop layouts.
 * `size` prop lets each layout bake in its own font/spacing without ternaries.
 */

import React from 'react'
import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useAui,
  useAuiState,
} from '@assistant-ui/react'
import {Send} from 'lucide-react'

// ── Starter prompt strings ──────────────────────────────────────────────────
export const STARTER_PROMPTS = [
  'Tell me about your experience',
  'What tech do you work with?',
  'Are you available for hire?',
]

// ── Size variants ───────────────────────────────────────────────────────────
type Size = 'sm' | 'lg'

// ── Starter prompts ─────────────────────────────────────────────────────────
interface StarterPromptsProps {
  size: Size
}

export const StarterPrompts: React.FC<StarterPromptsProps> = ({size}) => {
  const aui = useAui()

  const handlePrompt = (prompt: string) => {
    aui.thread().append({
      role: 'user',
      content: [{type: 'text', text: prompt}],
    })
  }

  const isLg = size === 'lg'

  return (
    <div
      className={
        isLg
          ? 'tw-flex tw-flex-col tw-items-center tw-text-center tw-px-6 tw-gap-4 tw-justify-center tw-flex-1 tw-py-6'
          : 'tw-flex tw-flex-col tw-items-center tw-text-center tw-pt-8 tw-px-4 tw-gap-4'
      }
    >
      <div
        className={
          isLg
            ? 'tw-w-14 tw-h-14 tw-rounded-full tw-bg-site-accent tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-xl tw-shadow-[0_4px_16px_rgba(74,127,255,0.35)]'
            : 'tw-w-14 tw-h-14 tw-rounded-full tw-bg-site-accent tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-xl tw-shadow-[0_4px_16px_rgba(74,127,255,0.35)]'
        }
      >
        B
      </div>

      <p
        className={
          isLg
            ? 'tw-text-[16px] tw-text-white/50 tw-leading-relaxed tw-max-w-[300px] tw-m-0'
            : 'tw-text-[13px] tw-text-white/50 tw-leading-relaxed tw-max-w-[300px] tw-m-0'
        }
      >
        Hey there! I&apos;m Ben&apos;s assistant. Ask me anything about his
        work, skills, or availability.
      </p>

      <div className="tw-flex tw-flex-col tw-gap-2.5 tw-w-full">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className={
              isLg
                ? 'tw-text-[16px] tw-py-3.5 tw-px-5 tw-bg-site-msg-bot tw-border tw-border-white/[0.08] tw-rounded-[20px] tw-text-white/90 tw-cursor-pointer tw-text-left tw-transition-all tw-duration-150 hover:tw-bg-white/[0.08] hover:tw-border-site-accent/40 hover:tw-translate-x-0.5 tw-outline-none'
                : 'tw-text-[12.5px] tw-py-2 tw-px-4 tw-bg-site-msg-bot tw-border tw-border-white/[0.08] tw-rounded-[20px] tw-text-white/90 tw-cursor-pointer tw-text-left tw-transition-all tw-duration-150 hover:tw-bg-white/[0.08] hover:tw-border-site-accent/40 hover:tw-translate-x-0.5 tw-outline-none'
            }
            onClick={() => handlePrompt(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── User message ────────────────────────────────────────────────────────────
interface UserMessageProps {
  size: Size
}

export const UserMessage: React.FC<UserMessageProps> = ({size}) => (
  <MessagePrimitive.Root className="tw-flex tw-flex-row-reverse tw-items-end tw-gap-2 tw-animate-fade-up">
    <div
      className={
        size === 'lg'
          ? 'tw-text-[17px] tw-max-w-[82%] tw-px-4 tw-py-2.5 tw-bg-site-msg-user tw-rounded-[16px] tw-rounded-br-[4px] tw-text-white tw-leading-relaxed'
          : 'tw-text-[13.5px] tw-max-w-[78%] tw-px-3 tw-py-2 tw-bg-site-msg-user tw-rounded-[14px] tw-rounded-br-[4px] tw-text-white tw-leading-relaxed'
      }
    >
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
)

// ── Assistant message ───────────────────────────────────────────────────────
interface AssistantMessageProps {
  size: Size
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({size}) => {
  const content = useAuiState((s) => s.message.content)

  const isEmpty =
    !content ||
    content.every((part) => part.type === 'text' && part.text.trim() === '')

  return (
    <MessagePrimitive.Root className="tw-flex tw-flex-row tw-items-end tw-gap-2 tw-animate-fade-up">
      <div
        className={
          size === 'lg'
            ? 'tw-w-8 tw-h-8 tw-rounded-full tw-bg-site-accent tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-[13px] tw-shrink-0 tw-mb-0.5'
            : 'tw-w-7 tw-h-7 tw-rounded-full tw-bg-site-accent tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-[11px] tw-shrink-0 tw-mb-0.5'
        }
      >
        B
      </div>
      {isEmpty ? (
        <div
          className={
            size === 'lg'
              ? 'tw-flex tw-items-center tw-gap-1.5 tw-py-3 tw-px-4 tw-bg-site-msg-bot tw-rounded-[16px] tw-rounded-bl-[4px]'
              : 'tw-flex tw-items-center tw-gap-1 tw-py-2.5 tw-px-3 tw-bg-site-msg-bot tw-rounded-[14px] tw-rounded-bl-[4px]'
          }
        >
          {[0, 200, 400].map((delay) => (
            <span
              key={delay}
              className={
                size === 'lg'
                  ? 'tw-w-2 tw-h-2 tw-rounded-full tw-bg-white/40 tw-animate-bounce'
                  : 'tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-white/35 tw-animate-bounce'
              }
              style={{animationDelay: `${delay}ms`}}
            />
          ))}
        </div>
      ) : (
        <div
          className={
            size === 'lg'
              ? 'tw-text-[17px] tw-max-w-[82%] tw-px-4 tw-py-2.5 tw-bg-site-msg-bot tw-rounded-[16px] tw-rounded-bl-[4px] tw-text-white/90 tw-leading-relaxed'
              : 'tw-text-[13.5px] tw-max-w-[78%] tw-px-3 tw-py-2 tw-bg-site-msg-bot tw-rounded-[14px] tw-rounded-bl-[4px] tw-text-white/90 tw-leading-relaxed'
          }
        >
          <MessagePrimitive.Content />
        </div>
      )}
    </MessagePrimitive.Root>
  )
}

// ── Thread body (viewport + composer) ──────────────────────────────────────
interface ChatThreadProps {
  size: Size
  composerStyle?: React.CSSProperties
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  size,
  composerStyle,
}) => {
  // Stable component wrappers so ThreadPrimitive.Messages doesn't remount on every render
  const components = React.useMemo(
    () => ({
      UserMessage: () => <UserMessage size={size} />,
      AssistantMessage: () => <AssistantMessage size={size} />,
    }),
    [size],
  )

  return (
    <ThreadPrimitive.Root className="tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden tw-bg-site-panel">
      <ThreadPrimitive.Viewport
        className={`tw-flex-1 tw-overflow-y-auto tw-overscroll-contain tw-flex tw-flex-col tw-scroll-smooth tw-bg-site-panel [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent] ${size === 'lg' ? 'tw-px-4 tw-py-4 tw-gap-4' : 'tw-px-3 tw-py-4 tw-gap-3'}`}
      >
        <ThreadPrimitive.Empty>
          <StarterPrompts size={size} />
        </ThreadPrimitive.Empty>
        <ThreadPrimitive.Messages components={components} />
      </ThreadPrimitive.Viewport>

      <div
        className="tw-border-t tw-border-white/[0.08] tw-p-3 tw-shrink-0 tw-bg-site-dark"
        style={composerStyle}
      >
        <ComposerPrimitive.Root
          className={`tw-flex tw-items-center tw-gap-2 tw-bg-site-input tw-border tw-border-white/[0.08] tw-rounded-3xl focus-within:tw-border-site-accent/50 tw-transition-colors tw-duration-150 ${size === 'lg' ? 'tw-pl-5 tw-pr-2 tw-py-2' : 'tw-pl-4 tw-pr-1.5 tw-py-1.5'}`}
        >
          <ComposerPrimitive.Input
            className={`tw-flex-1 tw-bg-transparent tw-border-none tw-outline-none tw-text-white/90 tw-leading-snug tw-resize-none tw-overflow-y-auto tw-py-0.5 placeholder:tw-text-white/35 ${size === 'lg' ? 'tw-text-[17px] tw-max-h-32' : 'tw-text-[15px] tw-max-h-24'}`}
            placeholder="Ask me anything..."
          />
          <ComposerPrimitive.Send
            className={`tw-rounded-full tw-bg-site-accent tw-text-white tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-transition-all tw-duration-150 hover:tw-bg-site-accent-hover active:tw-scale-90 disabled:tw-bg-white/[0.08] disabled:tw-cursor-not-allowed disabled:tw-text-white/35 tw-outline-none ${size === 'lg' ? 'tw-w-10 tw-h-10' : 'tw-w-8 tw-h-8'}`}
          >
            <Send size={size === 'lg' ? 16 : 14} strokeWidth={2.5} />
          </ComposerPrimitive.Send>
        </ComposerPrimitive.Root>
      </div>
    </ThreadPrimitive.Root>
  )
}
