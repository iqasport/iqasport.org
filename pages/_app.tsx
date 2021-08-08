import App from 'next/app';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { AlertDialogHeader, ChakraProvider } from '@chakra-ui/react';
import Fonts from 'styles/fonts';
import theme from 'styles/theme';
import DocumentHead from 'document/head';
import { Client } from 'modules/prismic';
import { QueryClientProvider, QueryClient } from 'react-query';
import Layout from 'layout';

interface Props extends AppProps {
  props?: {
    footer: {
      nenu_1_links: Array<any>;
      menu_2_links: Array<any>;
      disclaimer: string;
    };
    header: {
      top_level_navigation: Array<any>;
      body: Array<any>;
    };
  };
}

const Scripts = dynamic(() => import('document/scripts'), { ssr: false });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, props }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS={false}>
          <DocumentHead />
          <Fonts />
          <Layout
            {...pageProps}
            footerData={props.footer}
            headerData={props.header}
          >
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
      <Scripts />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { data: footer } = await Client().getSingle('footer', {
    lang: appContext.router.locale,
  });

  const { data: header } = await Client().getSingle('header', {
    lang: appContext.router.locale,
  });

  return {
    ...appProps,
    props: {
      footer,
      header,
    },
  };
};

export default MyApp;
