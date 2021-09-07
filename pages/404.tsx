import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Flex, Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

const Image = dynamic(() => import('components/image'));
const Container = dynamic(() => import('components/container'));
const Meta = dynamic(() => import('components/meta'));

export default function Custom404() {
  return (
    <Flex bg="gray.100" minHeight="500px" alignItems="center">
      <Container>
        <Meta subTitle="Page Not Found" />
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          py={10}
          px={5}
        >
          <Heading as="h2" fontSize="8xl" textAlign="center" my={0}>
            404
          </Heading>
          <Heading as="h1" textAlign="center" marginTop={0}>
            No forward motion
          </Heading>

          <Text>
            That&#39;s a turnover.{' '}
            <Link href="/" passHref>
              <ChakraLink fontWeight="bold" color="black">
                Return to the Homepage
              </ChakraLink>
            </Link>
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
}
