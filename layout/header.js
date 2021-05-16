import {
  Flex,
  Image,
  HStack,
  useBreakpointValue,
  Link as ChakraLink,
} from 'components';
import Link from 'next/link';
import LanguageSwitcher from 'components/language-switcher';

export default function Header({ page /* lang */ }) {
  const logoHeight = useBreakpointValue({ base: 40, xl: 75 }) || 40;
  const logoTextHeight = useBreakpointValue({ base: 40, xl: 70 }) || 40;
  const logoTextWidth = useBreakpointValue({ base: 100, xl: 160 }) || 100;
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      as="header"
      h="100px"
      bg="white"
      position="sticky"
      top="0"
      boxShadow="md"
      zIndex={10}
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
            />
            <Image
              src="/images/logo-text.png"
              alt="International Quidditch Association"
              priority={true}
              layout="fixed"
              height={logoTextHeight}
              width={logoTextWidth}
            />
          </HStack>
        </ChakraLink>
      </Link>

      <LanguageSwitcher altLangs={page?.alternate_languages} />
    </Flex>
  );
}
