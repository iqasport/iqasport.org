import { RichText, Link } from 'prismic-reactjs';
import get from 'just-safe-get';

import { Flex, Heading, Box, Slice, HorizontalCard } from 'components';
import { cardVariants } from 'components/card';

import { linkResolver } from 'modules/prismic';

const HorizontalCardsSlice = (rawData) => {
  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const items = get(rawData, 'items');

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading as="h2" mt={2} textAlign="center" px={{ base: 0, md: 9 }}>
          {RichText.asText(title)}
        </Heading>
      )}

      {content && (
        <Box textAlign="center" pb={3} px={{ base: 0, md: 9 }}>
          {RichText.render(content, linkResolver)}
        </Box>
      )}

      {items.map((itemData, i) => {
        const title = get(itemData, 'title');
        const content = get(itemData, 'content');
        const image = get(itemData, 'image');
        const layout = get(itemData, 'layout_content');
        const link = get(itemData, 'link');

        const linkProps = Link.url(link, linkResolver)
          ? {
              href: Link.url(link, linkResolver),
              target: link.target,
              ariaLabel: title,
            }
          : null;

        const isImageLeft = layout === 'image-left';

        return (
          <Flex
            flexDirection="column"
            key={`cards-${i}`}
            mb={5}
            px={{ base: 0, md: 0 }}
          >
            <HorizontalCard
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
              isImageLeft={isImageLeft}
            />
          </Flex>
        );
      })}
    </Slice>
  );
};

export default HorizontalCardsSlice;
