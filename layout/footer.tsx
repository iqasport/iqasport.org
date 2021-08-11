import {
  Box,
  Image,
  Text,
  Grid,
  ListItem,
  Link as ChakraLink,
  UnorderedList,
  ListItemProps,
} from 'components';
import { Link as PrismicLink } from 'prismic-reactjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { linkResolver } from 'modules/prismic';

const logo = '/images/logo_short_monochrome_white.png';

const Item = (props: ListItemProps) => (
  <ListItem lineHeight="32px" {...props} />
);

export type MenuLinksProps = {
  link_label: 'string';
  link: {
    url: 'string';
  };
};

export type FooterProps = {
  menu_1_label: string;
  menu_2_label: string;
  menu_3_label: string;
  menu_1_links: MenuLinksProps[];
  menu_2_links: MenuLinksProps[];
  menu_3_links: MenuLinksProps[];
  disclaimer_label: string;
  disclaimer: string;
};

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
        fontSize={{ base: 'xs', md: 'md' }}
        borderBottom="2px solid"
        borderColor={isActive ? 'white' : 'transparent'}
        _hover={{ borderColor: 'iqaGreen' }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default function Footer({ data }: { data: FooterProps }) {
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
        </Box>
      </Grid>
    </Box>
  );
}
