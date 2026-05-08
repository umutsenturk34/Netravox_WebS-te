import Link from 'next/link';

const SOCIAL_ICONS = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4l6.97 9.31L4.09 20h2.14l5.1-5.83L15.88 20H20l-7.26-9.69L19.6 4h-2.14l-4.82 5.51L8.12 4H4zm1.73 1.5h2.41l10.3 13h-2.41L5.73 5.5z"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.58C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z"/>
    </svg>
  ),
};

export default function Footer({ company }) {
  const year = new Date().getFullYear();
  const c = company?.contact || {};
  const s = company?.socialLinks || {};

  const socialEntries = Object.entries(s).filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/">
              <img src="/logo.svg" alt={company?.name || 'Netravox'} className="footer-logo" />
            </Link>
            <p>{company?.description?.tr || 'Sektörünü bilen akıllı web yönetim platformu. İşletmenizin dijital yüzünü kodlama bilmeden profesyonelce yönetin.'}</p>
            {socialEntries.length > 0 && (
              <div className="social-links">
                {socialEntries.map(([key, url]) => (
                  SOCIAL_ICONS[key] ? (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={key}>
                      {SOCIAL_ICONS[key]}
                    </a>
                  ) : null
                ))}
              </div>
            )}
          </div>

          <div className="footer-col">
            <h4>Çözümler</h4>
            <Link href="/sektorler">Restoran & Kafe</Link>
            <Link href="/sektorler">Diş Kliniği</Link>
            <Link href="/sektorler">Gayrimenkul</Link>
            <Link href="/sektorler">Otel & Konaklama</Link>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <Link href="/paketler">Paketler</Link>
            <Link href="/karsilastirma">Karşılaştırma</Link>
            <Link href="/ozellikler">Özellikler</Link>
            <Link href="/blog">Blog</Link>
          </div>

          <div className="footer-col">
            <h4>İletişim</h4>
            <a href={`mailto:${c.email || 'hello@netravox.com'}`}>{c.email || 'hello@netravox.com'}</a>
            {c.phone && <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>}
            {c.address && c.city && <span style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'block', padding: '4px 0' }}>{c.address}, {c.city}</span>}
            <Link href="/iletisim" className="link-arrow">Bize Ulaş →</Link>
            <Link href="/kvkk" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 4, display: 'block' }}>KVKK</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © {year} Netravox. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
