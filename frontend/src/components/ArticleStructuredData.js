import React from 'react';
import { Helmet } from 'react-helmet';

function ArticleStructuredData({ article }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole
    },
    "description": article.content.substring(0, 200),
    "keywords": article.tags.join(", "),
    "image": article.imageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Your Tech Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

export default ArticleStructuredData;
