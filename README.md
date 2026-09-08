# Akhil Puvvada — Portfolio

Modern, responsive single-page portfolio built from my résumé. Bilingual
(English / German) with a language switch in the navbar; the choice is
persisted to `localStorage` and defaults to the browser language.

## Stack

- React 19 + Vite
- Tailwind CSS 3
- Context-based i18n (no runtime i18n library)
- Scroll-reveal animations via `IntersectionObserver`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Editing content

All copy lives in [`src/data/resume.js`](src/data/resume.js) — one `en` and
one `de` object with the same shape. Contact details are in the `CONTACT`
constant at the top of that file.

## Deploy

The `dist/` folder is fully static. Deploy to Vercel, Netlify, GitHub Pages,
Render, or any static host. For Vercel/Netlify the default settings work:
build command `npm run build`, output directory `dist`.
