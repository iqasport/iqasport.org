import {
  Flex,
  Image,
  HStack,
  useBreakpointValue,
  Box,
  Link as ChakraLink,
  LinkProps,
} from 'components';
import Headroom from 'react-headroom';
import Link from 'next/link';

import LanguageSwitcher from 'components/language-switcher';
import FacebookIcon from 'public/images/facebook.svg';
import YoutubeIcon from 'public/images/youtube.svg';
import TwitterIcon from 'public/images/twitter.svg';
import InstagramIcon from 'public/images/instagram.svg';

const IconWrapper = (props: LinkProps) => (
  <ChakraLink height="15px" width="15px" {...props} />
);

const Icon = (props) => <Box color="white" {...props} />;

export default function Header({ page /* lang */ }) {
  const logoHeight = useBreakpointValue({ base: 40, xl: 50 }) || 40;
  const logoTextHeight = useBreakpointValue({ base: 40, xl: 50 }) || 40;
  const logoTextWidth = useBreakpointValue({ base: 100, xl: 120 }) || 100;

  return (
    <Box as={Headroom} zIndex={100}>
      <Box as="header">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          as="nav"
          h="35px"
          bg="iqaGreen"
          px={6}
          fontSize="sm"
        >
          <HStack spacing={2}>
            <Link href="/news" passHref>
              <ChakraLink color="white">COVID-19 Guidance</ChakraLink>
            </Link>
          </HStack>
          <HStack spacing={2}>
            <IconWrapper
              aria-label="Like us on Facebook"
              href="https://www.facebook.com/InternationalQuidditchAssociation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={FacebookIcon} />
            </IconWrapper>

            <IconWrapper
              aria-label="Follow us on Twitter"
              href="https://twitter.com/IQASport"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={TwitterIcon} />
            </IconWrapper>

            <IconWrapper
              aria-label="Follow us on Instagram"
              href="https://www.instagram.com/iqasport/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={InstagramIcon} />
            </IconWrapper>

            <IconWrapper
              aria-label="Subscribe to our Youtube Channel"
              href="https://www.youtube.com/InternationalQuidditchAssociation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={YoutubeIcon} />
            </IconWrapper>
          </HStack>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          as="nav"
          h="70px"
          bg="white"
          boxShadow="md"
          px={3}
        >
          <Link href="/" passHref>
            <ChakraLink>
              <HStack spacing={2}>
                <Image
                  src="/images/logo.png"
                  alt="International Quidditch Association"
                  priority={true}
                  layout="fixed"
                  height={logoHeight}
                  width={logoHeight}
                  borderRadius="0"
                />
                <Image
                  src="/images/logo-text.png"
                  alt="International Quidditch Association"
                  priority={true}
                  layout="fixed"
                  height={logoTextHeight}
                  width={logoTextWidth}
                  borderRadius="0"
                />
              </HStack>
            </ChakraLink>
          </Link>

          <LanguageSwitcher altLangs={page?.alternate_languages} />
        </Flex>
      </Box>
    </Box>
  );
}
