import { useState, useEffect } from 'react';
import {
  Popover,
  Link as ChakraLink,
  ListItem,
  UnorderedList,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
} from 'components';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { Link as PrismicLink } from 'prismic-reactjs';
import { useRouter } from 'next/router';
import get from 'just-safe-get';
import { linkResolver } from 'modules/prismic';

const ActiveLink = ({ href, wrapperProps, children }) => {
  const { asPath } = useRouter();
  const regexAs = RegExp(href.replace(/\//g, '\\/'), 'g');

  const isActive = regexAs.test(asPath);

  return (
    <ListItem {...wrapperProps}>
      <Link href={href} passHref>
        <ChakraLink
          display="grid"
          gridTemplateColumns="1fr"
          pb={1}
          alignItems="center"
          textDecoration="none"
          color={isActive ? 'iqaGreen' : 'gray.800'}
          fontWeight={600}
          textTransform="uppercase"
          _hover={{ color: 'iqaGreen' }}
          fontSize="1rem"
        >
          {children}
        </ChakraLink>
      </Link>
    </ListItem>
  );
};

const MenuItem = ({ wrapperProps, data }) => {
  const link_label = get(data.primary, 'link_label');
  const link = get(data.primary, 'link');
  return (
    <ActiveLink
      href={PrismicLink.url(link, linkResolver)}
      wrapperProps={wrapperProps}
    >
      {link_label}
    </ActiveLink>
  );
};

const MenuList = ({ wrapperProps, data }) => {
  const { asPath } = useRouter();
  const [childActive, setChildActive] = useState(false);
  const label = get(data.primary, 'label');
  const items = get(data, 'items');

  useEffect(() => {
    const childrenActive = items?.map(({ link }) => {
      const regexAs = RegExp(PrismicLink.url(link, linkResolver), 'g');

      return regexAs.test(asPath);
    });

    setChildActive(childrenActive.some((v) => v));
  }, [setChildActive, items, PrismicLink, linkResolver]);

  return (
    <ListItem {...wrapperProps}>
      <Popover>
        <PopoverTrigger>
          <ChakraLink
            position="relative"
            fontWeight={600}
            color={childActive ? 'iqaGreen' : 'gray.800'}
            textTransform="uppercase"
            textDecoration="none"
            _hover={{ color: 'iqaGreen' }}
            fontSize="1rem"
            display="grid"
            gridTemplateColumns="1fr 10px"
            alignItems="center"
            gridGap={2}
            pb={1}
            _after={{
              content: '""',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid',
              borderTopColor: 'iqaGreen',
            }}
          >
            {label}
          </ChakraLink>
        </PopoverTrigger>
        <PopoverContent bg="iqaGreen" color="white">
          <PopoverArrow bg="iqaGreen" />
          <PopoverBody as="nav" py={4} px={2}>
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
                    <Link
                      href={PrismicLink.url(item?.link, linkResolver)}
                      passHref
                    >
                      <ChakraLink
                        target={isExternal ? '_blank' : '_self'}
                        display="grid"
                        gridTemplateColumns="1fr 10px"
                        p={2}
                        px={4}
                        alignItems="center"
                        textDecoration="none"
                        color="white"
                        fontWeight={600}
                        _hover={{ bg: 'green.600' }}
                        _active={{ bg: 'green.600' }}
                        borderRadius="md"
                        bg={isActive ? 'green.600' : 'transparent'}
                        fontSize="1rem"
                      >
                        {item?.link_label}
                        {isExternal && <ExternalLinkIcon />}
                      </ChakraLink>
                    </Link>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ListItem>
  );
};

const menuSlices = {
  menu_item: MenuItem,
  menu_list: MenuList,
};

export default function Navigation({ data }) {
  return (
    <UnorderedList
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="row"
      listStyleType="none"
    >
      {data?.map((slice, i) => {
        const Component = menuSlices[slice?.slice_type];

        return (
          <Component
            key={`menu-${slice?.slice_type}-${i}`}
            wrapperProps={{
              tabIndex: i + 1,
              ml: 8,
              _first: { ml: 0 },
            }}
            data={slice}
          />
        );
      })}
    </UnorderedList>
  );
}
