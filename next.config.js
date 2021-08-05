module.exports = {
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us', 'de-de', 'fr-fr', 'es-es'],
  },
  images: {
    domains: ['images.prismic.io', 'iqasport.cdn.prismic.io'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
