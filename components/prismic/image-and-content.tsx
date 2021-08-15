import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import { Grid, Flex, Heading, Text, Slice, Image, Box } from 'components';
import { linkResolver } from 'modules/prismic';

// import { buttonVariants } from 'components/prismic-wrapper';
// const ExternalLink = dynamic(() => import('components/external-link'));
// const Button = dynamic(() => import('components/button'));

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
          fontWeight="black"
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

const ImageAndContent = (rawData) => {
  const items = get(rawData, 'items');

  return (
    <>
      {items.map((itemData, i) => {
        const item = {
          title: get(itemData, 'title'),
          content: get(itemData, 'content'),
          image: get(itemData, 'image'),
          variant: get(itemData, 'variant'),
          layout: get(itemData, 'layout_content'),
          support: get(itemData, 'support'),
          cta_text: get(itemData, 'cta_text'),
          cta_url: get(itemData, 'cta_url'),
        };

        const isImageLeft = item.layout === 'image-left';

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
