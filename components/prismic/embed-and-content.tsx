import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import { Text, Slice } from 'components';
import { Grid, Flex, Heading } from '@chakra-ui/react';
import { Embed } from './embed';

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

const EmbedAndContent = (rawData) => {
  const items = get(rawData, 'items');

  return (
    <>
      {items.map((itemData, i) => {
        const item = {
          title: get(itemData, 'title'),
          content: get(itemData, 'content'),
          embed: get(itemData, 'embed'),
          thumbnail: get(itemData, 'thumbnail'),
          variant: get(itemData, 'variant'),
          layout: get(itemData, 'layout_content'),
          support: get(itemData, 'support'),
          cta_text: get(itemData, 'cta_text'),
          cta_url: get(itemData, 'cta_url'),
        };

        const isEmbedLeft = item.layout === 'embed-left';

        return (
          <Slice variant={item.variant} key={`embed-and-content-${i}`}>
            <Item item={item} isEmbedLeft={isEmbedLeft} />
          </Slice>
        );
      })}
    </>
  );
};

export default EmbedAndContent;
