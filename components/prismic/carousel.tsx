import { RichText } from 'prismic-reactjs';
import Flickity from 'react-flickity-component';
import get from 'just-safe-get';
import { Slice, Box, Heading, Text } from 'components';
import { linkResolver } from 'modules/prismic';

const CarouselContainer = (props) => (
  <Box
    position="relative"
    w="100%"
    overflow="hidden"
    {...props}
    sx={{
      '.flickity-prev-next-button': {
        position: 'absolute',
        top: '30%',
        background: 'transparent',
        fill: 'gray.800',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '0',
      },

      '.previous': {
        left: '0',
        paddingLeft: '1rem',
      },

      '.next': {
        right: '0',
        paddingRight: '1rem',
      },

      img: {
        opacity: 0.2,
        transition: 'opacity 0.2s ease',
      },

      em: {
        opacity: 0,
        transition: 'opacity 0.2s ease',
      },

      'div.is-selected img': {
        opacity: 1,
        transition: 'opacity 0.2s ease',
      },

      'div.is-selected em': {
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
        <Heading as="h2" mt={2} textAlign="center">
          {RichText.asText(title)}
        </Heading>
      )}

      <Box maxWidth="768px" px={{ base: 4, sm: 8, md: 10 }} m="0 auto">
        {RichText.asText(content) && (
          <>{RichText.render(content, linkResolver)}</>
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
            <Box width="66%" key={`carousel-image-${item?.image.url}-${i}`}>
              <img src={item?.image?.url} width="100%" />
              <Box p={2} mt={0}>
                <Text as="em" fontStyle="italic" fontSize="sm">
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
              </Box>
            </Box>
          ))}
        </Flickity>
      </CarouselContainer>
    </Slice>
  );
};

export default Carousel;
