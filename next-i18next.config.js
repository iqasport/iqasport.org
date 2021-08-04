// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us', 'de-de', 'fr-fr', 'es-es'],
    localePath: path.resolve('./public/locales'),
  },
};
