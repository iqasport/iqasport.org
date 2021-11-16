import { RichText, Link } from 'prismic-reactjs';
import dynamic from 'next/dynamic';
import { Flex, Heading, Box } from '@chakra-ui/react';
import { cardVariants } from 'components/card';
import { linkResolver } from 'modules/prismic';

const Slice = dynamic(() => import('components/slice'));
const HorizontalCard = dynamic(() => import('components/horizontal-card'));

const HorizontalCardsSlice = ({ primary, items }) => {
  const { title, content, variant } = primary;

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          mt={2}
          textAlign="center"
          px={{ base: 0, md: 9 }}
          fontFamily="body"
          fontWeight="bold"
        >
          {RichText.asText(title)}
        </Heading>
      )}

      {content && (
        <Box textAlign="center" pb={3} px={{ base: 0, md: 9 }}>
          <RichText render={content} linkResolver={linkResolver} />
        </Box>
      )}

      {items.map(({ title, content, image, layout_content, link }, i) => {
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

        const isImageLeft = layout_content === 'image-left';

        return (
          <Flex
            flexDirection="column"
            key={`horizontal-cards-${i}-${title}-${content}`}
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
