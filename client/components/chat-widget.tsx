/**
 * chat-widget.tsx
 *
 * Entry point. Detects touch vs pointer device and renders the appropriate layout.
 * All chat UI lives in chat-mobile.tsx / chat-desktop.tsx.
 * All shared message components live in chat-shared.tsx.
 */

import React, {useState, useEffect} from 'react'

import '../styles/tailwind.css'
import {useSparkleEffect} from './sparkle-button'
import {MobileChat} from './chat-mobile'
import {DesktopChat} from './chat-desktop'

// ── THE ONE VALUE TO CHANGE — all sparkle timings derive from this ──────────
const SPARKLE_DURATION_MS = 10_000

// ── Detect touch devices (no hover + coarse pointer = finger) ───────────────
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

// ── Root widget — just picks the right layout ────────────────────────────────
export const ChatWidget: React.FC = () => {
  const sparkle = useSparkleEffect(SPARKLE_DURATION_MS)
  const isMobile = useIsMobile()
  return isMobile ? (
    <MobileChat sparkle={sparkle} />
  ) : (
    <DesktopChat sparkle={sparkle} />
  )
}

export default ChatWidget
