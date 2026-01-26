import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export function SEO({
  title = "NanoURL - Modern URL Shortener",
  description = "Create short, branded links with real-time analytics. The fastest and most beautiful URL shortener built with Next.js and TypeScript.",
  keywords = ["URL shortener", "link shortener", "analytics", "branding", "Next.js", "React"],
  image = "/og-image.png",
  url = "https://nanourl.vercel.app",
  type = "website"
}: SEOProps) {
  const fullTitle = title.includes("NanoURL") ? title : `${title} | NanoURL`;
  const fullImage = image.startsWith("http") ? image : `${url}${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Harshit Kudhial" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="NanoURL" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#06b6d4" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "NanoURL",
            "description": description,
            "url": url,
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "author": {
              "@type": "Person",
              "name": "Harshit Kudhial"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </Head>
  );
}