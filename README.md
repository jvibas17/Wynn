# Vegas VIP Host — Winnie Lee

Source for [vegasviphost.net](https://vegasviphost.net), the personal website of Winnie Lee, VIP casino host at Wynn Las Vegas. Available in English, Simplified Chinese, Traditional Chinese and Japanese.

## Stack

React 18 + TypeScript, Tailwind CSS, Vite, React Router. Contact form email is sent with EmailJS. Hosted on Netlify.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

`npm run build` type-checks, builds the site, then pre-renders every page in every language to static HTML (`scripts/prerender.mjs`). Each page gets its own title, description, canonical URL, hreflang links and structured data, and the sitemap is generated at the same time.

## Where things live

| What | Where |
|---|---|
| Page routes and language URLs (`/`, `/zh`, `/zh-tw`, `/ja`) | `src/i18n/routes.ts`, `src/AppRoutes.tsx` |
| Homepage text in all languages | `src/i18n/translations.ts` |
| Guide articles and privacy policy, per language | `src/i18n/articles/` |
| SEO tags, structured data, sitemap | `src/seo/head.ts` |
| Brand name | `src/brand.ts` |

To add a page, add its path to `PAGE_PATHS` in `src/i18n/routes.ts` and register its component in `src/AppRoutes.tsx`.

## Contact form

The form sends `name`, `email`, `phone` and `language` to the EmailJS template `template_vitqt4j`.

## Supabase

`supabase/` holds edge functions and a migration from an earlier WhatsApp/chat integration. The website no longer uses them.
