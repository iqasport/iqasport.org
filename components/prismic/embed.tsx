import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import {
  Box,
  Grid,
  Heading,
  Slice,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
} from 'components';

import { linkResolver } from 'modules/prismic';

export const Embed = ({ embed, thumbnail }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let url = null;

  // Oh, you better believe that is a-hackin'
  if (embed.provider_name === 'YouTube') {
    [url] = embed.html.split('src="')[1].split('"');
  }

  if (embed.provider_name === 'Facebook') {
    const timestamp = embed.embed_url.split('t=')[1];
    url = `https://www.facebook.com/plugins/video.php?height=314&show_text=false&width=560&href=${
      embed.embed_url
    }${timestamp ? `&t=${timestamp}` : ''}`;
  }

  return (
    <>
      <Flex
        onClick={onOpen}
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
        transition="all 0.2s ease"
        height="100%"
        width="100%"
        minHeight="200px"
        bg={`url(${thumbnail?.url}) no-repeat`}
        borderRadius="2xl"
        backgroundPosition="center center"
        bgSize="cover"
        _hover={{
          _after: {
            bg: 'iqaGreen',
          },
        }}
        _after={{
          content: '""',
          mask: 'url(/images/play.svg)',
          zIndex: '10',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          width: '50px',
          bg: 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.2s ease',
        }}
      />

      <Modal
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        allowPinchZoom={true}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent
          mx={{ base: 4, xl: 60 }}
          h="initial"
          bg="none"
          boxShadow="none"
          minHeight="initial"
        >
          {url && (
            <Box position="relative" width="100%" pb="56.25%">
              <Box
                as="iframe"
                position="absolute"
                borderRadius="md"
                top="0"
                left="0"
                width="100%"
                height="100%"
                border="0"
                src={`${url}&autoplay=1`}
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              />
            </Box>
          )}

          {!url && <div dangerouslySetInnerHTML={{ __html: embed.html }} />}
        </ModalContent>
      </Modal>
    </>
  );
};

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

  const multipleEmbeds = items.length > 1;

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          fontSize="xl"
          mt={2}
          textAlign="center"
          fontFamily="body"
          fontWeight="black"
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
