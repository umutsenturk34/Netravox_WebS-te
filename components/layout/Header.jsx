import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_FALLBACK = [
  { label: 'Özellikler',    href: '/ozellikler' },
  { label: 'Sektörler',     href: '/sektorler' },
  { label: 'Paketler',      href: '/paketler' },
  { label: 'Karşılaştırma', href: '/karsilastirma' },
  { label: 'İletişim',      href: '/iletisim' },
];

export default function Header({ company, nav }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  // CMS items use `url` field; fallback items use `href`
  const rawItems = nav?.tr?.length ? nav.tr : NAV_FALLBACK;
  const navItems = rawItems
    .map((l) => ({ label: l.label, href: l.href || l.url || null }))
    .filter((l) => l.href);

  // Ana Sayfa is always first in mobile menu — skip any CMS item that points to "/"
  const mobileItems = navItems.filter((l) => l.href !== '/');

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="logo" onClick={() => setOpen(false)}>
              <img src="/logo.svg" alt={company?.name || 'Netravox'} className="logo-img" />
            </Link>

            <nav className="nav">
              {navItems.map((l) => (
                <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <button
              className={`mobile-btn${open ? ' is-open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Menü"
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div className={`mobile-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />

      {/* Drawer */}
      <nav className={`mobile-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer-header">
          <Link href="/" className="logo" onClick={() => setOpen(false)}>
            <img src="/logo.svg" alt={company?.name || 'Netravox'} className="logo-img" />
          </Link>
          <button className="mobile-drawer-close" onClick={() => setOpen(false)} aria-label="Kapat">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="mobile-drawer-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={() => setOpen(false)}>
            Ana Sayfa
          </Link>
          {mobileItems.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
