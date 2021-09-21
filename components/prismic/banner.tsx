import { RichText, RichTextBlock } from 'prismic-reactjs';
import dynamic from 'next/dynamic';
import { Box, Flex, Heading, Button } from 'components';
import { BANNER_MIN_HEIGHTS } from 'styles/hero-heights';
import { linkResolver } from 'modules/prismic';

const Image = dynamic(() => import('components/image'));

type BannerProps = {
  primary: {
    content?: RichTextBlock[];
    title?: string;
    image?: {
      url?: string;
      alt?: string;
    };
    cta_text?: string;
    cta_url?: string;
  };
};

const Banner = (rawData: BannerProps) => {
  const {
    primary: { content, title, image, cta_text, cta_url },
  } = rawData;

  return (
    <Box data-type="banner" as="section" px={0} py={4}>
      <Box
        minHeight={BANNER_MIN_HEIGHTS}
        position="relative"
        backgroundSize="cover"
        overflow="hidden"
        bg="white"
      >
        <Image
          src={image.url}
          alt={image.alt}
          layout="fill"
          objectPosition="center center"
          objectFit="cover"
          borderRadius={0}
          sx={{ filter: 'grayscale(100%)' }}
        />
        <Flex
          position="absolute"
          minHeight={BANNER_MIN_HEIGHTS}
          bg="green.700"
          opacity={0.85}
          boxShadow="inset 0px 0px 100px rgba(0, 0, 0, 0.5)"
          width="100%"
          h="100%"
        />
        <Flex
          position="relative"
          minHeight={BANNER_MIN_HEIGHTS}
          alignItems="center"
          justifyContent="center"
          direction="column"
          px={{ base: 4, sm: 8, md: 9 }}
          py={{ base: 4, sm: 8, md: 9 }}
          maxWidth="768px"
          margin="0 auto"
          color="white"
        >
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '6xl' }}
            color="white"
            textShadow="lg"
            textAlign="left"
            textTransform="uppercase"
            mb={1}
            mt={0}
          >
            {title}
          </Heading>

          {content && RichText.asText(content) && (
            <RichText render={content} linkResolver={linkResolver} />
          )}

          {cta_text && cta_url && (
            <Flex justifyContent="center">
              <Button type="button" href={cta_url} aria-label={title}>
                {cta_text}
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Banner;
