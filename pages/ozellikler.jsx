import Head from 'next/head';
import Link from 'next/link';
import { getCompany, getNavigation } from '../lib/api';
import { breadcrumbSchema } from '../lib/schema';

const FEATURES = [
  {
    label: 'İçerik Yönetimi',
    title: 'Tüm içeriklerinizi tek panelden yönetin',
    desc: 'Sayfalar, blog yazıları, hizmetler, görseller ve daha fazlasını teknik bilgi gerektirmeden kolayca düzenleyin. Değişiklikler anında yayına girer.',
    icon: '📝',
    items: ['Sürükle-bırak sayfa düzenleyici', 'Blog yazısı oluşturma ve yayınlama', 'Hizmet & ürün yönetimi', 'Çoklu dil desteği (TR/EN)', 'Medya kütüphanesi'],
  },
  {
    label: 'SEO Araçları',
    title: "Arama motorlarında öne çıkın",
    desc: 'Her sayfa için özelleştirilebilir meta başlık, açıklama ve schema markup ile arama motorlarında görünürlüğünüzü artırın.',
    icon: '🔍',
    items: ['Sayfa başına SEO ayarları', 'Otomatik schema markup (JSON-LD)', 'Sitemap.xml ve robots.txt üretimi', 'Canonical URL yönetimi', 'OpenGraph & Twitter Card desteği'],
    reverse: true,
  },
  {
    label: 'Yapay Zeka Desteği',
    title: 'Yapay zeka ile içerik üretin',
    desc: 'Sektörünüze ve dilinize uygun blog yazıları, sayfa metinleri ve hizmet açıklamalarını saniyeler içinde oluşturun.',
    icon: '🤖',
    items: ['Blog yazısı otomatik üretimi', 'Sektöre özel ton ayarı', 'TR/EN içerik desteği', 'Bir tıkla taslak oluşturma', 'Profesyonel ve Kurumsal paketlerde dahil'],
  },
  {
    label: 'Formlar & İletişim',
    title: 'Müşteri taleplerini kaçırmayın',
    desc: 'İletişim formları, rezervasyon sistemi ve randevu modülleri ile müşteri taleplerinizi otomatik e-posta bildirimiyle alın ve yönetin.',
    icon: '📬',
    items: ['Özelleştirilebilir iletişim formu', 'Online rezervasyon (restoran)', 'Randevu modülü (klinik)', 'Otomatik e-posta bildirimleri', 'Form başvurularını listeleme'],
    reverse: true,
  },
  {
    label: 'Güvenlik & Performans',
    title: 'Güvenli, hızlı ve güvenilir altyapı',
    desc: 'SSL sertifikası, CDN entegrasyonu, otomatik yedekleme ve %99.9 uptime garantisi ile siteniz her zaman erişilebilir ve güvende.',
    icon: '🔒',
    items: ['Ücretsiz SSL sertifikası', 'Cloudflare CDN entegrasyonu', 'Otomatik günlük yedekleme', '%99.9 uptime garantisi', '2FA (iki faktörlü doğrulama) desteği'],
  },
];

export default function OzelliklerPage({ company }) {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Özellikler', href: '/ozellikler' },
  ]);

  return (
    <>
      <Head>
        <title>Özellikler — Netravox</title>
        <meta name="description" content="İçerik yönetimi, SEO araçları, yapay zeka içerik üretimi ve daha fazlası. Netravox platformunun tüm özelliklerini keşfedin." />
        <link rel="canonical" href="https://netravox.com/ozellikler" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <section className="inner-hero" style={{ textAlign: 'center' }}>
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <span className="badge-pill"><span className="dot" />PLATFORM</span>
          </div>
          <h1>Platformun tüm güçleri<br />tek panelde</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '14px auto 0', lineHeight: 1.7 }}>
            Netravox size sadece bir web sitesi vermez; sitenizi büyüten eksiksiz bir dijital altyapı sunar.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="feature-rows">
          {FEATURES.map((f) => (
            <div key={f.label} className={`feature-row${f.reverse ? ' rev' : ''}`}>
              <div className="feature-vis">
                {f.icon}
              </div>
              <div className="feature-txt">
                <span className="section-label">{f.label}</span>
                <h2>{f.title}</h2>
                <p>{f.desc}</p>
                <ul className="feat-list">
                  {f.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-left">
              <div className="cta-badge">
                <span className="badge-pill badge-pill-dark"><span className="dot" />HEMEN BAŞLAYIN</span>
              </div>
              <h2>Tüm özellikler sizin için hazır</h2>
              <p>Hangi pakette hangi özellikler var? Detaylı karşılaştırmayı inceleyin veya doğrudan bizimle konuşun.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
              <Link href="/karsilastirma" className="btn btn-outline-white btn-lg">Paket Karşılaştırma</Link>
              <Link href="/iletisim" className="btn btn-gold btn-lg">Bize Yazın →</Link>
            </div>
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
