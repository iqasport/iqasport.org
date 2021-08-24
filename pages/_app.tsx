import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from 'styles/fonts';
import theme from 'styles/theme';
import DocumentHead from 'document/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import Layout from 'layout';
import GTag, { pageview } from 'modules/analytics';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, pageview]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS={false}>
          <GTag />
          <DocumentHead />
          <Fonts />
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
      <script
        defer
        src={`//static.cdn.prismic.io/prismic.js?${process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME}&new=true`}
      />
    </>
  );
}

export default MyApp;
