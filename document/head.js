import Head from 'next/head';
import Script from 'next/script';
import reset from 'styles/reset';

export default function DocumentHead() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#62b058"
      />
      <meta name="msapplication-TileColor" content="#00a300" />
      <meta name="theme-color" content="#62b058" />

      <meta
        property="og:site_name"
        content="International Quidditch Association"
      />
      <meta property="twitter:creator" content="@IQAsport" />
      <meta property="og:image:alt" content="Page image for iqasport.com" />
      <meta
        property="twitter:image:alt"
        content="Page image for iqasport.com"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="twitter:card" content="summary_large_image" />

      <link rel="preconnect" href="//images.prismic.io" />
      <link
        rel="preconnect"
        href={`//${process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME}.prismic.io`}
      />
      {/* Offline-Mode */}
      {/* <link rel="manifest" href="/manifest.json" /> */}

      {/* Fonts */}
      <link
        rel="preload"
        href="https://use.typekit.net/ltm4yyn.css"
        as="style"
      />
      <link rel="stylesheet" href="https://use.typekit.net/ltm4yyn.css" />

      {/* Static CSS */}
      <style dangerouslySetInnerHTML={{ __html: reset }} />

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TOKEN}`}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TOKEN}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </Head>
  );
}
