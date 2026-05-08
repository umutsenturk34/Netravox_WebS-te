import Head from 'next/head';
import { useState } from 'react';
import { getCompany, getNavigation } from '../lib/api';
import { organizationSchema, breadcrumbSchema } from '../lib/schema';

export default function IletisimPage({ company }) {
  const contact = company?.contact || {};
  const wh = company?.workingHours || [];

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
      const SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || 'netravox';
      const res = await fetch(`${BASE}/api/public/${SLUG}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          message: `Konu: ${form.subject || '—'}\n\n${form.message}`,
          kvkkConsent: true,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Hata');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const defaultWh = [
    { days: 'Pazartesi – Cuma', hours: '09:00 – 18:00' },
    { days: 'Cumartesi', hours: '10:00 – 14:00' },
  ];
  const whList = wh.length ? wh : defaultWh;

  const jsonLd = [
    organizationSchema(company),
    breadcrumbSchema([{ name: 'Ana Sayfa', href: '/' }, { name: 'İletişim', href: '/iletisim' }]),
  ];

  return (
    <>
      <Head>
        <title>İletişim — Netravox</title>
        <meta name="description" content="Netravox ile iletişime geçin. Sorularınız ve projeleriniz için bize yazın." />
        <link rel="canonical" href="https://netravox.com/iletisim" />
        {jsonLd.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </Head>

      <div className="contact-page">
        <div className="container">
          <div className="contact-page-header">
            <span className="section-label">İLETİŞİM</span>
            <h1>Bizimle İletişime Geçin</h1>
            <p>Sorularınız ve projeleriniz için bize ulaşın. En kısa sürede dönüş yapacağız.</p>
          </div>

          <div className="contact-layout">
            {/* Form */}
            <div className="contact-form-box">
              {status === 'success' ? (
                <div className="form-success">
                  ✓ Mesajınız iletildi! En kısa sürede size dönüş yapacağız.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Ad *</label>
                      <input className="form-input" placeholder="Adınız" value={form.firstName} onChange={set('firstName')} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Soyad</label>
                      <input className="form-input" placeholder="Soyadınız" value={form.lastName} onChange={set('lastName')} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-posta Adresi *</label>
                    <input className="form-input" type="email" placeholder="email@sirketiniz.com" value={form.email} onChange={set('email')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Konu</label>
                    <select className="form-input" value={form.subject} onChange={set('subject')}>
                      <option value="">Konu seçin</option>
                      <option>Paket bilgisi</option>
                      <option>Teknik destek</option>
                      <option>Özel proje</option>
                      <option>Kurulum süreci</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mesaj *</label>
                    <textarea className="form-input" rows={5} placeholder="Projeniz veya sorunuz hakkında kısaca bilgi verin..." value={form.message} onChange={set('message')} required />
                  </div>
                  {status === 'error' && (
                    <p style={{ color: '#DC2626', fontSize: '0.85rem', marginBottom: 12 }}>Hata: {errorMsg}</p>
                  )}
                  <button type="submit" className="form-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Gönderiliyor...' : (
                      <>Mesaj Gönder <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                    )}
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 12 }}>
                    Formu göndererek KVKK kapsamında kişisel verilerinizin işlenmesini kabul etmiş olursunuz.
                  </p>
                </form>
              )}
            </div>

            {/* Right column */}
            <div className="contact-right">
              <div className="vox-card">
                <div className="vox-brand">VO<span>X</span></div>
                <div className="vox-section-label">Merkez Ofis</div>

                {(contact.address || contact.city) && (
                  <div className="vox-info-item">
                    <div className="vox-info-icon">📍</div>
                    <div className="vox-info-text">
                      <strong>Adres</strong>
                      <span>{[contact.address, contact.city].filter(Boolean).join(', ')}</span>
                    </div>
                  </div>
                )}

                {contact.phone && (
                  <div className="vox-info-item">
                    <div className="vox-info-icon">📞</div>
                    <div className="vox-info-text">
                      <strong>Telefon</strong>
                      <span><a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>{contact.phone}</a></span>
                    </div>
                  </div>
                )}

                <div className="vox-info-item">
                  <div className="vox-info-icon">✉️</div>
                  <div className="vox-info-text">
                    <strong>E-posta</strong>
                    <span><a href={`mailto:${contact.email || 'hello@netravox.com'}`} style={{ color: 'inherit' }}>{contact.email || 'hello@netravox.com'}</a></span>
                  </div>
                </div>

                <div className="hours-section">
                  <div className="hours-label">Çalışma Saatleri</div>
                  {whList.map((row, i) => (
                    <div key={i} className="hours-row">
                      <span className="hours-days">{row.days}</span>
                      <span className="hours-time">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="map-card">
                <div className="map-bg" />
                <div className="map-label-bar">{contact.city || 'İstanbul'}, Türkiye</div>
                <div className="map-pin">
                  <div className="map-pin-dot" />
                  <div className="map-pin-label">{contact.city || 'İstanbul'} Merkez</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const [company, nav] = await Promise.all([getCompany(), getNavigation()]);
  return { props: { company: company || null, nav: nav || null }, revalidate: 3600 };
}
