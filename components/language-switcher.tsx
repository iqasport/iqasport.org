import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const locales = {
  'en-us': {
    emoji: getFlagEmoji('us'),
    label: 'English',
  },
  'fr-fr': {
    emoji: getFlagEmoji('fr'),
    label: 'French',
  },
  'de-de': {
    emoji: getFlagEmoji('de'),
    label: 'German',
  },
  'es-es': {
    emoji: getFlagEmoji('es'),
    label: 'Spanish',
  },
  tr: {
    emoji: getFlagEmoji('tr'),
    label: 'Turkish',
  },
  'it-it': {
    emoji: getFlagEmoji('it'),
    label: 'Italian',
  },
};

const LanguageSwitcher = (props) => {
  const { locale: currentLang, push, asPath, route } = useRouter();

  // TODO: enable on other pages once translated
  if (route !== '/news/[uid]') {
    return <></>;
  }

  return (
    <Select
      aria-label="Language Selector"
      bg="white"
      maxWidth="150px"
      mr={4}
      borderRadius="md"
      value={currentLang}
      {...props}
      onChange={(e) => {
        push(asPath, null, { locale: e.target.value });
        if (props.onChange) {
          props.onChange(e);
        }
      }}
    >
      {Object.keys(locales).map((locale) => {
        return (
          <option key={locale} value={locale}>
            {locales[locale].emoji} {locales[locale].label}
          </option>
        );
      })}
    </Select>
  );
};

export default LanguageSwitcher;
