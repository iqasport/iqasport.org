import { RichText } from 'prismic-reactjs';
import format from 'date-fns/format';
import {
  Heading,
  Box,
  Flex,
  useStyleConfig,
  Link as ChakraLink,
  Text,
  GridItemProps,
  GridItem,
} from '@chakra-ui/react';
import { linkResolver } from 'modules/prismic';
import Image from 'components/image';

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
      color: 'black',
    },
    primary: {
      bg: 'iqaGreen',
      color: 'black',
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
  title?: string;
  content?: React.ReactNode;
  variant?: string;
  href?: string;
  target?: string;
  ariaLabel?: string;
  date?: string;
}

export const LinkWrapper = (props) => (
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
);

export const PlainWrapper = (props) => <GridItem {...props} />;

const Card = ({
  image,
  title,
  content,
  variant,
  href,
  target,
  ariaLabel,
  date,
  ...cardProps
}: CardTypes): React.ReactElement => {
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
        <ContentBox py={5} px={4}>
          {title && (
            <Heading as="h2" fontSize="xl">
              {title}
            </Heading>
          )}
          {content && <RichText render={content} linkResolver={linkResolver} />}
          {date && (
            <Text fontSize="xs" marginTop="auto">
              {format(new Date(date), 'd MMMM, yyyy')}
            </Text>
          )}
        </ContentBox>
      </Box>
    </Wrapper>
  );
};

export default Card;
