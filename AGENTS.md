# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Local development (run in two separate terminals)
npm run build-client-watch   # webpack watch mode (rebuilds on save)
npm start                    # static server at http://localhost:3000

# One-off builds
npm run build-client         # production build
npm run build-client-dev     # development build (no watch)

# Code quality
npm run lint                 # eslint
npm run lint-fix             # eslint --fix
npm run prettify             # prettier on all source files

# Deploy to GitHub Pages (gh-pages branch)
npm run deploy
```

Requires Node >= 24. Webpack bakes `__API__` and `__TURNSTILE_KEY__` at compile time from `.env` — build fails without those vars set.

## Environment Variables

Create a `.env` file (not committed) with:

```
API_URL_DEV=<proxy worker URL for local dev>
API_URL_PROD=<proxy worker URL for production>
TURNSTILE_KEY_DEV=<Cloudflare Turnstile site key for dev>
TURNSTILE_KEY_PROD=<Cloudflare Turnstile site key for prod>
```

## Architecture

**Static React SPA** bundled by Webpack → `public/` → served via GitHub Pages.

### Layer Overview

| Layer        | Location              | Role                                                        |
| ------------ | --------------------- | ----------------------------------------------------------- |
| Types        | `types/index.ts`      | All shared TypeScript interfaces                            |
| Shared data  | `shared/constants.ts` | Portfolio content (skills, work history) — inlined at build |
| Client state | `client/state/`       | React contexts                                              |
| Components   | `client/components/`  | UI                                                          |
| Build config | `webpack.config.js`   | Entry: `client/index.tsx`, output: `public/bundle.js`       |

### State / Context

**`ContentContextProvider`** (`client/state/content.tsx`) — wraps the app and exposes static portfolio data (skills, work experience) inlined from `shared/constants.ts`. No network requests.

**`ChatRuntimeProvider`** (`client/state/chat-runtime.tsx`) — the more complex provider. It:

- Wraps `@assistant-ui/react`'s `AssistantRuntimeProvider` with a custom `ChatModelAdapter`
- Fingerprints the device via `@fingerprintjs/fingerprintjs` and sends `X-Device-ID` with each request
- Manages the entire Cloudflare Turnstile challenge lifecycle (widget init, execute, cancel, abort) via a `TurnstileContext` consumed by chat components
- Posts to the `__API__` proxy (a Cloudflare Worker in `ai-chat-proxy/`) which holds the actual Claude API key

### Chat Widget

`ChatWidget` renders either `MobileChat` or `DesktopChat` (detected once at module load via `navigator.userAgent`). Both share the same `chat-shared.tsx` thread UI. Opening/closing the widget triggers Turnstile challenge cancellation.

### Routing

React Router v5 (`withRouter`) with four routes: `/about`, `/resume`, `/technical-skills`, `/work-experience`. Default redirect → `/about`.

### AI Proxy

The companion project at `/Users/benmccain/Desktop/apps/ai-chat-proxy` is a Cloudflare Worker that:

- Receives `{ messages: ChatProxyMessage[] }` from this frontend
- Validates the Turnstile token and enforces rate limits via device ID
- Calls the Claude API and returns a `ChatProxySuccessResponse`

### Styling

- **Tailwind CSS** (scoped to chat widget via `tailwind.config.js`) — loaded via `postcss-loader`
- **SCSS** for main app styles (`client/styles/`)
- **Semantic UI React** for most portfolio page components
- **No inline styles.** All styles belong in `.scss` files under `client/styles/` or Tailwind classes in `tailwind.css`. Never use the `style` prop.

## Security

**This is a public repository.** Security is the top priority in every change.

- **Never commit secrets.** No API keys, tokens, `.env` files, or credentials — ever. All secrets live in `.env` (gitignored) and are injected at build time via webpack `DefinePlugin`.
- **The frontend holds no secrets.** `__API__` and `__TURNSTILE_KEY__` are public-facing values baked into the bundle — treat them as such. The actual Anthropic API key lives only in the Cloudflare Worker environment.
- **Validate on the backend, not just the client.** Client-side checks (e.g. `MAX_CHAT_INPUT_LENGTH`) are UX guards only. The proxy enforces all real limits.
- **XSS.** Never use `dangerouslySetInnerHTML`. Never inject unsanitized user input into the DOM.
- **Dependency hygiene.** Be cautious adding new dependencies to a public repo — prefer minimal, well-maintained packages.

## Code Conventions

- **Modularity first.** Each component gets its own file. If a file is growing large, split it. Prefer small, focused modules over monolithic ones.
- **No inline styles.** Use SCSS files or Tailwind utility classes — never the `style` prop.
- **Clean, legible code.** Prefer clarity over cleverness. Name things well. Keep functions short.
- **No comments.** Code should be self-documenting. Only add a comment when something would genuinely surprise a senior engineer — not to explain what the code does, but why it does something non-obvious.

## API Contract

Any change to what the frontend sends must be verified against the proxy worker (`ai-chat-proxy/src/index.ts`).

**Request** — `POST __API__`

```
Headers:
  Content-Type: application/json
  X-Device-ID: <fingerprintjs visitorId>
  X-Turnstile-Token: <Cloudflare Turnstile token>

Body:
  { "messages": Anthropic.MessageParam[] }
  // MessageParam: { role: "user" | "assistant", content: string }
```

**Success response** — `200`

```json
{
  "role": "assistant",
  "content": [{"type": "text", "text": "..."}],
  "stop_reason": "end_turn"
}
```

**Error response** — `4xx/5xx`

```json
{"error": "<message>"}
```
