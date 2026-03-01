/** Minimal surface of the Cloudflare Turnstile JS API used by ChatRuntimeProvider. */
interface TurnstileAPI {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      execution: 'render' | 'execute';
      appearance: 'always' | 'execute' | 'interaction-only';
      theme: 'auto' | 'light' | 'dark';
      callback: (token: string) => void;
      'error-callback': (err?: unknown) => void;
      'expired-callback': () => void;
      'before-interactive-callback'?: () => void;
      'after-interactive-callback'?: () => void;
    },
  ): string;
  execute(widgetId: string): void;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

interface Window {
  turnstile?: TurnstileAPI;
  onloadTurnstileCallback?: () => void;
}
