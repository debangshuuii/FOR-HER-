# Sorry, Sunlight ☀️

A private, mobile-first interactive apology page. Client-only — no backend, no tracking, no analytics.

## Develop (Vite)

```powershell
npm install
npm run dev      # hot-reload at http://localhost:5173
npm run build    # outputs static dist/ (deploy this folder)
npm run preview  # serve dist/ locally to check the production build
```

Static files (`config.js`, `app.js`, `styles.css`, `photos/`) live in
`public/` and are copied to `dist/` verbatim, so all existing references
keep working. `vite.config.js` uses `base: "./"` so the build also works
from a subpath like GitHub Pages project sites.

## Preview locally (no npm)

Just open `index.html` in a browser, or serve the folder:

```powershell
cd "D:\Coding\f0r her"
python -m http.server 8000
# open http://localhost:8000
```

## Personalize (only `config.js`)

- `name` — shown as “I'm sorry, NAME.”
- `apology` — your genuine 2–4 sentence apology
- `instagram` — username only, e.g. `"yourname"` (empty hides the button)
- `phone` — e.g. `"+15551234567"` (empty hides the call button)
- `whatsapp` — digits only, e.g. `"15551234567"`, or set `whatsappLink` directly
- `musicSrc` — e.g. `"music/soft.mp3"`; empty = built-in gentle synth pad, opt-in only
- `photos` — `{ src, alt, compliment }` entries pointing at `photos/`
- `noLabels`, `waitingLines` — playful button labels + rotating timer lines

## Deploy (GitHub Pages)

1. Push this folder to `debangshuuii/FOR-HER-` on `main`.
2. Repo → Settings → Pages → Deploy from branch → `main` / root.
3. Share the `https://debangshuuii.github.io/FOR-HER-/` link.

## Privacy & respect notes

- Timer lives only in the browser session and resets on refresh.
- “Don't talk to me” never blocks leaving — it shows photos/compliments, then a respectful “Maybe later → That's okay, take your time.”
- No IP/location/device/click tracking, no camera/mic, no popups.
- Music only starts after an explicit tap on the music toggle.

## Structure

- `index.html` — semantic, accessible markup (single page, two cards)
- `styles.css` — mobile-first premium styling, petals, flower bloom, reduced-motion support
- `app.js` — timer, photo rounds, success flow, contacts, music (WebAudio fallback)
- `config.js` — all personalization
- `photos/` — replaceable images + graceful fallbacks
