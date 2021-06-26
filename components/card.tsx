import { RichText } from 'prismic-reactjs';
import {
  Heading,
  Box,
  useStyleConfig,
  Link as ChakraLink,
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
  <Box
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

export type CardTypes = {
  image?: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  title: string;
  content: React.ReactNode;
  variant?: string;
  href?: string;
  target?: string;
  ariaLabel?: string;
};

const Card = ({
  image,
  title,
  content,
  variant,
  href,
  target,
  ariaLabel,
  ...cardProps
}: CardTypes): React.ReactElement => {
  const styles = useStyleConfig('Card', { variant });

  if (href) {
    return (
      <ChakraLink
        cursor="pointer"
        boxShadow="md"
        transition="all 0.2s ease"
        _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
        _focus={{ transform: 'scale(1.0.3)', boxShadow: 'lg' }}
        _active={{ transform: 'scale(1)' }}
        borderRadius="2xl"
        href={href}
        target={target}
        aria-label={ariaLabel}
      >
        <Box __css={styles} as="article" {...cardProps}>
          <Box
            position="relative"
            bg="iqaGreen"
            height={{ base: '100%', md: 'auto' }}
            width={{ base: '100%', md: 'auto' }}
            overflow="hidden"
          >
            {image.src && (
              <Image
                src={image.src}
                alt={image.alt}
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
            {content && (
              <RichText render={content} linkResolver={linkResolver} />
            )}
          </ContentBox>
        </Box>
      </ChakraLink>
    );
  }
  return (
    <Box __css={styles} as="article" {...cardProps}>
      <Box
        bg="iqaGreen"
        height={{ base: '100%', md: 'auto' }}
        width={{ base: '100%', md: 'auto' }}
        overflow="hidden"
      >
        {image.src && (
          <Image
            src={image.src}
            alt={image.alt}
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
      </ContentBox>
    </Box>
  );
};

export default Card;
