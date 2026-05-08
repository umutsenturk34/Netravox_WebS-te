import Head from 'next/head';
import Link from 'next/link';
import { getCompany, getBlog, getNavigation } from '../lib/api';
import { organizationSchema, websiteSchema } from '../lib/schema';

const SECTORS = [
  {
    name: 'Restoran & Kafe', icon: '🍽️', iconBg: '#FEF3C7',
    desc: 'Dijital menü, rezervasyon ve sipariş yönetimi.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    name: 'Diş Kliniği', icon: '🦷', iconBg: '#EFF6FF',
    desc: 'Online randevu, hizmetler ve hasta yorumları.',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
  },
  {
    name: 'Gayrimenkul', icon: '🏢', iconBg: '#F0FDF4',
    desc: 'İlan yönetimi, portföy ve danışman profilleri.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
  },
  {
    name: 'Otel & Konaklama', icon: '🏨', iconBg: '#FFF7ED',
    desc: 'Oda kataloğu, rezervasyon ve çok dil desteği.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    name: 'Güzellik Merkezi', icon: '💅', iconBg: '#FDF2F8',
    desc: 'Hizmet galerisi, online randevu ve kampanya.',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
  },
  {
    name: 'Hukuk Bürosu', icon: '⚖️', iconBg: '#F1F5F9',
    desc: 'Uzmanlık vitrini, blog ve güvenli iletişim.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
  },
];

const WHY = [
  { icon: '🎨', bg: '#EFF6FF', title: 'Sektöre Özel Tasarımlar', desc: 'İş modelinize özel, modern ve mobil uyumlu tasarımlarla rakiplerinizden bir adım önde geçin.' },
  { icon: '⚡', bg: '#FEF3C7', title: 'Kolay Yönetim', desc: 'Tek panelden içeriklerinizi, hizmetlerinizi ve müşteri taleplerinizi kolayca yönetin.' },
  { icon: '🛡️', bg: '#F0FDF4', title: 'Güvenilir ve Hızlı', desc: 'Gelişmiş güvenlik altyapısı ve yüksek performanslı sunucularımızla siteniz her zaman erişilebilir.' },
];

const TECH = ['Next.js', 'Node.js', 'MongoDB', 'Cloudflare', 'Yapay Zeka', 'İyzico', 'Brevo', 'AWS S3'];

export default function HomePage({ company, posts }) {
  const heroTitle = company?.content?.heroTitle?.tr || 'Web sitenin yöneticisi sen ol.';
  // Görseli Panel'den girebilirsiniz: Firma Ayarları → İçerik → Hero Görseli
  const heroImage = company?.content?.heroImage || null;

  const jsonLd = [organizationSchema(company), websiteSchema()];

  return (
    <>
      <Head>
        <title>{company?.name || 'Netravox'} — Her Sektöre Özel Web Sitesi Altyapısı</title>
        <meta name="description" content="İşletmenize özel sektörel tasarımlarla web sitenizi kurun. Kodlama bilmeden profesyonelce yönetin." />
        <meta property="og:title" content="Netravox — Her Sektöre Özel Web Sitesi Altyapısı" />
        <meta property="og:description" content="İşletmenize özel sektörel tasarımlarla web sitenizi kurun." />
        <meta property="og:image" content="https://netravox.com/logo.svg" />
        <meta property="og:url" content="https://netravox.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://netravox.com" />
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </Head>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className={`hero-grid${heroImage ? ' has-image' : ''}`}>
            <div>
              <div className="hero-badge">
                <span className="badge-pill"><span className="dot" />YÖNETİCİ PLATFORM</span>
              </div>
              <h1 className="hero-title">
                {heroTitle.includes('yöneticisi') ? (
                  <>
                    Web sitenin<br />
                    <span className="underline-gold">yöneticisi</span> sen ol.
                  </>
                ) : heroTitle}
              </h1>
              <p className="hero-desc">
                {company?.description?.tr || 'İşletmenize özel sektörel tasarımlarla web sitenizi kurun. Kodlama bilmeden, tamamen size ait bir platformda profesyonelce yönetin.'}
              </p>
              <div className="hero-actions">
                <Link href="/paketler" className="btn btn-navy btn-lg">Paketleri İncele →</Link>
                <Link href="/iletisim" className="btn btn-outline btn-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Bize Yazın
                </Link>
              </div>
              <div className="hero-trust">
                <span className="hero-trust-item"><span className="check">✓</span> Kredi kartı gerekmez</span>
                <span className="hero-trust-item"><span className="check">✓</span> 7/24 Destek</span>
              </div>
            </div>

            <div className="hero-visual">
              {heroImage ? (
                /* Hero görseli Panel → Firma Ayarları → İçerik → Hero Görseli alanından yönetilir */
                <img src={heroImage} alt="Platform önizleme" className="hero-image-preview" />
              ) : (
                <div className="dashboard-card">
                  <div className="dash-topbar">
                    <div className="dash-dot" style={{ background: '#FF5F56' }} />
                    <div className="dash-dot" style={{ background: '#FFBD2E' }} />
                    <div className="dash-dot" style={{ background: '#27C93F' }} />
                    <span className="dash-title">Netravox — Yönetici Paneli</span>
                  </div>
                  <div className="dash-body">
                    <div className="dash-metrics">
                      <div className="dash-metric">
                        <div className="dash-metric-label">Ziyaretçi</div>
                        <div className="dash-metric-val">12.8K</div>
                      </div>
                      <div className="dash-metric">
                        <div className="dash-metric-label">Form</div>
                        <div className="dash-metric-val">156</div>
                      </div>
                      <div className="dash-metric">
                        <div className="dash-metric-label">SEO</div>
                        <div className="dash-metric-val" style={{ color: '#22C55E' }}>94</div>
                      </div>
                    </div>
                    <div className="dash-chart-area">
                      <div className="dash-chart-label">Son 7 Gün — Ziyaretçi Trendi</div>
                      <div className="dash-chart-visual">
                        {[35, 55, 40, 70, 50, 85, 100].map((h, i) => (
                          <div key={i} className={`dash-bar${i === 6 ? ' hi' : i === 5 ? ' mid' : ''}`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="dash-table">
                      {[
                        { label: 'Blog Yazısı', val: '24', badge: 'badge-green', badgeText: 'Aktif' },
                        { label: 'Form Başvurusu', val: '14', badge: 'badge-yellow', badgeText: 'Yeni' },
                        { label: 'Hizmet Sayfası', val: '8', badge: '', badgeText: '' },
                      ].map((r) => (
                        <div key={r.label} className="dash-row">
                          <span className="dash-row-label">{r.label}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="dash-row-val">{r.val}</span>
                            {r.badge && <span className={`dash-row-badge ${r.badge}`}>{r.badgeText}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech strip ── */}
      <div className="tech-section">
        <div className="container">
          <p className="tech-sub">Güçünü Aldığı Teknolojiler</p>
          <div className="tech-brand">NETRAVOX<span className="dot">.</span></div>
          <div className="tech-logos">
            {TECH.map((t) => <span key={t} className="tech-logo-item">{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── Why ── */}
      <section className="why-section">
        <div className="container">
          <div className="center">
            <h2>Neden Netravox?</h2>
            <p className="section-desc" style={{ margin: '12px auto 0' }}>
              İşletmenizin dijital dünyada varlığını güçlendirmek için ihtiyacınız olan her şey tek bir platformda.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w) => (
              <div key={w.title} className="why-card">
                <div className="why-icon" style={{ background: w.bg }}>{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors ── */}
      <section className="sectors-section">
        <div className="container">
          <div className="sectors-header">
            <div className="sectors-header-left">
              <h2>Sektörünüze Özel Çözümler</h2>
              <p>Her sektörün dinamiğini bilen; işletmenizin ihtiyaçlarına tam uyan altyapılar sunuyoruz.</p>
            </div>
            <Link href="/sektorler" className="sectors-see-all">Tüm Sektörleri Gör →</Link>
          </div>
          <div className="sectors-grid">
            {SECTORS.map((s) => (
              <Link href="/sektorler" key={s.name} className="sector-card">
                <img src={s.img} alt={s.name} className="sector-img" />
                <div className="sector-info">
                  <div className="sector-info-top">
                    <div className="sector-badge-icon" style={{ background: s.iconBg }}>{s.icon}</div>
                    <h3>{s.name}</h3>
                  </div>
                  <p>{s.desc}</p>
                  <span className="sector-link">İncele →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div><div className="stat-number">500+</div><div className="stat-label">Mutlu Müşteri</div></div>
            <div><div className="stat-number">%99.9</div><div className="stat-label">Kesintisiz Çalışma</div></div>
            <div><div className="stat-number">15+</div><div className="stat-label">Farklı Sektör</div></div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-left">
              <div className="cta-badge">
                <span className="badge-pill badge-pill-dark"><span className="dot" />HEMEN BAŞLAYIN</span>
              </div>
              <h2>Dijital dönüşümünüzü daha fazla ertelemeyin.</h2>
              <p>Uzman ekibimizle tanışın, işletmenize en uygun çözümü birlikte planlayalım. Siz işinize odaklanın, dijital vitrinizi biz yönetelim.</p>
            </div>
            <Link href="/iletisim" className="btn btn-gold btn-lg" style={{ flexShrink: 0 }}>
              Görüşme Planla →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog preview ── */}
      {posts && posts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="center">
              <h2>Dijital Büyüme Rehberi</h2>
              <p className="section-desc" style={{ margin: '12px auto 0' }}>
                SEO, dijital pazarlama ve web teknolojileri hakkında uzman içerikler.
              </p>
            </div>
            <div className="blog-grid">
              {posts.slice(0, 3).map((p) => (
                <Link href={`/blog/${p.slug}`} key={p._id} className="blog-card">
                  {p.coverImage && <img src={p.coverImage} alt={p.title?.tr} className="blog-img" />}
                  <div className="blog-body">
                    {p.tags?.[0] && <span className="blog-tag">{p.tags[0]}</span>}
                    <h3>{p.title?.tr}</h3>
                    <p>{p.excerpt?.tr}</p>
                  </div>
                  <div className="blog-foot">
                    <span>{p.author}</span>
                    <span>{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }) : ''}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="blog-more">
              <Link href="/blog" className="btn btn-outline">Tüm Yazılar →</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticProps() {
  const [company, posts, nav] = await Promise.all([getCompany(), getBlog(), getNavigation()]);
  return { props: { company: company || null, posts: posts || [], nav: nav || null }, revalidate: 3600 };
}
