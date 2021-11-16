import { RichText } from 'prismic-reactjs';

import { Grid, Flex, Heading, Box } from '@chakra-ui/react';
import { linkResolver } from 'modules/prismic';
import dynamic from 'next/dynamic';

const Text = dynamic(() => import('components/text'));
const Slice = dynamic(() => import('components/slice'));
const Image = dynamic(() => import('components/image'));

const Item = ({ item, isImageLeft }) => (
  <Grid
    gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
    gridGap={{ base: 4, md: 9 }}
    gridTemplateAreas={{
      base: "'image' 'content'",
      md: isImageLeft ? "'image content'" : "'content image'",
    }}
  >
    <Flex direction="column" justifyContent="center" gridArea="image">
      {item?.image?.url && (
        <Image
          alt={item?.image?.alt}
          src={item?.image?.url}
          layout="responsive"
          height={item.image?.dimensions?.height}
          width={item.image?.dimensions?.width}
        />
      )}
      <Box p={2} mt={0}>
        <Text as="em" fontStyle="italic" fontSize="sm">
          {RichText.asText(item.support) && (
            <>
              {RichText.asText(item.support)}
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
    </Flex>

    <Flex direction="column" justifyContent="center" gridArea="content">
      {RichText.asText(item.title) && (
        <Heading
          as="h2"
          fontSize={{ base: 'xl', md: '3xl' }}
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

const ImageAndContent = ({ items }) => {
  return (
    <>
      {items.map((item, i) => {
        const isImageLeft = item.layout_content === 'image-left';

        return (
          <Slice variant={item.variant} key={`image-and-content-${i}`}>
            <Item item={item} isImageLeft={isImageLeft} />
          </Slice>
        );
      })}
    </>
  );
};

export default ImageAndContent;
