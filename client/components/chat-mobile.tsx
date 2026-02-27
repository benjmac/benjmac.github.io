import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {ChevronLeft, MessageCircle} from 'lucide-react';

import {ChatThread, OnlineIndicator} from './chat-shared';
import type {useSparkleEffect} from './sparkle-button';

interface MobileChatProps {
  sparkle: ReturnType<typeof useSparkleEffect>;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileChat: React.FC<MobileChatProps> = ({
  sparkle,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const {buttonRef, animClass, cssVars, sparkleOverlay, onMouseEnter, onClick} =
    sparkle;
  const panelRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
    onOpenChange(true);
  };
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      onOpenChange(false);
    }, 280);
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    if (!open) return;
    const vp = window.visualViewport;
    const update = () => {
      const kbHeight = Math.max(
        0,
        window.innerHeight -
          (vp?.height ?? window.innerHeight) -
          (vp?.offsetTop ?? 0),
      );
      setKeyboardHeight(kbHeight);
    };
    update();
    vp?.addEventListener('resize', update);
    vp?.addEventListener('scroll', update);
    return () => {
      vp?.removeEventListener('resize', update);
      vp?.removeEventListener('scroll', update);
      setKeyboardHeight(0);
    };
  }, [open]);

  useEffect(() => {
    if (keyboardHeight === 0) return;
    const viewport = panelRef.current?.querySelector(
      '.tw-overflow-y-auto',
    ) as HTMLElement | null;
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [keyboardHeight]);

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    const prevOverscroll = document.body.style.overscrollBehavior;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overscrollBehavior = 'none';
    document.body.style.backgroundColor = 'var(--color-site-dark)';
    document.documentElement.style.backgroundColor = 'var(--color-site-dark)';
    return () => {
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      document.body.style.overscrollBehavior = prevOverscroll;
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <>
      <div className="tw-fixed tw-bottom-7 tw-right-7 tw-z-[999]">
        <button
          ref={buttonRef}
          onClick={() => {
            onClick();
            handleOpen();
          }}
          className={`tw-relative tw-w-[52px] tw-h-[52px] tw-rounded-full tw-bg-site-dark tw-border tw-border-white/10 tw-text-white/90 tw-cursor-pointer tw-flex tw-items-center tw-justify-center active:tw-scale-95 tw-outline-none ${animClass}`}
          style={cssVars}
          onMouseEnter={onMouseEnter}
          aria-label="Open assistant"
        >
          <MessageCircle size={22} />
          {sparkleOverlay}
        </button>
      </div>

      {/* Full-screen overlay — portalled to body */}
      {open &&
        ReactDOM.createPortal(
          <>
            {/* position:absolute anchors to the layout viewport — won't shift when the mobile keyboard opens. height:10000px ensures coverage at any scroll depth. */}
            <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-[10000px] tw-bg-site-dark tw-z-[9998]" />

            <div
              ref={panelRef}
              className={`tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-flex-col tw-overflow-hidden tw-bg-site-panel tw-pt-[env(safe-area-inset-top)] ${
                closing
                  ? 'tw-animate-mobile-slide-out'
                  : 'tw-animate-mobile-slide-in'
              }`}
            >
              <div className="tw-border-b tw-border-white/[0.08] tw-px-3 tw-py-3 tw-shrink-0 tw-shadow-[0_1px_8px_rgba(0,0,0,0.3)] tw-bg-site-dark">
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
                      Mokka
                    </span>
                    <OnlineIndicator textOpacity="tw-text-white/40" />
                  </div>

                  {/* Spacer — keeps title centred over the back button */}
                  <div className="tw-w-16 tw-shrink-0" />
                </div>
              </div>

              {/* Thread fills remaining space; composer clears home indicator */}
              <ChatThread
                layout="mobile"
                composerStyle={{
                  paddingBottom:
                    keyboardHeight > 0
                      ? `${keyboardHeight}px`
                      : 'calc(env(safe-area-inset-bottom) + 10px)',
                }}
              />
            </div>
          </>,
          document.body,
        )}
    </>
  );
};
