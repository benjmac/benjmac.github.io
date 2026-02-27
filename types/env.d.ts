/**
 * Build-time constants injected by webpack DefinePlugin.
 * Set CHAT_PROXY_URL in the shell environment before building for production.
 * Defaults to http://localhost:8787 (local wrangler dev) when not set.
 */
declare const __CHAT_PROXY_URL__: string;
