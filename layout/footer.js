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

const backgroundImage = '/images/bg.png';
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
        color="white"
        fontWeight={600}
        borderBottom="2px solid"
        borderColor={isActive ? 'white' : 'transparent'}
        _hover={{ borderColor: 'white' }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default function Footer({ data }) {
  const disclaimer = get(data, 'disclaimer');
  const menu1 = get(data, 'menu_1_links');
  const menu2 = get(data, 'menu_2_links');

  return (
    <Box
      as="footer"
      bgImage={`url(${backgroundImage})`}
      bgAttachment="fixed"
      bgSize="100%"
      boxShadow="inset 0px 11px 40px 5px rgba(0,0,0,0.2)"
    >
      <Flex px={{ base: 4, sm: 8, md: 10 }} justifyContent="center">
        <Grid
          gridTemplateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}
          alignItems="center"
          gridGap={{ base: 4, lg: 9 }}
          maxWidth="1280px"
        >
          <Image
            src={logo}
            priority={true}
            layout="fixed"
            alt="IQA Logo"
            height={200}
            width={200}
          />

          <UnorderedList pl={0} ml={0} styleType="none">
            {menu1.map(({ link_label, link }) => (
              <Item key={`${link?.url}-${link_label}`}>
                <ActiveLink href={PrismicLink.url(link, linkResolver)}>
                  {link_label}
                </ActiveLink>
              </Item>
            ))}
          </UnorderedList>

          <UnorderedList pl={0} ml={0} styleType="none">
            {menu2.map(({ link_label, link }) => (
              <Item key={`${link?.url}-${link_label}`}>
                <ActiveLink href={PrismicLink.url(link, linkResolver)}>
                  {link_label}
                </ActiveLink>
              </Item>
            ))}
          </UnorderedList>

          <Text color="white" fontSize="sm">
            {disclaimer}
          </Text>
        </Grid>
      </Flex>
    </Box>
  );
}
