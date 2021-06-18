import dynamic from 'next/dynamic';
import { Flex, Box, Heading } from '@chakra-ui/react';

const Image = dynamic(() => import('components/image'));
const Container = dynamic(() => import('components/container'));
const Meta = dynamic(() => import('components/meta'));

export default function Custom404() {
  return (
    <Box>
      <Container>
        <Meta subTitle="Page Not Found" />
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          py={10}
          px={5}
        >
          <Heading as="h1" textAlign="center" marginTop={0}>
            Page Not Found
          </Heading>
          <Image src="/images/404.gif" alt="404" height={208} width={500} />
        </Flex>
      </Container>
    </Box>
  );
}
