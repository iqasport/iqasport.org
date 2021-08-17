import get from 'just-safe-get';
import dynamic from 'next/dynamic';
import { Box, Flex, Heading } from 'components';
import { HERO_MIN_HEIGHTS } from 'styles/hero-heights';

const Image = dynamic(() => import('components/image'));

const Hero = (rawData) => {
  const title = get(rawData, 'primary.slug');
  const image = get(rawData, 'primary.image');

  return (
    <Box
      bg="gray.100"
      as="section"
      position="relative"
      backgroundSize="cover"
      overflow="hidden"
      px={0}
      minHeight={HERO_MIN_HEIGHTS}
    >
      <Image
        src={image.url}
        alt={image.alt}
        layout="fill"
        objectPosition="center center"
        objectFit="cover"
        borderRadius={0}
        clipPath="ellipse(100% 51% at 46% 43%)"
      />
      <Flex
        position="absolute"
        minHeight={HERO_MIN_HEIGHTS}
        bgGradient="linear(to-tl, blue.500, green.200)"
        opacity={0.3}
        width="100%"
        sx={{ mixBlendMode: 'hard-light' }}
        clipPath="ellipse(100% 51% at 46% 43%)"
      />
      <Flex
        position="relative"
        minHeight={HERO_MIN_HEIGHTS}
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, sm: 8, md: 9 }}
      >
        <Heading
          as="h1"
          fontSize={{ base: '4xl', md: '8xl' }}
          color="white"
          textShadow="0 0 40px rgba(0,0,0,0.4)"
          textAlign="left"
          textTransform="uppercase"
        >
          {title}
        </Heading>
      </Flex>
    </Box>
  );
};
export default Hero;
