import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getCompany, getFaqs, getNavigation } from '../lib/api';
import { breadcrumbSchema } from '../lib/schema';

const PACKAGES = [
  {
    id: 'baslangic',
    name: 'Başlangıç',
    desc: 'Dijital dünyaya adım atan işletmeler için hızlı ve etkili web varlığı.',
    featured: false,
    cta: 'Teklif Al',
    features: [
      'İşletmenize özel hızlı kurulum',
      'Mobil uyumlu tasarım',
      '1 GB Sunucu Alanı',
      'Ücretsiz SSL Sertifikası',
      'Temel SEO ayarları',
      'E-posta ile teknik destek',
    ],
  },
  {
    id: 'profesyonel',
    name: 'Profesyonel',
    desc: 'Büyüyen işletmeler için daha fazla özelleştirme, daha fazla güç.',
    featured: true,
    cta: 'Teklif Al',
    features: [
      'Sektöre özel premium tasarım',
      'Sınırsız sayfa ekleme',
      '10 GB Sunucu Alanı',
      'Gelişmiş SEO ve analitik entegrasyonu',
      'Randevu / Rezervasyon modülü',
      'Öncelikli telefon ve e-posta desteği',
      'Ücretsiz alan adı (İlk yıl)',
    ],
  },
  {
    id: 'kurumsal',
    name: 'Kurumsal',
    desc: 'Büyük ölçekli operasyonlar için tam kapsamlı ve özel çözümler.',
    featured: false,
    cta: 'Özel Teklif İste',
    features: [
      'Tamamen özel tasarım ve arayüz',
      'Sınırsız Sunucu Alanı',
      'Özel yazılım entegrasyonları',
      'Çoklu dil desteği',
      'Gelişmiş e-ticaret altyapısı',
      '7/24 Özel müşteri temsilcisi',
      'Aylık performans raporlaması',
    ],
  },
];

const FAQS_DEFAULT = [
  { q: 'Kurulumsüreci ne kadar sürer?', a: 'Başlangıç ve Profesyonel paketlerde kurulum süreci ortalama 5-10 iş günüdür. Kurumsal projelerde kapsama göre değişmektedir.' },
  { q: 'Daha sonra paketimi yükseltebilir miyim?', a: 'Evet, istediğiniz zaman daha üst pakete geçiş yapabilirsiniz. Geçiş işlemi sorunsuz gerçekleşir ve mevcut içerikleriniz korunur.' },
  { q: 'İçeriklerimi kendim güncelleyebilir miyim?', a: 'Evet. Netravox yönetici paneli sayesinde teknik bilgi gerektirmeden tüm sayfa, blog ve hizmet içeriklerinizi kendiniz yönetebilirsiniz.' },
  { q: 'İptal ve iade koşullarınız nelerdir?', a: 'İlk 14 gün içinde herhangi bir ücret ödemeksizin iptal edebilirsiniz. Sonrasında iptal talebi bir sonraki fatura döneminden itibaren geçerli olur.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`faq-chevron${open ? ' open' : ''}`}>▾</span>
      </button>
      <div className={`faq-a${open ? ' open' : ''}`}>{a}</div>
    </div>
  );
}

export default function PaketlerPage({ company, faqs }) {
  const [yearly, setYearly] = useState(false);
  const faqList = faqs?.length ? faqs : FAQS_DEFAULT;

  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Paketler', href: '/paketler' },
  ]);

  return (
    <>
      <Head>
        <title>Paketler — Netravox</title>
        <meta name="description" content="İşletmeniz için en uygun Netravox paketini seçin. Başlangıç, Profesyonel ve Kurumsal planlar." />
        <link rel="canonical" href="https://netravox.com/paketler" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <section className="pkg-hero">
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <span className="badge-pill"><span className="dot" />PAKETLER</span>
          </div>
          <h1>İşletmeniz için En Uygun Paketi Seçin</h1>
          <p>Gizli ücret yok, karmaşık sözleşmeler yok. İhtiyacınız olan özellikleri belirleyin ve dijital dünyada büyümeye hemen başlayın.</p>

          <div className="pkg-toggle-row">
            <div className="toggle-pills" style={{ position: 'relative' }}>
              <span className={`toggle-pill${!yearly ? ' active' : ''}`} onClick={() => setYearly(false)}>Aylık Ödeme</span>
              <span className={`toggle-pill${yearly ? ' active' : ''}`} onClick={() => setYearly(true)}>Yıllık Ödeme</span>
              {yearly && <span className="toggle-gift">2 AY HEDİYE!</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="packages-grid">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`pkg-card${pkg.featured ? ' featured' : ''}`}>
                {pkg.featured && <div className="pkg-popular">EN ÇOK TERCİH EDİLEN</div>}
                <div className="pkg-name" style={{ paddingTop: pkg.featured ? 16 : 0 }}>{pkg.name}</div>
                <p className="pkg-desc">{pkg.desc}</p>
                <div className="pkg-features">
                  {pkg.features.map((f) => (
                    <div key={f} className="pkg-feat-item">
                      <span className="pkg-feat-dot" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/iletisim" className={`pkg-btn ${pkg.featured ? 'pkg-btn-dark' : 'pkg-btn-outline'}`}>
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="enterprise-bar">
            <div className="ent-left">
              <div className="ent-icon">💡</div>
              <div>
                <strong>50'den fazla şubesi olan bir zincir misiniz?</strong>
                <span>Özel altyapı gereksinimleri ve hacim indirimleri için kurumsal satış ekibimizle görüşün.</span>
              </div>
            </div>
            <Link href="/iletisim" className="btn btn-outline-white" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff', flexShrink: 0 }}>
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>

      <section className="faq-section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic' }}>Sıkça Sorulan Sorular</h2>
            <p className="section-desc" style={{ margin: '10px auto 0' }}>Aklınıza takılan bir şey mi var? En çok sorulan soruların cevaplarını burada derledik.</p>
          </div>
          <div className="faq-list">
            {faqList.map((f, i) => (
              <FaqItem key={i} q={f.question?.tr || f.q} a={f.answer?.tr || f.a} />
            ))}
          </div>
          <p className="faq-footer">
            Başka sorularınız mı var? Destek ekibimize <Link href="/iletisim">iletişim sayfamızdan</Link> ulaşabilirsiniz.
          </p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [company, faqs, nav] = await Promise.all([getCompany(), getFaqs(), getNavigation()]);
  return { props: { company: company || null, faqs: faqs || [], nav: nav || null }, revalidate: 3600 };
}
