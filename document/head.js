import Head from 'next/head';

import reset from 'styles/reset';

export default function DocumentHead() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#bb0a1e" />

      <meta property="og:site_name" content="International Quidditch Association" />
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
        href={`//${process.env.PRISMIC_REPOSITORY_NAME}.prismic.io`}
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
      <script
        async
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TOKEN}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TOKEN}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
    </Head>
  );
}
