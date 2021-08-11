import {
  Box,
  Image,
  Text,
  Flex,
  Grid,
  ListItem,
  Link as ChakraLink,
  UnorderedList,
} from 'components';
import get from 'just-safe-get';
import { Link as PrismicLink } from 'prismic-reactjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { linkResolver } from 'modules/prismic';

const logo = '/images/logo_short_monochrome_white.png';

const Item = (props) => <ListItem lineHeight="32px" {...props} />;

const ActiveLink = ({ href, children }) => {
  const { asPath } = useRouter();
  const regexAs = RegExp(href, 'g');

  const isActive = regexAs.test(asPath);

  return (
    <Link href={href} passHref>
      <ChakraLink
        textDecoration="none"
        color="iqaGreen"
        fontWeight={600}
        borderBottom="2px solid"
        borderColor={isActive ? 'white' : 'transparent'}
        _hover={{ borderColor: 'iqaGreen' }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default function Footer({ data }) {
  const disclaimer = get(data, 'disclaimer');
  const disclaimer_label = get(data, 'disclaimer_label');

  const menu1 = get(data, 'menu_1_links');
  const menu1_label = get(data, 'menu_1_label');
  const menu2 = get(data, 'menu_2_links');
  const menu2_label = get(data, 'menu_2_label');
  const menu3 = get(data, 'menu_3_links');
  const menu3_label = get(data, 'menu_3_label');

  return (
    <Box as="footer" bg="gray.800">
      <Grid
        gridTemplateColumns={{
          base: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr 1fr',
        }}
        gridTemplateAreas={{
          base: '"menu1 menu2 menu3" "logo disclaimer disclaimer"',
          lg: '"logo menu1 menu2 menu3 disclaimer"',
        }}
        gridGap={{ base: 4, lg: 9 }}
        maxWidth="1280px"
        m="0 auto"
        py={{ base: 2, md: 4 }}
        px={{ base: 4, sm: 8, md: 10 }}
      >
        <Image
          gridArea="logo"
          src={logo}
          priority={true}
          layout="responsive"
          alt="IQA Logo"
          height={200}
          width={200}
        />

        <Box gridArea="menu1">
          <Text as="h3" fontSize="lg" color="white">
            {menu1_label}
          </Text>

          <UnorderedList pl={0} ml={0} styleType="none">
            {menu1.map(({ link_label, link }) => (
              <Item key={`${link?.url}-${link_label}`}>
                <ActiveLink href={PrismicLink.url(link, linkResolver)}>
                  {link_label}
                </ActiveLink>
              </Item>
            ))}
          </UnorderedList>
        </Box>

        <Box gridArea="menu2">
          <Text as="h3" fontSize="lg" color="white">
            {menu2_label}
          </Text>

          <UnorderedList pl={0} ml={0} styleType="none">
            {menu2.map(({ link_label, link }) => (
              <Item key={`${link?.url}-${link_label}`}>
                <ActiveLink href={PrismicLink.url(link, linkResolver)}>
                  {link_label}
                </ActiveLink>
              </Item>
            ))}
          </UnorderedList>
        </Box>

        <Box gridArea="menu3">
          <Text as="h3" fontSize="lg" color="white">
            {menu3_label}
          </Text>
          <UnorderedList pl={0} ml={0} styleType="none">
            {menu3.map(({ link_label, link }) => (
              <Item key={`${link?.url}-${link_label}`}>
                <ActiveLink href={PrismicLink.url(link, linkResolver)}>
                  {link_label}
                </ActiveLink>
              </Item>
            ))}
          </UnorderedList>
        </Box>

        <Box gridArea="disclaimer">
          <Text as="h3" fontSize="lg" color="white">
            {disclaimer_label}
          </Text>
          <Text color="white" fontSize="sm">
            {disclaimer}
          </Text>
        </Box>
      </Grid>
    </Box>
  );
}
