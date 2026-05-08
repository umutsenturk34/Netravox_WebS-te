const SITE_URL = 'https://netravox.com';

export function organizationSchema(company) {
  const c = company?.contact || {};
  const s = company?.socialLinks || {};
  const sameAs = Object.values(s).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company?.name || 'Netravox',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: company?.description?.tr || 'Sektörünü bilen akıllı web yönetim platformu.',
    contactPoint: c.email || c.phone ? {
      '@type': 'ContactPoint',
      telephone: c.phone || undefined,
      email: c.email || undefined,
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish',
    } : undefined,
    address: c.address ? {
      '@type': 'PostalAddress',
      streetAddress: c.address,
      addressLocality: c.city || 'İstanbul',
      addressCountry: 'TR',
    } : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Netravox',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function blogPostSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title?.tr || '',
    description: post.excerpt?.tr || '',
    image: post.coverImage || undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: post.author || 'Netravox',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Netravox',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
