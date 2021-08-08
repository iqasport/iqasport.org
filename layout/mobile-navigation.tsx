import { Link as PrismicLink } from 'prismic-reactjs';
import { linkResolver } from 'modules/prismic';
import get from 'just-safe-get';
import {
  Flex,
  ListItem,
  HStack,
  UnorderedList,
  Box,
  Link as ChakraLink,
  LinkProps,
  IconButton,
  Text,
} from 'components';
import { CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import Link from 'next/link';
import { useRouter } from 'next/router';

import LanguageSwitcher from 'components/language-switcher';
import FacebookIcon from 'public/images/facebook.svg';
import YoutubeIcon from 'public/images/youtube.svg';
import TwitterIcon from 'public/images/twitter.svg';
import InstagramIcon from 'public/images/instagram.svg';

const IconWrapper = (props: LinkProps) => (
  <ChakraLink height="20px" width="20px" {...props} />
);

const Icon = (props) => (
  <Box color="gray.800" _hover={{ color: 'iqaGreen' }} {...props} />
);

const ActiveLink = ({ href, wrapperProps, onClick, children }) => {
  const { asPath } = useRouter();
  const regexAs = RegExp(href.replace(/\//g, '\\/'), 'g');

  const isActive = regexAs.test(asPath);

  return (
    <ListItem {...wrapperProps}>
      <Link href={href} passHref>
        <ChakraLink
          pb={1}
          alignItems="center"
          textDecoration="none"
          color="iqaGreen"
          borderBottom="2px solid"
          borderColor={isActive ? 'iqaGreen' : 'transparent'}
          fontWeight={600}
          textTransform="uppercase"
          _hover={{ borderColor: 'iqaGreen' }}
          fontSize="1rem"
          onClick={onClick}
        >
          {children}
        </ChakraLink>
      </Link>
    </ListItem>
  );
};

const MenuItem = ({ wrapperProps, data, onClose }) => {
  const link_label = get(data.primary, 'link_label');
  const link = get(data.primary, 'link');
  return (
    <ActiveLink
      href={PrismicLink.url(link, linkResolver)}
      wrapperProps={wrapperProps}
      onClick={onClose}
    >
      {link_label}
    </ActiveLink>
  );
};

const MenuList = ({ wrapperProps, data, onClose }) => {
  const label = get(data.primary, 'label');
  const items = get(data, 'items');

  return (
    <ListItem {...wrapperProps}>
      <Text
        fontWeight={600}
        color="gray.800"
        textTransform="uppercase"
        fontSize="1rem"
        display="grid"
        gridTemplateColumns="1fr 10px"
        alignItems="center"
        gridGap={2}
        pb={1}
      >
        {label}
      </Text>

      <UnorderedList listStyleType="none" pl={0} ml={0} spacing={3}>
        {items.map((item, i) => {
          const { asPath } = useRouter();

          const regexAs = RegExp(
            PrismicLink.url(item?.link, linkResolver),
            'g'
          );

          const isActive = regexAs.test(asPath);
          const isExternal = item?.link?.link_type === 'Web';

          return (
            <ListItem key={item?.link_label} tabIndex={i + 1}>
              <Link href={PrismicLink.url(item?.link, linkResolver)} passHref>
                <ChakraLink
                  target={isExternal ? '_blank' : '_self'}
                  alignItems="center"
                  textDecoration="none"
                  color="iqaGreen"
                  borderBottom="2px solid"
                  borderColor={isActive ? 'iqaGreen' : 'transparent'}
                  fontWeight={600}
                  _hover={{ borderColor: 'iqaGreen' }}
                  _active={{ borderColor: 'iqaGreen' }}
                  fontSize="1rem"
                  onClick={onClose}
                >
                  {item?.link_label}
                  {isExternal && <ExternalLinkIcon ml={2} />}
                </ChakraLink>
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>
    </ListItem>
  );
};

const menuSlices = {
  menu_item: MenuItem,
  menu_list: MenuList,
};

export default function MobileNavigation({
  onClose,
  top_level_navigation,
  data,
}) {
  const { push } = useRouter();
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" h="70px">
        <LanguageSwitcher
          size="md"
          onChange={(e) => {
            push('/', null, { locale: e.target.value });
            onClose();
          }}
        />
        <IconButton
          aria-label="Close"
          bg="white"
          _hover={{
            bg: 'white',
            color: 'iqaGreen',
          }}
          p={0}
          icon={<CloseIcon w={4} h={4} />}
          onClick={onClose}
        />
      </Flex>

      <UnorderedList listStyleType="none" ml={0} pl={0}>
        {data?.map((slice, i) => {
          const Component = menuSlices[slice?.slice_type];

          return (
            <Component
              key={`menu-${slice?.slice_type}-${i}`}
              onClose={onClose}
              wrapperProps={{
                tabIndex: i + 1,
                mt: 8,
                _first: { mt: 0 },
              }}
              data={slice}
            />
          );
        })}
      </UnorderedList>

      <Text
        fontWeight={600}
        color="gray.800"
        textTransform="uppercase"
        fontSize="1rem"
        alignItems="center"
        pb={1}
      >
        Quick Links
      </Text>

      <UnorderedList listStyleType="none" p={0} ml={0} mt={0} spacing={3}>
        {top_level_navigation?.map(({ link_label, link }, i) => {
          const { asPath } = useRouter();

          const regexAs = RegExp(PrismicLink.url(link, linkResolver), 'g');

          const isActive = regexAs.test(asPath);
          const isExternal = link?.link_type === 'Web';
          return (
            <ListItem key={link_label} tabIndex={i + 1}>
              <Link href={PrismicLink.url(link, linkResolver)} passHref>
                <ChakraLink
                  target={isExternal ? '_blank' : '_self'}
                  alignItems="center"
                  textDecoration="none"
                  color="iqaGreen"
                  borderBottom="2px solid"
                  borderColor={isActive ? 'iqaGreen' : 'transparent'}
                  fontWeight={600}
                  _hover={{ borderColor: 'iqaGreen' }}
                  _active={{ borderColor: 'iqaGreen' }}
                  fontSize="1rem"
                  onClick={onClose}
                >
                  {link_label}
                  {isExternal && <ExternalLinkIcon ml={2} />}
                </ChakraLink>
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>

      <Text
        fontWeight={600}
        color="gray.800"
        textTransform="uppercase"
        fontSize="1rem"
        alignItems="center"
      >
        Social
      </Text>

      <HStack spacing={2} mt={1} mb={2}>
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
    </>
  );
}
