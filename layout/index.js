import { useColorModeValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Grid, Flex, Text, Link, Box } from 'components';

const Header = dynamic(() => import('layout/header'));
const Footer = dynamic(() => import('layout/footer'));

const Layout = ({ children, preview = false, page }) => {
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Grid color={color} width="100%">
      {preview && (
        <Flex
          bg="red"
          color="white"
          alignItems="center"
          justifyContent="center"
        >
          <Text>
            This page is a preview.{' '}
            <Link
              fontWeight="bold"
              color="white"
              textDecoration="none"
              href="/api/exit-preview"
              _hover={{ textDecoration: 'underline' }}
            >
              Click here
            </Link>{' '}
            to exit preview mode.
          </Text>
        </Flex>
      )}

      <Header page={page} />
      <Box as="main">{children}</Box>
      <Footer />
    </Grid>
  );
};

export default Layout;
