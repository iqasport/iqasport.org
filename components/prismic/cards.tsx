import { RichText, Link } from 'prismic-reactjs';
import get from 'just-safe-get';

import { Flex, Heading, Box, Slice, Card, Grid } from 'components';
import { cardVariants } from 'components/card';

import { linkResolver } from 'modules/prismic';

const CardsSlice = (rawData) => {
  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const items = get(rawData, 'items') || [];

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading as="h2" mt={2} textAlign="center" px={{ base: 0, md: 9 }}>
          {RichText.asText(title)}
        </Heading>
      )}

      {content && (
        <Box textAlign="center" pb={3} px={{ base: 0, md: 9 }}>
          <RichText render={content} linkResolver={linkResolver} />
        </Box>
      )}

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap={8}
      >
        {items.map((item, i) => {
          const title = get(item, 'title');
          const content = get(item, 'content');
          const image = get(item, 'image');
          const link = get(item, 'link');

          const linkProps = Link.url(link, linkResolver)
            ? {
                href: Link.url(link, linkResolver),
                target: link.target,
                ariaLabel: title,
                ...(link.target === '_blank' && {
                  rel: 'noopener noreferrer',
                }),
              }
            : null;

          return (
            <Flex
              flexDirection="column"
              key={`cards-${i}-${item?.title}-${item?.content}`}
            >
              <Card
                {...linkProps}
                title={title}
                content={content}
                variant={cardVariants[variant]}
                image={{
                  src: image.url,
                  alt: image.alt,
                  height: image.height,
                  width: image.width,
                }}
              />
            </Flex>
          );
        })}
      </Grid>
    </Slice>
  );
};

export default CardsSlice;
