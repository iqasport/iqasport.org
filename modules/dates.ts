import format from 'date-fns/format';
import { enUS, fr, es, de } from 'date-fns/locale';

const locales = {
  'en-us': enUS,
  'fr-fr': fr,
  'es-es': es,
  'de-de': de,
};

const formatLocale = ({
  date,
  locale = 'en-us',
  dateFormat = 'd MMMM, yyyy',
}: {
  date: Date | number;
  locale?: string;
  dateFormat?: string;
}) => format(date, dateFormat, { locale: locales[locale] });

export default formatLocale;
