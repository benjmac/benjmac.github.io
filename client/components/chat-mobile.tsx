/**
 * chat-mobile.tsx
 *
 * Full-screen iMessage-style chat overlay for touch devices.
 * Rendered via ReactDOM.createPortal so it escapes any overflow:hidden ancestors.
 *
 * Keyboard fix: tracks window.visualViewport which gives the *exact* visible
 * pixel height above the iOS keyboard in real time. `100dvh` / `100vh` both
 * lie on iOS Safari when the keyboard is up — visualViewport is the only
 * reliable source of truth.
 */

import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {ChevronLeft, MessageCircle} from 'lucide-react'

import {ChatThread} from './chat-shared'
import type {useSparkleEffect} from './sparkle-button'

interface MobileChatProps {
  sparkle: ReturnType<typeof useSparkleEffect>
}

export const MobileChat: React.FC<MobileChatProps> = ({sparkle}) => {
  const {buttonRef, animClass, cssVars, sparkleOverlay} = sparkle
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 280)
  }

  // Track the visual viewport so the overlay always fills exactly the visible
  // area — including shrinking correctly when the iOS keyboard appears.
  const [vpHeight, setVpHeight] = useState<number>(
    () => window.visualViewport?.height ?? window.innerHeight,
  )
  const [vpOffsetTop, setVpOffsetTop] = useState<number>(0)
  useEffect(() => {
    if (!open) return
    const vp = window.visualViewport
    const update = () => {
      setVpHeight(vp?.height ?? window.innerHeight)
      setVpOffsetTop(vp?.offsetTop ?? 0)
    }
    update()
    vp?.addEventListener('resize', update)
    vp?.addEventListener('scroll', update)
    return () => {
      vp?.removeEventListener('resize', update)
      vp?.removeEventListener('scroll', update)
    }
  }, [open])

  // Lock body scroll + kill white background while overlay is visible
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    const prevBg = document.body.style.backgroundColor
    const prevOverscroll = document.body.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.body.style.backgroundColor = '#1b1c1d'
    document.body.style.overscrollBehavior = 'none'
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.backgroundColor = prevBg
      document.body.style.overscrollBehavior = prevOverscroll
    }
  }, [open])

  return (
    <>
      {/* Floating bubble — always visible */}
      <div className="tw-fixed tw-bottom-7 tw-right-7 tw-z-[999]">
        <button
          ref={buttonRef}
          onClick={handleOpen}
          className={`tw-relative tw-w-[52px] tw-h-[52px] tw-rounded-full tw-bg-site-dark tw-border tw-border-white/10 tw-text-white/90 tw-cursor-pointer tw-flex tw-items-center tw-justify-center active:tw-scale-95 tw-outline-none ${animClass}`}
          style={cssVars}
          aria-label="Open assistant"
        >
          <MessageCircle size={22} />
          {sparkleOverlay}
        </button>
      </div>

      {/* Full-screen overlay — portalled to body */}
      {open &&
        ReactDOM.createPortal(
          <div
            className={`tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-[9999] tw-bg-site-panel tw-flex tw-flex-col ${
              closing
                ? 'tw-animate-mobile-slide-out'
                : 'tw-animate-mobile-slide-in'
            }`}
            // dvh shrinks when keyboard appears → panel stays above keyboard
            // fallback to 100vh for browsers that don't support dvh
            style={{
              // Use exact visualViewport dimensions — the only value iOS Safari
              // updates synchronously as the keyboard animates in/out.
              height: vpHeight,
              top: vpOffsetTop,
              overscrollBehavior: 'none',
              paddingTop: vpOffsetTop === 0 ? 'env(safe-area-inset-top)' : 0,
            }}
          >
            {/* iMessage-style header */}
            <div className="tw-bg-site-dark tw-border-b tw-border-white/[0.08] tw-px-3 tw-py-3 tw-shrink-0 tw-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
              <div className="tw-flex tw-items-center">
                <button
                  onClick={handleClose}
                  className="tw-flex tw-items-center tw-gap-0.5 tw-text-site-accent tw-text-[15px] tw-font-medium tw-cursor-pointer tw-outline-none tw-border-none tw-bg-transparent tw-py-1 tw-pl-0 tw-pr-3 tw-shrink-0"
                  aria-label="Back"
                >
                  <ChevronLeft size={22} strokeWidth={2.2} />
                  Back
                </button>

                <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center">
                  <span className="tw-text-[15px] tw-font-semibold tw-text-white/90 tw-leading-tight">
                    Ben&apos;s Assistant
                  </span>
                  <div className="tw-flex tw-items-center tw-gap-1 tw-mt-0.5">
                    <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-site-online tw-shadow-[0_0_6px_rgba(76,175,130,0.6)] tw-animate-pulse" />
                    <span className="tw-text-[11px] tw-text-white/40">
                      Online
                    </span>
                  </div>
                </div>

                {/* Spacer — keeps title centred over the back button */}
                <div className="tw-w-16 tw-shrink-0" />
              </div>
            </div>

            {/* Thread fills remaining space; composer clears home indicator */}
            <ChatThread
              size="lg"
              composerStyle={{
                paddingBottom: 'calc(env(safe-area-inset-bottom) + 10px)',
              }}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
