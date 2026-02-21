/**
 * chat-desktop.tsx
 *
 * Floating 360×520 panel for pointer/mouse devices.
 * Uses AssistantModalPrimitive for the open/close toggle + animation.
 */

import React from 'react'
import {AssistantModalPrimitive} from '@assistant-ui/react'
import {MessageCircle, X} from 'lucide-react'

import {ChatThread} from './chat-shared'
import type {useSparkleEffect} from './sparkle-button'

interface DesktopChatProps {
  sparkle: ReturnType<typeof useSparkleEffect>
}

export const DesktopChat: React.FC<DesktopChatProps> = ({sparkle}) => {
  const {buttonRef, animClass, cssVars, sparkleOverlay} = sparkle

  return (
    <AssistantModalPrimitive.Root>
      <AssistantModalPrimitive.Anchor className="tw-fixed tw-bottom-7 tw-right-7 tw-z-[999]">
        <AssistantModalPrimitive.Trigger asChild>
          <button
            ref={buttonRef}
            className={`tw-group tw-relative tw-w-[52px] tw-h-[52px] tw-rounded-full tw-bg-site-dark tw-border tw-border-white/10 tw-text-white/90 tw-cursor-pointer tw-flex tw-items-center tw-justify-center active:tw-scale-95 tw-outline-none ${animClass}`}
            style={cssVars}
            aria-label="Open assistant"
          >
            <span className="tw-absolute tw-flex tw-transition-all tw-duration-200 tw-group-data-[state=open]:tw-opacity-0 tw-group-data-[state=open]:tw-scale-50">
              <MessageCircle size={22} />
            </span>
            <span className="tw-absolute tw-flex tw-opacity-0 tw-scale-50 tw-transition-all tw-duration-200 tw-group-data-[state=open]:tw-opacity-100 tw-group-data-[state=open]:tw-scale-100">
              <X size={20} />
            </span>
            {sparkleOverlay}
          </button>
        </AssistantModalPrimitive.Trigger>
      </AssistantModalPrimitive.Anchor>

      <AssistantModalPrimitive.Content
        className="tw-w-[360px] tw-h-[520px] tw-bg-site-panel tw-border tw-border-white/[0.08] tw-rounded-2xl tw-shadow-[0_8px_40px_rgba(0,0,0,0.6)] tw-flex tw-flex-col tw-overflow-hidden tw-z-[1000] data-[state=open]:tw-animate-panel-in data-[state=closed]:tw-animate-panel-out"
        side="top"
        align="end"
        sideOffset={12}
      >
        {/* Header */}
        <div className="tw-bg-site-dark tw-border-b tw-border-white/[0.08] tw-px-4 tw-py-3 tw-shrink-0 tw-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
          <div className="tw-flex tw-items-center tw-gap-2.5">
            <div className="tw-w-9 tw-h-9 tw-rounded-full tw-bg-site-accent tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-sm tw-shrink-0">
              B
            </div>
            <div className="tw-flex-1">
              <div className="tw-text-sm tw-font-semibold tw-text-white/90 tw-leading-tight">
                Ben&apos;s Assistant
              </div>
              <div className="tw-flex tw-items-center tw-gap-1 tw-mt-0.5">
                <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-site-online tw-shadow-[0_0_6px_rgba(76,175,130,0.6)] tw-animate-pulse" />
                <span className="tw-text-[11px] tw-text-white/50">Online</span>
              </div>
            </div>
            <AssistantModalPrimitive.Trigger asChild>
              <button
                className="tw-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-rounded-full tw-text-white/40 hover:tw-text-white/80 hover:tw-bg-white/[0.08] tw-transition-all tw-duration-150 tw-outline-none tw-border-none tw-bg-transparent tw-cursor-pointer"
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </AssistantModalPrimitive.Trigger>
          </div>
        </div>

        <ChatThread size="sm" />
      </AssistantModalPrimitive.Content>
    </AssistantModalPrimitive.Root>
  )
}
