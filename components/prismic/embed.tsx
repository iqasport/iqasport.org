import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import dynamic from 'next/dynamic';

const Slice = dynamic(() => import('components/slice'));
const Embed = dynamic(() => import('components/embed'));

import { Box, Grid, Heading } from '@chakra-ui/react';

import { linkResolver } from 'modules/prismic';

export const Item = ({ embed, thumbnail, support }) => (
  <Box>
    <Embed embed={embed} thumbnail={thumbnail} />

    {support && (
      <Box textAlign="center" pt={2} fontStyle="italic">
        {support}
      </Box>
    )}
  </Box>
);

const EmbedSlice = (rawData) => {
  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const items = get(rawData, 'items');
  const variant = get(rawData, 'primary.variant');
  const size = get(rawData, 'primary.size');

  const multipleEmbeds = items.length > 1;

  return (
    <Slice variant={variant} size={size}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          fontSize="xl"
          mt={2}
          textAlign="center"
          fontFamily="body"
          fontWeight="bold"
        >
          {RichText.asText(title)}
        </Heading>
      )}

      {content && <RichText render={content} linkResolver={linkResolver} />}

      <Grid
        gridTemplateColumns={{
          base: '1fr',
          md: `${multipleEmbeds ? '1fr 1fr' : '1fr'}`,
        }}
        gridGap={{ base: 4, md: 9 }}
      >
        {items.map((itemData, i) => {
          const thumbnail = get(itemData, 'thumbnail');
          const embed = get(itemData, 'embed');
          const support = get(itemData, 'support');

          return (
            <Item
              key={`embed-slice-${i}`}
              embed={embed}
              thumbnail={thumbnail}
              support={support}
            />
          );
        })}
      </Grid>
    </Slice>
  );
};

export default EmbedSlice;
