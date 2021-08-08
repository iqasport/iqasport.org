// import NextLink from 'next/link';
// import { linkResolver } from 'modules/prismic';
// import { UnorderedList, ListItem, Link as ChakraLink } from 'components';
import { Select } from 'components';
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
};

const LanguageSwitcher = (props) => {
  const { locale: currentLang, push } = useRouter();

  return (
    <Select
      bg="white"
      maxWidth="150px"
      mr={4}
      borderRadius="md"
      value={currentLang}
      onChange={(e) => {
        push('/', null, { locale: e.target.value });
      }}
      {...props}
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
