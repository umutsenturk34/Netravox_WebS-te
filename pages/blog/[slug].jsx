import Head from 'next/head';
import Link from 'next/link';
import { getCompany, getBlog, getBlogPost, getNavigation } from '../../lib/api';
import { blogPostSchema, breadcrumbSchema } from '../../lib/schema';

function slugify(text) {
  return text
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/Ü/g, 'u')
    .replace(/ş/g, 's').replace(/Ş/g, 's')
    .replace(/ı/g, 'i').replace(/İ/g, 'i')
    .replace(/ö/g, 'o').replace(/Ö/g, 'o')
    .replace(/ç/g, 'c').replace(/Ç/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function processContent(html) {
  const headings = [];
  const contentWithIds = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (match, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugify(text);
    headings.push({ tag, text, id });
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
  return { headings, contentWithIds };
}

export default function BlogPostPage({ company, post }) {
  if (!post) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2>Yazı bulunamadı</h2>
          <Link href="/blog" className="btn btn-navy" style={{ marginTop: 20 }}>← Blog'a dön</Link>
        </div>
      </section>
    );
  }

  const title = post.title?.tr || '';
  const excerpt = post.excerpt?.tr || '';
  const rawContent = post.content?.tr || '';
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  const { headings, contentWithIds } = processContent(rawContent);

  const jsonLd = [
    blogPostSchema(post),
    breadcrumbSchema([
      { name: 'Ana Sayfa', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: title, href: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <Head>
        <title>{post.seo?.metaTitle?.tr || `${title} — Netravox Blog`}</title>
        <meta name="description" content={post.seo?.metaDesc?.tr || excerpt} />
        {post.seo?.keywords?.tr && <meta name="keywords" content={post.seo.keywords.tr} />}
        <meta property="og:title" content={post.seo?.metaTitle?.tr || title} />
        <meta property="og:description" content={post.seo?.metaDesc?.tr || excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://netravox.com/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://netravox.com/blog/${post.slug}`} />
        {jsonLd.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </Head>

      <section className="blog-post-hero">
        <div className="container" style={{ maxWidth: 1060 }}>
          {post.tags?.[0] && <span className="post-tag">{post.tags[0]}</span>}
          <h1>{title}</h1>
          <div className="blog-post-meta">
            {post.author && <span>✍️ {post.author}</span>}
            {date && <span>📅 {date}</span>}
          </div>
        </div>
      </section>

      <div className="blog-post-layout">
        <div className="blog-post-main">
          {post.coverImage && (
            <img src={post.coverImage} alt={title} className="blog-post-cover" />
          )}
          <div className={`blog-post-content${post.coverImage ? ' has-cover' : ''}`} dangerouslySetInnerHTML={{ __html: contentWithIds }} />
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, marginTop: 0 }}>
            <Link href="/blog" style={{ color: 'var(--gold)', fontWeight: 600 }}>← Blog'a dön</Link>
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="blog-toc">
            <div className="blog-toc-inner">
              <div className="blog-toc-title">İÇİNDEKİLER</div>
              <nav>
                {headings.map((h) => (
                  <a key={h.id} href={`#${h.id}`} className={`toc-item toc-${h.tag}`}>
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getBlog();
  const paths = (posts || []).map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const [company, post, nav] = await Promise.all([getCompany(), getBlogPost(params.slug), getNavigation()]);
  if (!post) return { notFound: true };
  return { props: { company: company || null, post, nav: nav || null }, revalidate: 3600 };
}
