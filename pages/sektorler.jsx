import Head from 'next/head';
import Link from 'next/link';
import { getCompany, getNavigation } from '../lib/api';
import { breadcrumbSchema } from '../lib/schema';

const SECTORS = [
  {
    id: 'restoran',
    emoji: '🍽️',
    iconBg: '#FEF3C7',
    name: 'Restoran & Kafe',
    features: ['Dijital menü ve sipariş yönetimi', 'Online masa rezervasyonu', 'Kampanya ve etkinlik yönetimi'],
  },
  {
    id: 'dis-klinigi',
    emoji: '🦷',
    iconBg: '#EFF6FF',
    name: 'Diş Kliniği',
    features: ['Online randevu sistemi', 'Tedavi hizmetleri sayfası', 'Hasta yorumları modülü'],
  },
  {
    id: 'gayrimenkul',
    emoji: '🏢',
    iconBg: '#F0FDF4',
    name: 'Gayrimenkul & Emlak',
    features: ['İlan portföyü yönetimi', 'Kiralık/Satılık filtreleme', 'Danışman profilleri'],
  },
  {
    id: 'otel',
    emoji: '🏨',
    iconBg: '#FFF7ED',
    name: 'Otel & Konaklama',
    features: ['Oda kataloğu ve rezervasyon', 'Dönemsel fiyat yönetimi', 'Misafir yorumları ve galeri'],
  },
  {
    id: 'hukuk',
    emoji: '⚖️',
    iconBg: '#F1F5F9',
    name: 'Hukuk Bürosu',
    features: ['Uzmanlık alanları vitrini', 'Avukat ve ekip profilleri', 'Hızlı iletişim formu'],
  },
  {
    id: 'e-ticaret',
    emoji: '🛒',
    iconBg: '#FDF4FF',
    name: 'E-Ticaret',
    features: ['Ürün katalog yönetimi', 'Güvenli ödeme sistemi', 'Sipariş takip paneli'],
  },
];

export default function SektorlerPage({ company }) {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Sektörler', href: '/sektorler' },
  ]);

  return (
    <>
      <Head>
        <title>Sektörler — Netravox</title>
        <meta name="description" content="Restoran, diş kliniği, otel, gayrimenkul ve daha fazlası için Netravox sektöre özel çözümlerini keşfedin." />
        <link rel="canonical" href="https://netravox.com/sektorler" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <section className="inner-hero" style={{ textAlign: 'center' }}>
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <span className="badge-pill"><span className="dot" />SEKTÖRLER</span>
          </div>
          <h1>İşletmenizin Dijital Yüzünü<br />Profesyonellerle İnşa Edin</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '14px auto 0', lineHeight: 1.7 }}>
            Her sektörün dinamiğini bilen tasarımlar ve modüller. Teknik bilgi gerektirmeden, işletmenize özel profesyonel web sitesi.
          </p>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="sector-cards-grid">
            {SECTORS.map((s) => (
              <div key={s.id} className="sector-pg-card">
                <div className="sector-pg-icon" style={{ background: s.iconBg }}>
                  {s.emoji}
                </div>
                <h3>{s.name}</h3>
                <div className="sector-feat-list">
                  {s.features.map((f) => (
                    <div key={f} className="sector-feat-item">
                      <span className="sector-feat-dot" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/iletisim" className="sector-detail-link">
                  Detayları İncele →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-left">
              <div className="cta-badge">
                <span className="badge-pill badge-pill-dark"><span className="dot" />HEMEN BAŞLAYIN</span>
              </div>
              <h2>Sektörünüze özel çözüm için bize yazın.</h2>
              <p>Hangi sektörde olursanız olun, işletmenize uygun Netravox çözümü var. Detayları birlikte planlayalım.</p>
            </div>
            <Link href="/iletisim" className="btn btn-gold btn-lg" style={{ flexShrink: 0 }}>
              Bize Ulaşın →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [company, nav] = await Promise.all([getCompany(), getNavigation()]);
  return { props: { company: company || null, nav: nav || null }, revalidate: 3600 };
}
