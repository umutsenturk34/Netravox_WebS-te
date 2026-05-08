import Head from 'next/head';
import Link from 'next/link';
import { getCompany, getBlog, getNavigation } from '../../lib/api';
import { breadcrumbSchema } from '../../lib/schema';

export default function BlogPage({ company, posts }) {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Blog', href: '/blog' },
  ]);

  return (
    <>
      <Head>
        <title>Blog — Netravox</title>
        <meta name="description" content="SEO, dijital pazarlama, web teknolojileri ve sektöre özel dijital dönüşüm rehberleri." />
        <link rel="canonical" href="https://netravox.com/blog" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <section className="inner-hero" style={{ textAlign: 'center' }}>
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <span className="badge-pill"><span className="dot" />BLOG</span>
          </div>
          <h1>Dijital Büyüme Rehberi</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 480, margin: '14px auto 0', lineHeight: 1.7 }}>
            SEO, dijital pazarlama ve web teknolojileri hakkında uzman içerikler.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts && posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p._id} className="blog-card">
                  {p.coverImage && <img src={p.coverImage} alt={p.title?.tr || ''} className="blog-img" />}
                  <div className="blog-body">
                    {p.tags?.[0] && <span className="blog-tag">{p.tags[0]}</span>}
                    <h3>{p.title?.tr}</h3>
                    <p>{p.excerpt?.tr}</p>
                  </div>
                  <div className="blog-foot">
                    <span>{p.author}</span>
                    <span>{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
              <p>Henüz blog yazısı yok. Yakında içerikler eklenecek.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [company, posts, nav] = await Promise.all([getCompany(), getBlog(), getNavigation()]);
  return { props: { company: company || null, posts: posts || [], nav: nav || null }, revalidate: 3600 };
}
