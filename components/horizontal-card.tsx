import { RichText } from 'prismic-reactjs';
import {
  Heading,
  Box,
  useStyleConfig,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { linkResolver } from 'modules/prismic';
import { CardTypes, ContentBox } from 'components/card';
import Image from 'components/image';

export const HorizontalCardStyles = {
  baseStyle: {
    borderRadius: '2xl',
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '2fr 1fr' },
    gridGap: 4,
    gridTemplateAreas: { base: "'image' 'content'", md: "'image content'" },
    overflow: 'hidden',
    alignItems: 'center',
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

interface HorizontalCardTypes extends CardTypes {
  isImageLeft?: boolean;
}

const HorizontalCard = ({
  image,
  title,
  content,
  variant,
  href,
  target,
  ariaLabel,
  isImageLeft = false,
  ...cardProps
}: HorizontalCardTypes): React.ReactElement => {
  const styles = useStyleConfig('HorizontalCard', { variant });
  const gridAreas = isImageLeft
    ? {}
    : {
        gridTemplateAreas: image?.src
          ? { base: "'image' 'content'", md: "'content image'" }
          : { base: "'content'", md: "'content content'" },
        gridTemplateColumns: { base: '1fr', md: '1fr 2fr' },
      };

  const clipPath = isImageLeft
    ? 'ellipse(54% 99% at 45% 45%)'
    : 'ellipse(54% 99% at 55% 45%)';

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
        <Box __css={styles} as="article" {...gridAreas} {...cardProps}>
          <Box
            position="relative"
            bg="grey.100"
            minHeight={image?.src ? '300px' : 'initial'}
            display={image?.src ? 'block' : 'none'}
            height="100%"
            width="100%"
            overflow="hidden"
            gridArea="image"
          >
            {image?.src && (
              <Image
                layout="fill"
                height={image?.height}
                width={image?.width}
                alt={image?.alt}
                src={image?.src}
                borderRadius={0}
                clipPath={{ base: 'none', md: clipPath }}
              />
            )}
          </Box>
          <ContentBox
            py={5}
            px={4}
            gridArea="content"
            minHeight={image?.src ? 'initial' : '300px'}
          >
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
    <Box __css={styles} as="article" {...gridAreas} {...cardProps}>
      <Box
        bg="grey.100"
        minHeight={image?.src ? '300px' : 'initial'}
        display={image?.src ? 'block' : 'none'}
        height="100%"
        width="100%"
        overflow="hidden"
        position="relative"
        gridArea="image"
      >
        {image?.src && (
          <Image
            layout="fill"
            height={image?.height}
            width={image?.width}
            alt={image?.alt}
            src={image?.src}
            borderRadius={0}
            clipPath={{ base: 'none', md: clipPath }}
          />
        )}
      </Box>
      <ContentBox
        py={5}
        px={4}
        gridArea="content"
        minHeight={image?.src ? 'initial' : '300px'}
      >
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

export default HorizontalCard;
