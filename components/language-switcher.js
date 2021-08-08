import NextLink from 'next/link';
import { linkResolver } from 'modules/prismic';
import { UnorderedList, ListItem, Link as ChakraLink } from 'components';

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const LanguageSwitcher = ({ altLangs = [] }) => (
  <UnorderedList ml="auto">
    {altLangs.map((altLang) => (
      <ListItem display="inline" key={altLang.id} fontSize="3xl" pl={3}>
        <NextLink locale={altLang.lang} href={linkResolver(altLang)} passHref>
          <ChakraLink>{getFlagEmoji(altLang.lang.slice(-2))}</ChakraLink>
        </NextLink>
      </ListItem>
    ))}
  </UnorderedList>
);

export default LanguageSwitcher;
