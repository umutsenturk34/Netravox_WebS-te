const BASE = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://localhost:5001';
const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG || process.env.TENANT_SLUG || 'netravox';

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
export const getNavigation = () => get('/navigation');
export const getServices   = () => get('/services');
export const getFaqs       = () => get('/faqs');
export const getBlog       = () => get('/blog');
export const getBlogPost   = (slug) => get(`/blog/${slug}`);
export const getPage       = (template) => get(`/pages?template=${template}`);

export async function postContact(body) {
  const base = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://localhost:5001';
  const slug = process.env.NEXT_PUBLIC_SITE_SLUG || process.env.TENANT_SLUG || 'netravox';
  const res = await fetch(`${base}/api/public/${slug}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gönderme başarısız');
  return data;
}
