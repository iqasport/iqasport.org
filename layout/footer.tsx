import { useState, useEffect } from 'react';
import { Client } from 'modules/prismic';
import dynamic from 'next/dynamic';

import {
  Flex,
  Box,
  Grid,
  ListItem,
  Link as ChakraLink,
  UnorderedList,
  ListItemProps,
  HStack,
  LinkProps,
} from '@chakra-ui/react';
import FacebookIcon from 'public/images/facebook.svg';
import YoutubeIcon from 'public/images/youtube.svg';
import TwitterIcon from 'public/images/twitter.svg';
import InstagramIcon from 'public/images/instagram.svg';
import GithubIcon from 'public/images/github.svg';
import VercelLogo from 'public/images/powered-by-vercel.svg';

import { Link as PrismicLink } from 'prismic-reactjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { linkResolver } from 'modules/prismic';

const Image = dynamic(() => import('components/image'));
const Text = dynamic(() => import('components/text'));

const logo = '/images/logo_short_monochrome_white.png';

const IconWrapper = (props: LinkProps) => (
  <ChakraLink height="15px" width="15px" {...props} />
);

const Icon = (props) => <Box color="white" {...props} />;

const Item = (props: ListItemProps) => (
  <ListItem lineHeight="32px" {...props} />
);

const ActiveLink = ({ href, children }) => {
  const { asPath } = useRouter();
  const regexAs = RegExp(href, 'g');

  const isActive = regexAs.test(asPath);

  return (
    <Link href={href} passHref>
      <ChakraLink
        textDecoration="none"
        color={isActive ? 'white' : 'iqaGreen'}
        fontWeight={600}
        fontSize={{ base: 'xs', md: 'md' }}
        borderBottom="2px solid"
        borderColor={isActive ? 'white' : 'transparent'}
        _hover={{
          borderColor: isActive ? 'white' : 'iqaGreen',
        }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default function Footer({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const { locale } = useRouter();
  const [currentLang, setCurrentLang] = useState(locale);

  useEffect(() => {
    if (!data || locale !== currentLang) {
      const fetchData = async () => {
        const { data: footer } = await Client().getSingle('footer', {
          lang: locale,
        });
        setData(footer);
        setCurrentLang(locale);
      };
      fetchData();
    }
  }, [data, locale, currentLang]);

  return (
    <Box as="footer" bg="gray.800" px={{ base: 4, sm: 8, md: 10 }}>
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
      >
        <Image
          gridArea="logo"
          src={logo}
          layout="responsive"
          alt="IQA Logo"
          height={200}
          width={200}
        />

        <Box gridArea="menu1">
          <Text as="h3" fontSize="lg" color="white">
            {data?.menu_1_label}
          </Text>

          <UnorderedList pl={0} ml={0} styleType="none">
            {data?.menu_1_links.map(({ link_label, link }) => (
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
            {data?.menu_2_label}
          </Text>

          <UnorderedList pl={0} ml={0} styleType="none">
            {data?.menu_2_links.map(({ link_label, link }) => (
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
            {data?.menu_3_label}
          </Text>
          <UnorderedList pl={0} ml={0} styleType="none">
            {data?.menu_3_links.map(({ link_label, link }) => (
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
            {data?.disclaimer_label}
          </Text>
          <Text color="white" fontSize="sm">
            {data?.disclaimer}
          </Text>

          <ChakraLink
            color="gray.800"
            aria-label="Vercel"
            href="https://vercel.com/?utm_source=iqasport&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box as={VercelLogo} w={{ base: '40%', lg: '70%' }} />
          </ChakraLink>
        </Box>
      </Grid>

      <Grid
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
        borderTop="1px solid"
        borderColor="white"
        justifyContent="space-between"
        maxWidth="1280px"
        m="0 auto"
        pb={4}
      >
        <Flex
          flexDirection="row"
          justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          <Text fontSize="xs" color="white">
            All Rights Reserved &copy; {new Date().getFullYear()} International
            Quadball Association
          </Text>
        </Flex>

        <Flex
          justifyContent={{ base: 'center', md: 'flex-end' }}
          flexDirection="row"
        >
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
      </Grid>
    </Box>
  );
}
