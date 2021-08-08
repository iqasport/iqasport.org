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
    <>
      <Box bg="gray.100" height="200px" />
      <Box position="relative" bg="gray.100">
        <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="wavefooter" clipPathUnits="objectBoundingBox">
              <path
                d="M1,1 C0.82,0.28,0.605,-0.192,0.361,0.076 c-0.131,0.145,-0.252,0.483,-0.361,0.924"
                fill="#fff"
              />
            </clipPath>
          </defs>
        </svg>

        <Box
          width="100%"
          backgroundColor="iqaGreen"
          backgroundRepeat="no-repeat"
          backgroundSize="fixed"
          clipPath="url(#wavefooter)"
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
          bgSize="100%"
          height="calc(100vw * 0.04583705357)"
        />
      </Box>

      <Box
        as="footer"
        bgImage={`url(${backgroundImage})`}
        bgAttachment="fixed"
        bgSize="100%"
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
    </>
  );
}
