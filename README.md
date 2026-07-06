# Ayomide Adewale — Portfolio (Vue 3 rebuild)

Sticky-scroll, glassmorphic redesign of the portfolio, built with Vue 3 + Vite.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder anywhere that serves static files
(Netlify, Vercel, GitHub Pages, your own server, etc).

## Structure

- `src/App.vue` — assembles all sections
- `src/components/` — one component per section (Hero, About, Services, Skills,
  Projects, Contact) plus the nav, footer, custom cursor, and the two games
  (Tic-Tac-Toe with a minimax AI, Snake with a difficulty selector and AI
  autopilot)
- `src/style.css` — global design tokens (colors, fonts, spacing) used across
  every component

## Notes

- The contact form posts to the same `formsubmit.co` endpoint the original
  site used — no backend needed, but you'll want to confirm that email address
  still works for you.
- Fonts (Space Grotesk, Inter, JetBrains Mono) and Font Awesome load from
  Google Fonts / cdnjs, same as before.
- The custom cursor only activates on devices with a mouse — touchscreens keep
  the normal pointer automatically.
