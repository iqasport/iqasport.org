import { RichText } from 'prismic-reactjs';
import dynamic from 'next/dynamic';

import { Grid, Flex, Heading } from '@chakra-ui/react';

const Embed = dynamic(() => import('components/embed'));
const Text = dynamic(() => import('components/text'));
const Slice = dynamic(() => import('components/slice'));

import { linkResolver } from 'modules/prismic';

const Item = ({ item, isEmbedLeft }) => (
  <Grid
    gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
    gridGap={{ base: 4, md: 9 }}
    gridTemplateAreas={{
      base: "'embed' 'content'",
      md: isEmbedLeft ? "'embed content'" : "'content embed'",
    }}
  >
    <Flex direction="column" justifyContent="center" gridArea="embed">
      <Embed embed={item.embed} thumbnail={item.thumbnail} />

      {RichText.asText(item.support) && (
        <Text textAlign="center" pt={2} fontStyle="italic">
          <RichText render={item.support} />
        </Text>
      )}
    </Flex>

    <Flex direction="column" justifyContent="center" gridArea="content">
      {RichText.asText(item.title) && (
        <Heading
          as="h2"
          fontSize="xl"
          mt={2}
          fontFamily="body"
          fontWeight="bold"
        >
          {RichText.asText(item.title)}
        </Heading>
      )}

      {item.content && (
        <RichText render={item.content} linkResolver={linkResolver} />
      )}
    </Flex>
  </Grid>
);

const EmbedAndContent = ({ items }) => (
  <>
    {items.map((item, i) => {
      const isEmbedLeft = item.layout_content === 'embed-left';

      return (
        <Slice variant={item.variant} key={`embed-and-content-${i}`}>
          <Item item={item} isEmbedLeft={isEmbedLeft} />
        </Slice>
      );
    })}
  </>
);

export default EmbedAndContent;
