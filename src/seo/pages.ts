import { translations } from '../i18n/translations';
import { wynnRewardsGuide } from '../i18n/articles/wynnRewardsGuide';
import { getCompsAtWynn } from '../i18n/articles/getCompsAtWynn';
import { multilingualVIPHost } from '../i18n/articles/multilingualVIPHost';
import type { Article } from '../i18n/articles/types';

// Single source of truth for per-route <head> tags. Used at build time by the
// prerenderer so every URL ships its own title / description / canonical / OG /
// JSON-LD in the first HTML response.

export const SITE_URL = 'https://vegasviphost.net';
const SITE_NAME = 'Vegas VIP Host - Winnie Lee';
// Placeholder stock image (Unsplash). Replace with an owned photo when available.
const OG_IMAGE = 'https://images.unsplash.com/photo-1663425561986-3c67758d2c54?auto=format&fit=crop&w=1200&h=630&q=80';

const PHONE = '+1-702-355-0238';
const EMAIL = 'lovepicaso888@gmail.com';
const LANGUAGES = ['English', 'Mandarin Chinese', 'Taiwanese', 'Japanese'];

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  ogType: 'website' | 'article';
  jsonLd: object[];
}

const canonical = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#winnie-lee`,
  name: 'Winnie Lee',
  jobTitle: 'VIP Host',
  description:
    'Multilingual VIP host who assists guests at Wynn Las Vegas with casino play, Wynn Rewards questions, dining, nightlife and group trips.',
  url: `${SITE_URL}/`,
  worksFor: { '@type': 'Organization', name: 'Wynn Las Vegas', url: 'https://www.wynnlasvegas.com' },
  knowsLanguage: LANGUAGES,
  email: EMAIL,
  telephone: PHONE,
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: ['en-US', 'zh-CN', 'zh-TW', 'ja-JP'],
  publisher: { '@id': `${SITE_URL}/#winnie-lee` },
};

const localBusiness = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Vegas VIP Host - Winnie Lee',
  description:
    'Guest contact site for Winnie Lee, a multilingual VIP host at Wynn Las Vegas (English, Mandarin, Taiwanese, Japanese). Not the official Wynn Resorts website.',
  url: `${SITE_URL}/`,
  telephone: PHONE,
  email: EMAIL,
  image: OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3131 Las Vegas Blvd South',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89109',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'City', name: 'Las Vegas' },
  founder: { '@id': `${SITE_URL}/#winnie-lee` },
  knowsLanguage: LANGUAGES,
};

function faqPage(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

const stripMd = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');

function articleFaq(article: Article) {
  const items = article.blocks
    .filter((b): b is ['faq', string, string] => b[0] === 'faq')
    .map((b) => ({ question: stripMd(b[1]), answer: stripMd(b[2]) }));
  return items.length ? [faqPage(items)] : [];
}

function guide(path: string, title: string, description: string, article: Article): PageSeo {
  const url = canonical(path);
  return {
    path,
    title,
    description,
    ogType: 'article',
    jsonLd: [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: article.title,
        description,
        url,
        mainEntityOfPage: url,
        inLanguage: 'en',
        image: OG_IMAGE,
        author: person,
        publisher: { '@id': `${SITE_URL}/#winnie-lee` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: article.title, item: url },
        ],
      },
      ...articleFaq(article),
    ],
  };
}

// Titles/descriptions from the SEO meta pack (titles <= 60 chars, descriptions <= 160).
export const PAGES: PageSeo[] = [
  {
    path: '/',
    title: translations.en.ui.meta.title,
    description: translations.en.ui.meta.description,
    ogType: 'website',
    jsonLd: [website, person, localBusiness, faqPage(translations.en.faq.questions)],
  },
  guide('/wynn-rewards-guide', wynnRewardsGuide.en.docTitle, wynnRewardsGuide.en.metaDescription, wynnRewardsGuide.en),
  guide('/how-to-get-comps-at-wynn-las-vegas', getCompsAtWynn.en.docTitle, getCompsAtWynn.en.metaDescription, getCompsAtWynn.en),
  guide('/multilingual-vip-host-las-vegas', multilingualVIPHost.en.docTitle, multilingualVIPHost.en.metaDescription, multilingualVIPHost.en),
];

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function renderHead(page: PageSeo): string {
  const url = canonical(page.path);
  const t = esc(page.title);
  const d = esc(page.description);
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': page.jsonLd }).replace(/</g, '\\u003c');
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="x-default" href="${url}">`,
    `<meta property="og:type" content="${page.ogType}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}">`,
    `<script type="application/ld+json">${ld}</script>`,
  ].join('\n    ');
}
