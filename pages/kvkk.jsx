import Head from 'next/head';
import { getCompany, getNavigation } from '../lib/api';

export default function KvkkPage({ company }) {
  return (
    <>
      <Head>
        <title>KVKK Aydınlatma Metni — Netravox</title>
        <meta name="description" content="Netravox KVKK (Kişisel Verilerin Korunması Kanunu) aydınlatma metni." />
      </Head>

      <section className="inner-hero">
        <div className="container">
          <h1>KVKK Aydınlatma Metni</h1>
          <p>Kişisel verilerinizin korunması hakkında bilgi.</p>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 96px', lineHeight: 1.8, color: 'var(--text)' }}>
        <h2 style={{ marginBottom: 16 }}>1. Veri Sorumlusu</h2>
        <p style={{ marginBottom: 24 }}>
          {company?.name || 'Netravox'} ("Şirket"), {company?.contact?.address || 'İstanbul, Türkiye'} adresinde faaliyet gösteren veri sorumlusudur.
          İletişim: {company?.contact?.email || 'hello@netravox.com'}
        </p>

        <h2 style={{ marginBottom: 16 }}>2. Kişisel Verilerin İşlenme Amaçları</h2>
        <p style={{ marginBottom: 24 }}>
          Toplanan kişisel veriler; iletişim taleplerini yanıtlamak, hizmet teklifleri sunmak, yasal yükümlülükleri yerine getirmek ve
          pazarlama faaliyetleri yürütmek amacıyla işlenmektedir.
        </p>

        <h2 style={{ marginBottom: 16 }}>3. İşlenen Kişisel Veriler</h2>
        <p style={{ marginBottom: 24 }}>
          Ad-soyad, e-posta adresi, telefon numarası, firma adı ve iletişim formu aracılığıyla gönderilen mesaj içerikleri işlenmektedir.
        </p>

        <h2 style={{ marginBottom: 16 }}>4. Kişisel Verilerin Aktarılması</h2>
        <p style={{ marginBottom: 24 }}>
          Kişisel verileriniz; yasal zorunluluklar ve hizmet sunumu kapsamında gerekli teknik altyapı sağlayıcılarına aktarılabilir.
          Üçüncü taraflarla paylaşım KVKK kapsamında gerçekleştirilir.
        </p>

        <h2 style={{ marginBottom: 16 }}>5. Kişisel Veri Sahibinin Hakları</h2>
        <p>
          KVKK'nın 11. maddesi uyarınca kişisel verilerinize ilişkin; erişim, düzeltme, silme, işlemenin kısıtlanması,
          veri taşınabilirliği ve itiraz haklarına sahipsiniz. Taleplerinizi <strong>{company?.contact?.email || 'hello@netravox.com'}</strong> adresine
          iletebilirsiniz.
        </p>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const [company, nav] = await Promise.all([getCompany(), getNavigation()]);
  return { props: { company: company || null, nav: nav || null }, revalidate: 86400 };
}
