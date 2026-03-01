/** @type {import('tailwindcss').Config} */
module.exports = {
  // Only scan the chat widget — nothing else in the project is touched by Tailwind
  content: [
    './client/components/chat-widget.tsx',
    './client/components/chat-mobile.tsx',
    './client/components/chat-desktop.tsx',
    './client/components/chat-shared.tsx',
    './client/components/sparkle-button.tsx',
    './client/state/chat-runtime.tsx',
  ],

  // tw- prefix means zero collision with Semantic UI or any existing SCSS
  prefix: 'tw-',

  // Skip Preflight (the CSS reset) — it would break Semantic UI if injected globally
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {
      // Site palette — values reference CSS custom properties defined in app.scss
      // so the entire palette can be changed from one place.
      colors: {
        'site-dark': 'var(--color-site-dark)',
        'site-panel': 'var(--color-site-panel)',
        'site-msg-bot': 'var(--color-site-msg-bot)',
        'site-msg-user': 'var(--color-site-msg-user)',
        'site-input': 'var(--color-site-input)',
        'site-accent': 'var(--color-site-accent)',
        'site-accent-hover': 'var(--color-site-accent-hover)',
        'site-accent-selection': 'var(--color-site-accent-selection)',
        'site-online': 'var(--color-site-online)',
      },
      // Custom animations for panel open/close and message appearance
      animation: {
        'panel-in': 'panel-in 0.22s cubic-bezier(0.16,1,0.3,1)',
        'panel-out': 'panel-out 0.18s ease-in',
        'fade-up': 'fade-up 0.2s ease',
        // Mobile full-screen slide
        'mobile-slide-in': 'mobile-slide-in 0.38s cubic-bezier(0.16,1,0.3,1)',
        'mobile-slide-out': 'mobile-slide-out 0.28s ease-in forwards',
        // Sonar ping rings — duration driven by CSS var set from SPARKLE_DURATION_MS
        'sparkle-ring':
          'sparkle-ring var(--ring-period, 2.5s) ease-out infinite',
        // Particles fly radially outward (parent div provides the rotation angle)
        'sparkle-fly': 'sparkle-fly var(--fly-period, 2s) ease-out infinite',
        // Button jelly + glow combo — durations driven by CSS vars
        'bubble-alive':
          'blob-morph var(--blob-period, 5s) ease-in-out infinite, glow-pulse var(--glow-period, 2.5s) ease-in-out infinite',
        shake: 'shake 0.4s ease',
        // Magenta glow that flashes briefly on the bot bubble when a new message lands
        'msg-arrive': 'msg-arrive 4s linear forwards',
        // Subtle pulsing blue ring on the button while idle — signals AI-powered without distracting motion
        'sparkle-idle-glow': 'sparkle-idle-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'panel-in': {
          from: {opacity: '0', transform: 'translateY(12px) scale(0.96)'},
          to: {opacity: '1', transform: 'translateY(0) scale(1)'},
        },
        'panel-out': {
          from: {opacity: '1', transform: 'translateY(0) scale(1)'},
          to: {opacity: '0', transform: 'translateY(8px) scale(0.97)'},
        },
        'fade-up': {
          from: {opacity: '0', transform: 'translateY(6px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        // Mobile full-screen slide up from bottom
        'mobile-slide-in': {
          from: {transform: 'translateY(100%)'},
          to: {transform: 'translateY(0)'},
        },
        'mobile-slide-out': {
          from: {transform: 'translateY(0)'},
          to: {transform: 'translateY(100%)'},
        },
        // Sonar ping: ring expands from button edge outward
        'sparkle-ring': {
          '0%': {transform: 'scale(1)', opacity: '0.85'},
          '100%': {transform: 'scale(3)', opacity: '0'},
        },
        // Particle starts just outside the button edge (30px = 26px radius + 4px).
        // opacity: 0 at 0% + fill-mode: both on the element keeps it invisible
        // during animationDelay so particles don't flash in the centre on load.
        'sparkle-fly': {
          '0%': {transform: 'translateY(-30px) scale(0.5)', opacity: '0'},
          '12%': {transform: 'translateY(-36px) scale(1.3)', opacity: '1'},
          '75%': {opacity: '0.6'},
          '100%': {transform: 'translateY(-70px) scale(0.1)', opacity: '0'},
        },
        // Jelly / goo effect: border-radius morphs between organic blob shapes
        'blob-morph': {
          '0%, 100%': {borderRadius: '50%'},
          '20%': {borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%'},
          '40%': {borderRadius: '40% 60% 45% 55% / 55% 45% 60% 40%'},
          '60%': {borderRadius: '55% 45% 60% 40% / 40% 60% 50% 50%'},
          '80%': {borderRadius: '45% 55% 40% 60% / 60% 40% 55% 45%'},
        },
        // Quick horizontal shake — triggered when the user hits the char limit
        shake: {
          '0%, 100%': {transform: 'translateX(0)'},
          '15%': {transform: 'translateX(-5px)'},
          '30%': {transform: 'translateX(5px)'},
          '45%': {transform: 'translateX(-4px)'},
          '60%': {transform: 'translateX(4px)'},
          '75%': {transform: 'translateX(-2px)'},
          '90%': {transform: 'translateX(2px)'},
        },
        // Magenta arrival flash on bot message bubble
        'msg-arrive': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(232, 121, 249, 0)',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
          },
          '28%': {
            boxShadow: '0 0 11px 3.3px rgba(232, 121, 249, 0.55)',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.8, 1)',
          },
          '100%': {boxShadow: '0 0 0 0 rgba(232, 121, 249, 0)'},
        },
        // Idle button: box-shadow pulse on overlay div — clearly visible but calm
        'sparkle-idle-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 1px rgba(74,127,255,0.06)',
          },
          '50%': {
            boxShadow:
              '0 0 0 6px rgba(74,127,255,0.25), 0 0 18px rgba(74,127,255,0.18)',
          },
        },
        // Breathing glow ring that expands outward and fades
        'glow-pulse': {
          '0%, 100%': {
            boxShadow:
              '0 0 0 0 rgba(74,127,255,0.6), 0 4px 20px rgba(0,0,0,0.5)',
          },
          '50%': {
            boxShadow:
              '0 0 0 14px rgba(74,127,255,0), 0 4px 32px rgba(74,127,255,0.3)',
          },
        },
      },
    },
  },
};
