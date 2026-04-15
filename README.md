# VORN · Gym Partners

Private leaderboard and activation portal for VORN gym partners.
React + Vite, zero backend, deployable to GitHub Pages.

---

## 1. Quick start (local)

```bash
npm install
npm run dev
```

Open the URL that Vite prints (usually `http://localhost:5173/gympartners/`).
Default password: **`VORN2026`** — change it in `src/App.jsx` (`ACCESS_PASSWORD`).

## 2. Data source

Real-time leaderboard pulls from this public Google Sheet (CSV export):

```
https://docs.google.com/spreadsheets/d/1i3E10cZ4XpMowcPXbR4yoR9-0OV_vwicPombNqwkULk/export?format=csv
```

Expected columns (headers must match, case-insensitive):

```
gym, pairs_confirmed, waves_unlocked, pairs_to_next_wave, athletes
```

The sheet must be shared with **"Anyone with the link · Viewer"** so the CSV export is public.
Refresh cadence: every 60 seconds. Change in `src/components/Dashboard.jsx` (`REFRESH_MS`).

## 3. Activation kit links

Placeholder URLs in `src/components/ActivationKit.jsx`.
Replace each `href` with your real Drive / Dropbox / Notion / S3 asset link before deploy.

## 4. Deploy to GitHub Pages

### Option A — served at `https://<your-user>.github.io/gympartners/`

1. Create a new repo named **`gympartners`** on GitHub.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "VORN gym partners v1"
   git branch -M main
   git remote add origin git@github.com:<your-user>/gympartners.git
   git push -u origin main
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
   This runs `vite build` then pushes `dist/` to the `gh-pages` branch.
4. On GitHub → repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **`gh-pages`** / root → Save.
5. Your site is live at `https://<your-user>.github.io/gympartners/`.

### Option B — served at `https://vorn.global/gympartners/` (custom domain)

1. Do everything in Option A.
2. Add a file `public/CNAME` containing just `vorn.global` (already supported by Vite — put it in `public/`).
3. In your DNS (where vorn.global is managed), add:
   - `A` records for `vorn.global` → GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   - or `CNAME` `www` → `<your-user>.github.io`
4. GitHub → Settings → Pages → Custom domain: `vorn.global` → Save → enforce HTTPS.
5. The `base: '/gympartners/'` in `vite.config.js` makes it work at `vorn.global/gympartners/`.

### Option C — main site is elsewhere and you only want `/gympartners` on GitHub Pages

If `vorn.global` is hosted on Vercel / Netlify / Webflow and you want `/gympartners` served from GitHub Pages:
- Easiest: deploy to `gympartners.vorn.global` subdomain via Option B (use that as the CNAME).
- Or proxy `/gympartners/*` from your main host to the GitHub Pages URL.

### Build only (no deploy)

```bash
npm run build
# outputs static files in dist/
```

You can upload `dist/` to any static host (Netlify, Vercel, S3, Cloudflare Pages).
If the base URL is different, build with:

```bash
VITE_BASE=/ npm run build         # root of a domain
VITE_BASE=/some-path/ npm run build
```

## 5. Change the password

`src/App.jsx`:

```js
const ACCESS_PASSWORD = 'VORN2026'
```

⚠️ This is frontend-only — anyone inspecting devtools can read it.
It's a gate, not real security. Don't put anything confidential behind it.

## 6. Structure

```
vorn-gympartners/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── .nojekyll          # tell GitHub Pages to serve as-is
│   └── 404.html           # SPA fallback for deep links
├── src/
│   ├── main.jsx
│   ├── App.jsx            # auth gate + routing
│   ├── styles.css         # the entire VORN look & feel
│   └── components/
│       ├── Login.jsx
│       ├── Dashboard.jsx  # hero + sections + data fetching
│       ├── Leaderboard.jsx
│       ├── Progress.jsx
│       └── ActivationKit.jsx
└── README.md
```

---

Built for VORN.
