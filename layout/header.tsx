import { useState, useEffect } from 'react';
import { Link as PrismicLink } from 'prismic-reactjs';
import { linkResolver } from 'modules/prismic';
import { useRouter } from 'next/router';
import { Client } from 'modules/prismic';

import {
  Flex,
  HStack,
  useBreakpointValue,
  Box,
  Link as ChakraLink,
  LinkProps,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from 'components';
import Image from 'next/image';
import { HamburgerIcon } from '@chakra-ui/icons';
import DesktopNavigation from 'layout/navigation';
import Headroom from 'react-headroom';
import Link from 'next/link';

import LanguageSwitcher from 'components/language-switcher';
import FacebookIcon from 'public/images/facebook.svg';
import YoutubeIcon from 'public/images/youtube.svg';
import TwitterIcon from 'public/images/twitter.svg';
import InstagramIcon from 'public/images/instagram.svg';
import GithubIcon from 'public/images/github.svg';

import MobileNavigation from './mobile-navigation';

const IconWrapper = (props: LinkProps) => (
  <ChakraLink height="15px" width="15px" {...props} />
);

const Icon = (props) => <Box color="gray.800" {...props} />;

export type SliceProps = {
  slice_type: 'string';
  primary:
    | {
        link_label: 'string';
        link: 'object';
      }
    | {
        label: 'string';
        items: {
          link_label: 'string';
          link: {
            link_type: 'string';
          };
        }[];
      };
};

export default function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const logoHeight = useBreakpointValue({ base: 40, xl: 50 }) || 40;
  const logoTextHeight = useBreakpointValue({ base: 40, xl: 50 }) || 40;
  const logoTextWidth = useBreakpointValue({ base: 100, xl: 120 }) || 100;
  const [data, setData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        const { data: header } = await Client().getSingle('header', {
          lang: locale,
        });
        setData(header);
      };
      fetchData();
    }
  }, [data, Client]);

  return (
    <>
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
            display={{ base: 'none', lg: 'flex' }}
          >
            <HStack spacing={2}>
              {data?.top_level_navigation?.map(({ link_label, link }) => (
                <Link
                  key={link_label}
                  href={PrismicLink.url(link, linkResolver)}
                  passHref
                >
                  <ChakraLink
                    color="gray.800"
                    pr={2}
                    borderRight="1px solid"
                    borderColor="gray.800"
                    _last={{ borderRight: 'none' }}
                    fontWeight={600}
                  >
                    {link_label}
                  </ChakraLink>
                </Link>
              ))}
            </HStack>

            <LanguageSwitcher ml="auto" size="xs" />

            <HStack spacing={5}>
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

              <IconWrapper
                aria-label="Follow us on Github"
                href="https://github.com/iqasport/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={GithubIcon} />
              </IconWrapper>
            </HStack>
          </Flex>

          <Flex
            alignItems="center"
            as="nav"
            h="70px"
            bg="white"
            boxShadow="md"
            px={3}
            aria-label="Main Navigation"
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

            <DesktopNavigation data={data?.body} />

            <IconButton
              ml="auto"
              aria-label="Menu"
              bg="white"
              _hover={{
                bg: 'white',
                color: 'iqaGreen',
              }}
              p={0}
              icon={<HamburgerIcon w={8} h={8} />}
              onClick={onOpen}
            />
          </Flex>
        </Box>
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
        <DrawerOverlay />
        <DrawerContent bg="white" px={5} pt={3} overflowY="auto">
          <MobileNavigation
            onClose={onClose}
            data={data?.body}
            top_level_navigation={data?.top_level_navigation}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
