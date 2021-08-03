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
import Link from 'next/link';
import { useRouter } from 'next/router';
const backgroundImage = '/images/bg.png';
const logo = '/images/logo_short_monochrome_white.png';

const Item = (props) => <ListItem lineHeight="32px" {...props} />;

const ActiveLink = ({ href, children }) => {
  const { asPath } = useRouter();
  const regexAs = RegExp(href.replace(/\//g, '\\/'), 'g');

  const isActive = regexAs.test(asPath);

  return (
    <Link href={href} passHref>
      <ChakraLink
        textDecoration="none"
        color="white"
        fontWeight={isActive ? 600 : 'normal'}
        _hover={{ borderBottom: '2px solid', borderColor: 'white' }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

// const ExternalLink = (props) => (
//   <ChakraLink
//     color="white"
//     textDecoration="none"
//     _hover={{ borderBottom: '2px solid', borderColor: 'white' }}
//     {...props}
//   />
// );

export default function Footer() {
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

      <Box as="footer" zIndex="1" marginTop="-1px">
        <Flex
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
          bgSize="100%"
          px={{ base: 4, sm: 8, md: 10 }}
          justifyContent="center"
        >
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
              <Item>
                <ActiveLink href="/">Privacy Policy</ActiveLink>
              </Item>
              <Item>
                <ActiveLink href="/">Contact Us</ActiveLink>
              </Item>
              <Item>
                <ActiveLink href="/">Press</ActiveLink>
              </Item>
            </UnorderedList>

            <UnorderedList pl={0} ml={0} styleType="none">
              <Item>
                <ActiveLink href="/">News</ActiveLink>
              </Item>
              <Item>
                <ActiveLink href="/">Rulebook</ActiveLink>
              </Item>
              <Item>
                <ActiveLink href="/">Video</ActiveLink>
              </Item>
            </UnorderedList>

            <Text color="white" fontSize="sm">
              IQA and its activities are not licensed by, sponsored by or
              associated with Warner Bros., J.K. Rowling or their affiliates.
              &apos;Quidditch&apos;, &apos;Harry Potter&apos;, and all related
              names, characters and indicia are trademarks of and © Warner Bros.
              - Harry Potter publishing rights © J.K. Rowling
            </Text>
          </Grid>
        </Flex>
      </Box>
    </>
  );
}
