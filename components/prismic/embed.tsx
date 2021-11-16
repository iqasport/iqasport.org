import { RichText } from 'prismic-reactjs';
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

const EmbedSlice = ({ primary, items }) => {
  const { size, title, variant, content } = primary;

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
        {items.map((item, i) => {
          return (
            <Item
              key={`embed-slice-${i}`}
              embed={item?.embed}
              thumbnail={item?.thumbnail}
              support={item?.support}
            />
          );
        })}
      </Grid>
    </Slice>
  );
};

export default EmbedSlice;
