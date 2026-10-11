import type { Language } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';
import { LANGUAGES, PAGE_PATHS, localizePath, type PagePath } from '../i18n/routes';
import type { Article } from '../i18n/articles/types';
import { wynnRewardsGuide } from '../i18n/articles/wynnRewardsGuide';
import { getCompsAtWynn } from '../i18n/articles/getCompsAtWynn';
import { multilingualVIPHost } from '../i18n/articles/multilingualVIPHost';
import { privacyPolicy } from '../i18n/articles/privacyPolicy';
import { BRAND } from '../brand';

const SITE = 'https://vegasviphost.net';
const SITE_NAME = `${BRAND.name} - ${BRAND.person}`;
const SHARE_IMAGE = 'https://images.unsplash.com/photo-1663425561986-3c67758d2c54?auto=format&fit=crop&w=1200&h=630&q=80';
const PUBLISHED = '2026-05-12';

const HREFLANG: Record<Language, string> = { en: 'en', zh: 'zh-CN', 'zh-tw': 'zh-TW', ja: 'ja' };
const OG_LOCALE: Record<Language, string> = { en: 'en_US', zh: 'zh_CN', 'zh-tw': 'zh_TW', ja: 'ja_JP' };

const ARTICLES: Partial<Record<PagePath, Record<Language, Article>>> = {
  '/wynn-rewards-guide': wynnRewardsGuide,
  '/how-to-get-comps-at-wynn-las-vegas': getCompsAtWynn,
  '/multilingual-vip-host-las-vegas': multilingualVIPHost,
  '/privacy-policy': privacyPolicy,
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
const url = (pagePath: string, language: Language) => SITE + localizePath(pagePath, language);
const jsonLd = (data: object) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: plain(a) },
    })),
  };
}

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#winnie-lee`,
  name: BRAND.person,
  jobTitle: 'VIP Casino Host',
  url: SITE + '/',
  telephone: '+1-702-355-0238',
  email: 'lovepicaso888@gmail.com',
  worksFor: { '@type': 'Organization', name: 'Wynn Las Vegas', url: 'https://www.wynnlasvegas.com' },
  knowsLanguage: ['English', 'Mandarin Chinese', 'Taiwanese', 'Japanese'],
};

function homeSchema(language: Language) {
  const tr = translations[language];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE}/#business`,
      name: SITE_NAME,
      description: tr.ui.meta.description,
      url: url('/', language),
      image: SHARE_IMAGE,
      telephone: '+1-702-355-0238',
      email: 'lovepicaso888@gmail.com',
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3131 Las Vegas Blvd South',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        postalCode: '89109',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.127, longitude: -115.169 },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      areaServed: { '@type': 'City', name: 'Las Vegas' },
      availableLanguage: ['English', 'Chinese', 'Japanese'],
      employee: { '@id': person['@id'] },
    },
    { '@context': 'https://schema.org', ...person },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE + '/',
      inLanguage: HREFLANG[language],
    },
    faqPage(tr.faq.questions.map((x: { question: string; answer: string }) => ({ q: x.question, a: x.answer }))),
  ];
}

function articleSchema(pagePath: PagePath, language: Language, article: Article) {
  const home = translations[language].breadcrumbs.home;
  const faqs = article.blocks.filter(b => b[0] === 'faq').map(b => ({ q: b[1] as string, a: b[2] as string }));
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.metaDescription,
      inLanguage: HREFLANG[language],
      image: SHARE_IMAGE,
      datePublished: PUBLISHED,
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: url(pagePath, language),
      author: { '@id': person['@id'], '@type': 'Person', name: BRAND.person, url: SITE + '/' },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE + '/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: home, item: url('/', language) },
        { '@type': 'ListItem', position: 2, name: article.title, item: url(pagePath, language) },
      ],
    },
    ...(faqs.length ? [faqPage(faqs)] : []),
  ];
}

export function buildHead(pagePath: PagePath, language: Language): { head: string; htmlLang: string } {
  const article = ARTICLES[pagePath]?.[language];
  const title = article ? article.docTitle : translations[language].ui.meta.title;
  const description = article ? article.metaDescription : translations[language].ui.meta.description;
  const canonical = url(pagePath, language);
  const isLegal = pagePath === '/privacy-policy';
  const schema = isLegal
    ? [{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, inLanguage: HREFLANG[language] }]
    : article
      ? articleSchema(pagePath, language, article)
      : homeSchema(language);

  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<link rel="canonical" href="${canonical}">`,
    ...LANGUAGES.map(l => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${url(pagePath, l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${url(pagePath, 'en')}">`,
    `<meta property="og:type" content="${article && !isLegal ? 'article' : 'website'}">`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:image" content="${esc(SHARE_IMAGE)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="${OG_LOCALE[language]}">`,
    ...LANGUAGES.filter(l => l !== language).map(l => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${esc(SHARE_IMAGE)}">`,
    ...schema.map(jsonLd),
  ];

  return { head: lines.map(l => '    ' + l).join('\n'), htmlLang: HREFLANG[language] };
}

export const NOT_FOUND_HEAD = [
  `<title>Page not found | ${esc(SITE_NAME)}</title>`,
  `<meta name="robots" content="noindex">`,
].map(l => '    ' + l).join('\n');

export function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const entries = PAGE_PATHS.flatMap(pagePath =>
    LANGUAGES.map(language => {
      const alternates = [
        ...LANGUAGES.map(l => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${url(pagePath, l)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(pagePath, 'en')}"/>`,
      ].join('\n');
      return [
        '  <url>',
        `    <loc>${url(pagePath, language)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${pagePath === '/' ? 'weekly' : 'monthly'}</changefreq>`,
        `    <priority>${pagePath === '/' ? (language === 'en' ? '1.0' : '0.9') : pagePath === '/privacy-policy' ? '0.3' : '0.8'}</priority>`,
        alternates,
        '  </url>',
      ].join('\n');
    })
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}
