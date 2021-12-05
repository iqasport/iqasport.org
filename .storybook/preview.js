import * as NextImage from 'next/image';
import { ChakraProvider, Grid, Box } from '@chakra-ui/react';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12

import Head from 'next/head';
import reset from '../styles/reset';
import theme from '../styles/theme';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const withChakra = (Story, context) => (
  <>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: reset }} />
    </Head>
    <ChakraProvider resetCSS={false} theme={theme}>
      <Grid color="gray.800" width="100%" bg="iqaGreen">
        <Box
          as="main"
          sx={{
            'div[data-type="wave"]:last-of-type': {
              display: 'none',
            },
          }}
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <Story {...context} />
        </Box>
      </Grid>
    </ChakraProvider>
  </>
);

export const decorators = [withChakra];
