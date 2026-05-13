const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.netravox.com';
const SLUG = 'netravox';

async function get(path) {
  try {
    const res = await fetch(`${BASE}/api/public/${SLUG}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const getCompany    = () => get('/company');
export const getSeoSettings = () => get('/seo-settings');
export const getNavigation = () => get('/navigation');
export const getServices   = () => get('/services');
export const getFaqs       = () => get('/faqs');
export const getBlog       = () => get('/blog');
export const getBlogPost   = (slug) => get(`/blog/${slug}`);
export const getPage       = (template) => get(`/pages?template=${template}`);
export const getRedirects  = () => get('/redirects');

export async function postContact(body) {
  const res = await fetch(`${BASE}/api/public/${SLUG}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gönderme başarısız');
  return data;
}
