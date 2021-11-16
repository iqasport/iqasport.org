import { useRouter } from 'next/router';
import { Box, Flex, Link as ChakraLink, HStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import FacebookIcon from 'public/images/facebook.svg';
import WhatsappIcon from 'public/images/whatsapp.svg';
import TwitterIcon from 'public/images/twitter.svg';

const Text = dynamic(() => import('components/text'));

const IconWrapper = (props) => (
  <ChakraLink height="25px" width="25px" {...props} />
);

const Icon = (props) => (
  <Box color="white" _hover={{ color: 'iqaGreen' }} {...props} />
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const NewsFooter = ({ title }) => {
  const router = useRouter();
  const url = `${SITE_URL}${router.asPath}`;

  return (
    <>
      <Box
        bg="gray.700"
        zIndex="1"
        marginTop="calc(100vw * 0.04583705357 * -1)"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          margin="0 auto"
          maxWidth="1280px"
          px={{ base: 4, sm: 8, md: 10 }}
          py={3}
          pb={5}
        >
          <Flex flexDirection="column">
            <Text mt={0} fontSize="md" color="white" fontWeight="bold">
              Share this article
            </Text>

            <HStack spacing={5}>
              <IconWrapper
                aria-label="Share this article on Facebook"
                href={`https://www.facebook.com/sharer.php?u=${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={FacebookIcon} />
              </IconWrapper>

              <IconWrapper
                aria-label="Tweet this article"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `International Quidditch Association: ${title} ${url}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={TwitterIcon} />
              </IconWrapper>
              <IconWrapper
                aria-label="Share this article on Whatsapp"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `International Quidditch Association: ${title} ${url}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={WhatsappIcon} />
              </IconWrapper>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NewsFooter;
