import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';
import DocumentHead from 'document/head';
import { QueryClientProvider, QueryClient } from 'react-query';

const Scripts = dynamic(() => import('document/scripts'), { ssr: false });
const Layout = dynamic(() => import('layout'));

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS={false}>
          <DocumentHead />
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
      <Scripts />
    </>
  );
}

export default MyApp;
