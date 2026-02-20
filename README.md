# benjmac.github.io

Personal portfolio site built with React, hosted on GitHub Pages.

🌐 **Live site:** https://benjmac.github.io

---

## Development

Requires Node >= 24 (use [nvm](https://github.com/nvm-sh/nvm)).

```bash
nvm use 24
npm install
```

**To build and preview locally**, run these two commands in separate terminals:

```bash
# Terminal 1 — webpack watch (rebuilds on file changes)
npm run build-client-watch

# Terminal 2 — static file server
npm start
```

Then open http://localhost:3000 in your browser. Webpack will rebuild automatically when you edit files — just refresh the browser to see changes.

---

## Deploying to GitHub Pages

```bash
npm run deploy
```

This runs two steps automatically:

1.  **`predeploy`** — builds the production bundle via webpack into `public/`
2.  **`deploy`** — pushes the contents of `public/` to the `gh-pages` branch via the `gh-pages` package

GitHub detects the push and serves the updated site within ~1 minute.

### First-time GitHub setup

1.  Push this repo to GitHub
2.  Go to **Settings → Pages**
3.  Under **Source**, set branch to `gh-pages`, folder to `/ (root)`
4.  Save — the site will be live at https://benjmac.github.io

> **Note:** the `homepage` field in `package.json` must match your GitHub username and repo name exactly for assets to resolve correctly.

---

© 2026 Ben McCain. All rights reserved. Source is visible for portfolio purposes only.
