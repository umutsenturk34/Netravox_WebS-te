const BASE_URL = 'https://netravox.com';

const STATIC_PAGES = [
  { url: '/',               priority: '1.0', changefreq: 'weekly' },
  { url: '/ozellikler',     priority: '0.9', changefreq: 'monthly' },
  { url: '/sektorler',      priority: '0.9', changefreq: 'monthly' },
  { url: '/paketler',       priority: '0.9', changefreq: 'weekly' },
  { url: '/karsilastirma',  priority: '0.8', changefreq: 'monthly' },
  { url: '/blog',           priority: '0.8', changefreq: 'daily' },
  { url: '/iletisim',       priority: '0.7', changefreq: 'monthly' },
];

function buildSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  let blogUrls = [];
  let pageUrls = [];

  const [blogRes, pagesRes] = await Promise.allSettled([
    fetch('https://api.netravox.com/api/public/netravox/blog'),
    fetch('https://api.netravox.com/api/public/netravox/pages'),
  ]);

  try {
    if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
      const posts = await blogRes.value.json();
      blogUrls = (Array.isArray(posts) ? posts : posts.posts || [])
        .filter((p) => p.slug && p.isPublished !== false)
        .map((p) => ({
          url: `/blog/${p.slug}`,
          lastmod: p.updatedAt ? p.updatedAt.split('T')[0] : undefined,
          priority: '0.7',
          changefreq: 'monthly',
        }));
    }
  } catch {}

  try {
    if (pagesRes.status === 'fulfilled' && pagesRes.value.ok) {
      const pages = await pagesRes.value.json();
      const skipSlugs = new Set(['home', 'anasayfa']);
      pageUrls = (Array.isArray(pages) ? pages : [])
        .filter((p) => p.slug && p.isPublished !== false && !skipSlugs.has(p.slug))
        .map((p) => ({
          url: `/${p.slug}`,
          lastmod: p.updatedAt ? p.updatedAt.split('T')[0] : undefined,
          priority: '0.6',
          changefreq: 'monthly',
        }));
    }
  } catch {}

  const allUrls = [...STATIC_PAGES, ...pageUrls, ...blogUrls];

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
  res.write(buildSitemap(allUrls));
  res.end();

  return { props: {} };
}
