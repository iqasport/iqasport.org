import { RichText } from 'prismic-reactjs';
import Flickity from 'react-flickity-component';
import get from 'just-safe-get';
import dynamic from 'next/dynamic';

import { Box, Heading, Flex } from '@chakra-ui/react';
import { linkResolver } from 'modules/prismic';

const Slice = dynamic(() => import('components/slice'));
const Text = dynamic(() => import('components/text'));
const Image = dynamic(() => import('components/image'));

const CarouselContainer = (props) => (
  <Box
    position="relative"
    w="100%"
    overflow="hidden"
    {...props}
    sx={{
      '.flickity-prev-next-button': {
        position: 'absolute',
        top: '40%',
        background: 'white',
        opacity: '0.8',
        fill: 'gray.800',
        width: { base: '30px', md: '50px' },
        height: { base: '30px', md: '50px' },
        borderRadius: 'full',
        p: { base: 1, md: 3 },
        border: '0',
        cursor: 'pointer',
      },

      '.previous': {
        left: '0',
        ml: { base: 4, md: 8 },
      },

      '.next': {
        right: '0',
        mr: { base: 4, md: 8 },
      },

      img: {
        opacity: 0.2,
        transition: 'opacity 0.2s ease',
        cursor: 'grab',
      },

      'div[data-carousel="caption"]': {
        opacity: 0,
        transition: 'opacity 0.2s ease',
      },

      'div.is-selected img': {
        opacity: 1,
        transition: 'opacity 0.2s ease',
      },

      'div.is-selected div[data-carousel="caption"]': {
        opacity: 1,
        transition: 'opacity 0.2s ease',
      },
    }}
  />
);

const Carousel = (rawData) => {
  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const items = get(rawData, 'items');

  return (
    <Slice size="full" variant={variant}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          mt={2}
          textAlign="center"
          fontFamily="body"
          fontWeight="bold"
        >
          {RichText.asText(title)}
        </Heading>
      )}

      <Box maxWidth="768px" px={{ base: 4, sm: 8, md: 10 }} m="0 auto">
        {RichText.asText(content) && (
          <RichText render={content} linkResolver={linkResolver} />
        )}
      </Box>

      <CarouselContainer>
        <Flickity
          options={{
            wrapAround: true,
            pageDots: false,
            initialIndex: 2,
          }}
        >
          {items.map((item, i) => (
            <Box
              width={{ base: '100%', md: '66%' }}
              key={`carousel-image-${item?.image.url}-${i}`}
              mx={{ base: 0, md: 4 }}
              position="relative"
              pb={{ base: '56.25%', md: '40%' }}
            >
              <Image
                layout="fill"
                src={item?.image?.url}
                alt={item?.image?.alt}
                objectFit="cover"
                borderRadius={{ base: 0, md: '2xl' }}
              />
              <Flex
                flexDirection="column"
                justifyContent="flex-end"
                data-carousel="caption"
                p={2}
                mt={0}
                position="absolute"
                bottom="0"
                width="100%"
                height="150px"
                borderRadius={{ base: 0, md: '2xl' }}
                bgGradient="linear(to-t, rgba(0,0,0,1), rgba(0,0,0,0))"
                zIndex="2"
              >
                <Text as="em" fontStyle="italic" fontSize="sm" color="white">
                  {item.support && (
                    <>
                      {item.support}
                      <br />
                    </>
                  )}

                  {item?.image?.copyright && (
                    <>
                      Photo Credit: <strong>{item?.image?.copyright}</strong>
                    </>
                  )}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flickity>
      </CarouselContainer>
    </Slice>
  );
};

export default Carousel;
