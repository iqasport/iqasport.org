import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
} from '@chakra-ui/react';

const Embed = ({ embed, thumbnail }) => {
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
        height="0"
        pt="56.25%"
        width="100%"
        minHeight="200px"
        bg={`url(${thumbnail?.url}) no-repeat`}
        borderRadius="2xl"
        backgroundPosition="center center"
        bgSize="cover"
        overflow="hidden"
        position="relative"
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
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
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

export default Embed;
