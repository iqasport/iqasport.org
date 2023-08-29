import { RichText, Link } from 'prismic-reactjs';
import { Flex, Heading, Box, Grid } from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import { cardVariants } from 'components/card';
import { linkResolver } from 'modules/prismic';
import { ReactElement } from 'react';

const Card = dynamic(() => import('components/card'));
const Slice = dynamic(() => import('components/slice'));

const styleOverrides = {
  fourInRow: {
    gridItemMinSize: '260px',
  },
};

function CardsSlice(rawData): ReactElement {
  const { primary, items = [] } = rawData;
  const { title, content, variant, format_metadata } = primary;

  const gridItemMinSize =
    styleOverrides[format_metadata]?.gridItemMinSize || '300px';

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          mt={2}
          textAlign="center"
          px={{ base: 0, md: 9 }}
          fontFamily="body"
        >
          {RichText.asText(title)}
        </Heading>
      )}

      {content && (
        <Box textAlign="center" pb={3} px={{ base: 0, md: 9 }}>
          <RichText render={content} linkResolver={linkResolver} />
        </Box>
      )}

      <Grid
        gridTemplateColumns={`repeat(auto-fit, minmax(${gridItemMinSize}, 1fr))`}
        gridGap={8}
      >
        {items.map((item, i) => {
          const { title, content, image, link } = item;

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
}

export default CardsSlice;
