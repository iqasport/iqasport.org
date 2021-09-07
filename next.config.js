// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us', 'de-de', 'fr-fr', 'es-es'],
  },
  images: {
    domains: ['images.prismic.io', 'iqasport.cdn.prismic.io'],
  },
  async redirects() {
    // legacy redirects from old site
    return [
      {
        source: '/board-of-trustees',
        destination: '/about/meet-the-iqa',
        permanent: true,
      },
      {
        source: '/media-inquiries',
        destination: '/about/contact-us',
        permanent: true,
      },
      {
        source: '/partners',
        destination: '/about/contact-us',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/about/contact-us',
        permanent: true,
      },
      {
        source: '/media',
        destination: '/videos',
        permanent: true,
      },
      {
        source: '/documents',
        destination: '/about/documents-and-policies',
        permanent: true,
      },
      {
        source: '/national-governing-bodies',
        destination: '/about/members',
        permanent: true,
      },
      {
        source: '/teams',
        destination: '/about/members',
        permanent: true,
      },
      {
        source: '/history',
        destination: '/about/mission-and-values',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/',
        permanent: true,
      },
      {
        source: '/guides',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
