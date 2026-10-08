# Sentinel landing page

The landing page lives at `/sentinel/` (`/sentinel` resolves to the directory on GitHub Pages). The existing portfolio and experimental routes are preserved.

## Development and deployment

- `npm ci` installs the existing locked dependencies.
- `npm run dev` serves both the portfolio and `/sentinel/`.
- `npm run build` builds both HTML entry points, then prerenders the Sentinel React component into `dist/sentinel/index.html`.
- `npm run preview` serves the production output locally.
- `npm test` includes keyboard and navigation interaction checks.

The existing GitHub Pages workflow runs the production build and publishes `dist`. No hosting configuration change is needed. Sentinel has a dedicated entry point so it does not load the portfolio's animation libraries, project screenshots, or global stylesheet. The lazy React Router route also supports in-app navigation. Use a normal anchor to `/sentinel/` for links from the portfolio to load Sentinel's complete document metadata.

## Files

- `src/pages/Sentinel.tsx`: page content, brand/repository SVGs, and accessible architecture tabs.
- `src/pages/sentinel.css`: isolated, responsive styling and reduced-motion support.
- `src/sentinel-main.tsx`: standalone hydration entry point.
- `sentinel/index.html`: canonical, social, favicon, and Organization metadata.
- `scripts/prerender-sentinel.mjs`: build-time rendering using the same page component.
- `public/sentinel-social.png`: 1200 × 630 social sharing image.
- `public/sentinel-mark.svg`: dedicated brand favicon.

## Content and conversion

The page distinguishes the Gemini-powered prototype from the planned Claude-powered multi-agent architecture. The interactive code samples are illustrative, not live product output. No customer, investor, partnership, or unverified evaluation claims are included.

Early-access links open an email draft to `founder@ethanjoseph.dev` with a Sentinel early-access subject. There is no implied waitlist database, email submission backend, or analytics integration.

The initial page content is readable without JavaScript. Workflow tabs and the mobile navigation hydrate when JavaScript is available. Current-year copyright text is prerendered at build time.
