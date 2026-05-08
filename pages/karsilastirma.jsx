import Head from 'next/head';
import Link from 'next/link';
import { getCompany, getNavigation } from '../lib/api';
import { breadcrumbSchema } from '../lib/schema';

const S = <span className="star">★</span>;
const N = <span className="dash">—</span>;
const V = (t) => <span className="val-sm">{t}</span>;

const GROUPS = [
  {
    name: 'Hosting & Altyapı',
    rows: [
      ['Sunucu Alanı', V('1 GB'), V('10 GB'), V('Sınırsız')],
      ['Aylık Ziyaretçi Kapasitesi', V('10.000'), V('50.000'), V('Sınırsız')],
      ['Ücretsiz SSL Sertifikası', S, S, S],
      ['Cloudflare CDN', S, S, S],
      ['Otomatik Yedekleme', V('Haftalık'), V('Günlük'), V('Günlük')],
    ],
  },
  {
    name: 'Tasarım & İçerik',
    rows: [
      ['Mobil Uyumlu Tasarım', S, S, S],
      ['İşletmenize Özel Tasarım', S, S, S],
      ['Premium Tasarım Seçenekleri', N, S, S],
      ['Tamamen Özel Arayüz', N, N, S],
      ['Sınırsız Sayfa Ekleme', N, S, S],
      ['Çoklu Dil Desteği (TR/EN)', N, S, S],
    ],
  },
  {
    name: 'Pazarlama & SEO',
    rows: [
      ['Temel SEO Ayarları', S, S, S],
      ['Otomatik Schema Markup', S, S, S],
      ['Sitemap.xml Üretimi', S, S, S],
      ['Gelişmiş SEO & Analitik', N, S, S],
      ['Yapay Zeka İçerik Desteği', N, S, S],
      ['Özel Yazılım Entegrasyonları', N, N, S],
    ],
  },
  {
    name: 'Formlar & İletişim',
    rows: [
      ['İletişim Formu', S, S, S],
      ['Rezervasyon / Randevu Formu', S, S, S],
      ['E-posta Bildirimleri', S, S, S],
      ['WhatsApp Entegrasyonu', N, S, S],
    ],
  },
  {
    name: 'Destek & Hizmet',
    rows: [
      ['Teknik Destek', V('E-posta'), V('Tel + E-posta'), V('7/24 Özel')],
      ['Destek Yanıt Süresi', V('48 saat'), V('8 saat'), V('4 saat')],
      ['Ücretsiz Alan Adı', N, V('1. yıl ücretsiz'), S],
      ['Aylık Danışmanlık', N, N, V('5 saat')],
    ],
  },
];

export default function KarsilastirmaPage({ company }) {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Paket Karşılaştırma', href: '/karsilastirma' },
  ]);

  return (
    <>
      <Head>
        <title>Paket Karşılaştırma — Netravox</title>
        <meta name="description" content="Netravox Başlangıç, Profesyonel ve Kurumsal paket özelliklerini detaylı karşılaştırın." />
        <link rel="canonical" href="https://netravox.com/karsilastirma" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <section className="comp-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>
            <span className="badge-pill"><span className="dot" />PAKET KARŞILAŞTIRMA</span>
          </div>
          <h1 style={{ marginBottom: 14 }}>Tüm Özellikleri Detaylıca İnceleyin</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Her paketin hangi özellikleri içerdiğini satır satır görün. Gizli ücret yok, sürpriz yok.
          </p>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="comp-wrap">
            <table className="comp-table">
              <thead>
                <tr>
                  <th className="th-feat">Özellik</th>
                  <th className="th-pkg">
                    <strong>Başlangıç</strong>
                    <small>Hızlı başlangıç için</small>
                    <Link href="/iletisim" className="pkg-cta-small pkg-cta-outline" style={{ marginTop: 10 }}>Teklif Al</Link>
                  </th>
                  <th className="th-pkg gold">
                    <strong>Profesyonel</strong>
                    <small>En çok tercih edilen</small>
                    <Link href="/iletisim" className="pkg-cta-small pkg-cta-dark" style={{ marginTop: 10 }}>Teklif Al</Link>
                  </th>
                  <th className="th-pkg">
                    <strong>Kurumsal</strong>
                    <small>Tam kapsamlı çözüm</small>
                    <Link href="/iletisim" className="pkg-cta-small pkg-cta-outline" style={{ marginTop: 10 }}>Özel Teklif İste</Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {GROUPS.map((group) => (
                  <>
                    <tr key={group.name} className="group-header">
                      <td colSpan={4}>{group.name}</td>
                    </tr>
                    {group.rows.map((row, i) => (
                      <tr key={i}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td className="gold-col">{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="upgrade-section">
        <div className="container">
          <div className="upgrade-grid">
            <div className="upgrade-left">
              <div className="upgrade-badge">
                <span className="badge-pill"><span className="dot" />PAKETİNİZİ SEÇİN</span>
              </div>
              <h2>İşletmeniz için en uygun planı bulun</h2>
              <p>
                Her ölçekteki işletme için uygun çözümümüz var. Hangi pakette hangi özellikler olduğunu yukarıda detaylı inceleyebilirsiniz.
              </p>
              <div className="upgrade-btns">
                <Link href="/paketler" className="btn btn-navy btn-lg">Paketleri İncele →</Link>
                <Link href="/iletisim" className="btn btn-outline btn-lg">Satış Ekibiyle Görüş</Link>
              </div>
            </div>
            <div className="quote-card">
              <div className="q-mark">"</div>
              <p>
                {company?.content?.testimonial?.quote?.tr || 'Netravox ile web sitemizi 2 haftada yayına aldık. Paket karşılaştırması sayesinde tam ihtiyacımıza uygun planı kolayca seçebildik.'}
              </p>
              <div className="quote-author">
                <div className="quote-avatar">
                  {(company?.content?.testimonial?.author || 'AY').split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="quote-name">{company?.content?.testimonial?.author || 'Ahmet Yılmaz'}</div>
                  <div className="quote-role">{company?.content?.testimonial?.role || 'Kurucu Ortak, Yılmaz Mimarlık'}</div>
                </div>
              </div>
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
