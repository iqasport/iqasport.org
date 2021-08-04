const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
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
