import { RichText } from 'prismic-reactjs';
import { Heading, Box, useStyleConfig } from '@chakra-ui/react';
import Text from 'components/text';
import { linkResolver } from 'modules/prismic';
import {
  CardTypes,
  ContentBox,
  LinkWrapper,
  PlainWrapper,
} from 'components/card';
import Image from 'components/image';
import { useRouter } from 'next/router';
import formatLocale from 'modules/dates';

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
      color: 'gray.800',
    },
    primary: {
      bg: 'gray.50',
      color: 'gray.800',
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
  date,
  ...cardProps
}: HorizontalCardTypes): React.ReactElement => {
  const { locale } = useRouter();
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

  const Wrapper = href ? LinkWrapper : PlainWrapper;

  return (
    <Wrapper
      href={href}
      target={target}
      aria-label={ariaLabel}
      display="initial"
      {...cardProps}
    >
      <Box __css={styles} as="article" {...gridAreas}>
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
          {content && <RichText render={content} linkResolver={linkResolver} />}
          {date && (
            <Text fontSize="xs" marginTop="auto">
              {formatLocale({
                date: new Date(date),
                locale,
              })}
            </Text>
          )}
        </ContentBox>
      </Box>
    </Wrapper>
  );
};

export default HorizontalCard;
