import { RichText } from 'prismic-reactjs';
import {
  Heading,
  Box,
  Flex,
  useStyleConfig,
  Link as ChakraLink,
  GridItemProps,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import { linkResolver } from 'modules/prismic';
import Image from 'components/image';
import Text from 'components/text';
import Link from 'next/link';
import { useRouter } from 'next/router';
import formatLocale from 'modules/dates';

export const CardStyles = {
  baseStyle: {
    borderRadius: '2xl',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    overflow: 'hidden',
  },
  variants: {
    white: {
      bg: 'gray.50',
      color: 'gray.800',
    },
    primary: {
      bg: 'white',
      color: 'gray.800',
    },
  },
  defaultProps: {
    variant: 'primary',
  },
};

export const cardVariants = {
  white: 'primary',
  primary: 'white',
};

export const ContentBox = (props) => (
  <Flex
    flexDirection="column"
    flexGrow={1}
    textDecoration="none"
    _hover={{ textDecoration: 'none' }}
    sx={{
      a: {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
        },
      },
    }}
    {...props}
  />
);

export interface CardTypes extends GridItemProps {
  image?: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  logo?: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  title?: string;
  content?: React.ReactNode;
  variant?: string;
  href?: string;
  target?: string;
  ariaLabel?: string;
  date?: string;
}

export const LinkWrapper = ({ href, ...props }) => (
  <Link href={href} passHref>
    <GridItem
      as={ChakraLink}
      cursor="pointer"
      boxShadow="md"
      transition="all 0.2s ease"
      _hover={{
        transform: 'scale(1.03)',
        boxShadow: 'lg',
        textDecoration: 'none',
      }}
      _focus={{
        transform: 'scale(1.0.3)',
        boxShadow: 'lg',
        textDecoration: 'none',
        ringWidth: '2px',
        ringColor: 'iqaGreen',
      }}
      _active={{ transform: 'scale(1)' }}
      borderRadius="2xl"
      flexGrow={1}
      display="flex"
      {...props}
    />
  </Link>
);

export const PlainWrapper = (props) => (
  <GridItem display="flex" flexGrow={1} {...props} />
);

const Card = ({
  image,
  title,
  content,
  variant,
  href,
  target,
  ariaLabel,
  date,
  logo,
  ...cardProps
}: CardTypes): React.ReactElement => {
  const { locale } = useRouter();
  const styles = useStyleConfig('Card', { variant });

  const Wrapper = href ? LinkWrapper : PlainWrapper;

  return (
    <Wrapper href={href} target={target} aria-label={ariaLabel} {...cardProps}>
      <Box __css={styles} as="article">
        <Box
          position="relative"
          bg="iqaGreen"
          height={{ base: '100%', md: 'auto' }}
          width={{ base: '100%', md: 'auto' }}
          overflow="hidden"
        >
          {image?.src && (
            <Image
              src={image?.src}
              alt={image?.alt}
              borderRadius="0"
              layout="responsive"
              objectFit="cover"
              width={640}
              height={360}
            />
          )}
        </Box>
        <ContentBox
          py={5}
          px={4}
          sx={{
            '& a': {
              fontWeight: 'bold',
              color: 'iqaGreen',
              textDecoration: 'none',
              _hover: {
                textDecoration: 'underline',
              },
            },
          }}
        >
          <Grid
            gridTemplateColumns={logo ? '3fr 1fr' : '1fr'}
            alignItems="center"
            justifyContent="space-between"
            justifyItems="flex-start"
          >
            <Box>
              {title && (
                <Heading as="h2" fontSize="xl" fontFamily="body">
                  {title}
                </Heading>
              )}
              {content && Array.isArray(content) && (
                <RichText render={content} linkResolver={linkResolver} />
              )}
              {content && !Array.isArray(content) && <>{content}</>}
              {date && (
                <Text fontSize="xs" marginTop="auto">
                  {formatLocale({ date: new Date(date), locale })}
                </Text>
              )}
            </Box>
            {logo && (
              <Image
                src={logo?.src}
                alt={logo?.alt}
                borderRadius="0"
                layout="fixed"
                objectFit="cover"
                justifySelf="end"
                width={75}
                height={75}
              />
            )}
          </Grid>
        </ContentBox>
      </Box>
    </Wrapper>
  );
};

export default Card;
