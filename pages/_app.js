import dynamic from 'next/dynamic';
import { Chakra } from 'styles/chakra';
import DocumentHead from 'document/head';
import { QueryClientProvider, QueryClient } from 'react-query';

const Scripts = dynamic(() => import('document/scripts'), { ssr: false });
const Layout = dynamic(() => import('layout'));

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Chakra>
          <DocumentHead />
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </Chakra>
      </QueryClientProvider>
      <Scripts />
    </>
  );
}

export default MyApp;

export { getServerSideProps } from 'styles/chakra';
