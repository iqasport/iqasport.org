import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import GTag, { pageview } from 'modules/analytics';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('layout'));
const Fonts = dynamic(() => import('styles/fonts'));
const DocumentHead = dynamic(() => import('document/head'));
const AppErrorBoundary = dynamic(
  () => import('components/errorBoundaries/app')
);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = async (url: URL) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AppErrorBoundary>
      <GTag />
      <DocumentHead />
      <Fonts />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppErrorBoundary>
  );
}

export default MyApp;
