import { Grid, Flex, Text, Link, Box } from 'components';
import Header from 'layout/header';
import Footer from 'layout/footer';

const Layout = ({ children, preview = false }) => {
  return (
    <Grid color="gray.800" width="100%" bg="iqaGreen">
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

      <Header />
      <Box
        as="main"
        sx={{
          'div[data-type="wave"]:last-of-type': {
            display: 'none',
          },
        }}
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
      <Footer />
    </Grid>
  );
};

export default Layout;
