
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  children?: React.ReactNode;
}

/**
 * SEO component that helps optimize the site for search engines and social media
 */
const SEO: React.FC<SEOProps> = ({
  title = 'Pionexia | Agence de Développement Web et Mobile',
  description = 'Pionexia est une agence de développement web et mobile spécialisée dans la création de sites web, applications mobiles et solutions IA sur mesure.',
  keywords = 'développement web, développement mobile, solutions IA, design UI/UX, intégration, automatisation, maroc, casablanca, rabat, agadir',
  image = '/pionexia-preview.png',
  url = 'https://pionexia.com',
  type = 'website',
  twitterCard = 'summary_large_image',
  children,
}) => {
  const siteTitle = 'Pionexia';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile specific */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1D4ED8" />
      
      {/* Additional metadata */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Pionexia" />

      {/* Additional elements */}
      {children}
    </Helmet>
  );
};

export default SEO;
