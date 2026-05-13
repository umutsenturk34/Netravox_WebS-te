import { NextResponse } from 'next/server';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.netravox.com';
const SLUG = 'netravox';

// Bellek içi cache — Edge Runtime'da modül ömrü boyunca geçerli
let cachedRedirects = null;
let cacheExpiry = 0;

async function fetchRedirects() {
  if (cachedRedirects && Date.now() < cacheExpiry) return cachedRedirects;
  try {
    const res = await fetch(`${BASE}/api/public/${SLUG}/redirects`, {
      cache: 'no-store',
    });
    if (!res.ok) return cachedRedirects ?? [];
    cachedRedirects = await res.json();
    cacheExpiry = Date.now() + 5 * 60 * 1000; // 5 dk
    return cachedRedirects;
  } catch {
    return cachedRedirects ?? [];
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const redirects = await fetchRedirects();
  const match = redirects.find((r) => r.from === pathname);

  if (match) {
    if (match.to.startsWith('http')) {
      return NextResponse.redirect(match.to, { status: match.type || 301 });
    }
    const url = request.nextUrl.clone();
    url.pathname = match.to;
    return NextResponse.redirect(url, { status: match.type || 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
