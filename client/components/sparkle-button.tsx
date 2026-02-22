/**
 * sparkle-button.tsx
 */

import React, {useState, useEffect, useRef, useCallback} from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────
export type SparklePhase = 'active' | 'fading' | 'gone';

// ─── Internal constants (all derived at call-time from durationMs) ──────────
function deriveTimings(durationMs: number) {
  const durationS = durationMs / 1000;
  const fadeoutMs = Math.round(durationMs * 0.14); // ~14% of total → ~700ms at 5s
  const blobPeriodS = durationS; // one full morph cycle over the whole animation
  const glowPeriodS = +(durationS / 2).toFixed(2); // two glow pulses per duration
  const ringPeriodS = +(durationS / 2).toFixed(2); // two sonar pings per duration
  const ringOffsetS = +(ringPeriodS / 2).toFixed(2); // second ring offset by half a ping cycle
  const flyPeriodS = +(ringPeriodS * 0.8).toFixed(2); // particle flight slightly shorter than a ring cycle
  const staggerS = +(durationS / 16).toFixed(3); // gap between 8 particles × 2 loops

  return {
    fadeoutMs,
    blobPeriodS,
    glowPeriodS,
    ringPeriodS,
    ringOffsetS,
    flyPeriodS,
    staggerS,
  };
}

// ─── Particle data ──────────────────────────────────────────────────────────
const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const PARTICLE_CHARS = ['✦', '·', '✦', '★', '✦', '·', '✦', '★'];

// ─── SparkleRing ────────────────────────────────────────────────────────────
// Two-div technique: the outer wrapper rotates to the particle's radial angle;
// the inner span only animates along Y, so it flies outward from the edge.
interface SparkleRingProps {
  fading: boolean;
  fadeoutMs: number;
  ringOffsetS: number;
  staggerS: number;
}

const SparkleRing: React.FC<SparkleRingProps> = ({
  fading,
  fadeoutMs,
  ringOffsetS,
  staggerS,
}) => (
  <div
    className="tw-absolute tw-inset-0 tw-pointer-events-none tw-overflow-visible"
    style={{
      opacity: fading ? 0 : 1,
      transition: fading ? `opacity ${fadeoutMs}ms ease-out` : undefined,
    }}
  >
    {/* Sonar ping ring 1 */}
    <div className="tw-absolute tw-inset-0 tw-rounded-full tw-border-2 tw-border-site-accent/80 tw-animate-sparkle-ring" />
    {/* Sonar ping ring 2 — offset so the two alternate */}
    <div
      className="tw-absolute tw-inset-0 tw-rounded-full tw-border tw-border-site-accent/50 tw-animate-sparkle-ring"
      style={{animationDelay: `${ringOffsetS}s`}}
    />
    {/* Radial particles */}
    {PARTICLE_ANGLES.map((angle, i) => (
      <div
        key={i}
        className="tw-absolute tw-top-1/2 tw-left-1/2 tw-pointer-events-none"
        style={{width: 0, height: 0, transform: `rotate(${angle}deg)`}}
      >
        <span
          className="tw-block tw-animate-sparkle-fly tw-text-site-accent"
          style={{
            animationDelay: `${i * staggerS}s`,
            // fill-mode: both keeps opacity:0 during the delay — no center flash on load
            animationFillMode: 'both',
            fontSize: i % 2 === 0 ? '11px' : '7px',
            textShadow:
              '0 0 8px rgba(74,127,255,1), 0 0 18px rgba(74,127,255,0.6)',
            position: 'absolute',
            left: '-4px',
          }}
        >
          {PARTICLE_CHARS[i]}
        </span>
      </div>
    ))}
  </div>
);

// ─── IdleGlowOverlay ────────────────────────────────────────────────────────
// A full-size transparent div that carries the pulsing box-shadow once the
// initial sparkle finishes. Fades in over 800 ms so there's no hard snap.
const IdleGlowOverlay: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // One rAF so the element is in the DOM before we flip opacity
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className="tw-absolute tw-inset-0 tw-rounded-full tw-pointer-events-none tw-animate-sparkle-idle-glow"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 800ms ease-in',
      }}
      aria-hidden="true"
    />
  );
};

// ─── Hook ───────────────────────────────────────────────────────────────────
const HOVER_DURATION_MS = 2500;
const HOVER_FADEOUT_MS = 600;

export interface SparkleEffectResult {
  /** Attach to the <button> element */
  buttonRef: React.RefObject<HTMLButtonElement>;
  /** Tailwind animation class to add while sparkles are active */
  animClass: string;
  /** CSS custom properties to set on the button (drives all animation durations) */
  cssVars: React.CSSProperties | undefined;
  /** The <SparkleRing> overlay — render inside the button, or null when done */
  sparkleOverlay: React.ReactNode;
  /** Wire to the button's onMouseEnter — re-triggers a short sparkle burst */
  onMouseEnter: () => void;
  /** Wire to the button's onClick — stops the idle pulse for the rest of the visit */
  onClick: () => void;
}

export function useSparkleEffect(durationMs: number): SparkleEffectResult {
  const [phase, setPhase] = useState<SparklePhase>('active');
  const [hoverPhase, setHoverPhase] = useState<'idle' | 'active' | 'fading'>(
    'idle',
  );
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fullTimings = deriveTimings(durationMs);
  const hoverTimings = deriveTimings(HOVER_DURATION_MS);
  const {fadeoutMs} = fullTimings;

  // ── Initial sparkle lifecycle ──
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      const btn = buttonRef.current;
      if (btn) {
        // Snapshot the live mid-morph border-radius, then transition it back to a circle.
        // Removing the animation cold would snap instantly; this smoothly collapses it.
        const liveRadius = getComputedStyle(btn).borderRadius;
        btn.style.borderRadius = liveRadius;
        btn.style.transition = `border-radius ${fadeoutMs}ms ease-out, box-shadow ${fadeoutMs}ms ease-out`;
        requestAnimationFrame(() => {
          btn.style.borderRadius = '50%';
        });
      }
      setPhase('fading');
    }, durationMs);

    const goneTimer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.style.borderRadius = '';
        buttonRef.current.style.transition = '';
      }
      setPhase('gone');
    }, durationMs + fadeoutMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, [durationMs, fadeoutMs]);

  // ── Cleanup hover timers on unmount ──
  useEffect(() => {
    return () => {
      if (hoverTimer1.current) clearTimeout(hoverTimer1.current);
      if (hoverTimer2.current) clearTimeout(hoverTimer2.current);
    };
  }, []);

  // ── Hover handler — re-triggers a short sparkle burst ──
  const onMouseEnter = useCallback(() => {
    if (phase !== 'gone' || hoverPhase !== 'idle') return;
    setHoverPhase('active');
    hoverTimer1.current = setTimeout(() => {
      setHoverPhase('fading');
    }, HOVER_DURATION_MS);
    hoverTimer2.current = setTimeout(() => {
      setHoverPhase('idle');
    }, HOVER_DURATION_MS + HOVER_FADEOUT_MS);
  }, [phase, hoverPhase]);

  // ── Click handler — permanently stops the idle pulse ──
  const onClick = useCallback(() => {
    setHasBeenClicked(true);
  }, []);

  // ── Derived values ──
  const isHovering = phase === 'gone' && hoverPhase !== 'idle';
  const activeTimings = isHovering ? hoverTimings : fullTimings;

  const cssVars: React.CSSProperties | undefined =
    phase !== 'gone' || isHovering
      ? ({
          '--blob-period': `${activeTimings.blobPeriodS}s`,
          '--glow-period': `${activeTimings.glowPeriodS}s`,
          '--ring-period': `${activeTimings.ringPeriodS}s`,
          '--fly-period': `${activeTimings.flyPeriodS}s`,
        } as React.CSSProperties)
      : undefined;

  // Treat hover states as their matching main-phase equivalents for class selection
  const effectivePhase = isHovering
    ? (hoverPhase as 'active' | 'fading')
    : phase;
  const animClass =
    effectivePhase === 'active'
      ? 'tw-animate-bubble-alive tw-transition-shadow tw-duration-200'
      : effectivePhase === 'fading'
        ? 'tw-shadow-xl' // blob animation removed; inline transition owns border-radius
        : 'hover:tw-scale-105 tw-transition-transform tw-duration-200';

  // ── Overlay selection ──
  let sparkleOverlay: React.ReactNode;
  if (phase !== 'gone') {
    // Initial animation running
    sparkleOverlay = (
      <SparkleRing
        fading={phase === 'fading'}
        fadeoutMs={fadeoutMs}
        ringOffsetS={fullTimings.ringOffsetS}
        staggerS={fullTimings.staggerS}
      />
    );
  } else if (isHovering) {
    // Hover re-trigger burst
    sparkleOverlay = (
      <SparkleRing
        fading={hoverPhase === 'fading'}
        fadeoutMs={HOVER_FADEOUT_MS}
        ringOffsetS={hoverTimings.ringOffsetS}
        staggerS={hoverTimings.staggerS}
      />
    );
  } else {
    // Idle — show pulsing glow unless the user has already clicked the button
    sparkleOverlay = hasBeenClicked ? null : <IdleGlowOverlay />;
  }

  return {buttonRef, animClass, cssVars, sparkleOverlay, onMouseEnter, onClick};
}
