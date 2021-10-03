import { useRouter } from 'next/router';
import usePrismicQuery from 'hooks/usePrismicQuery';
import usePrismicPostsQuery from 'hooks/usePrismicPostsQuery';
import dynamic from 'next/dynamic';

const Meta = dynamic(() => import('components/meta'));
const Page404 = dynamic(() => import('pages/404'));
const PageLoading = dynamic(() => import('components/page-loading'));
import { formatMetadata, PrismicSlice } from 'modules/prismic';

// Base Prismic page component with react-query refresh, 404 and loading fallbacks
const Base = ({
  type,
  uid,
  page: initialPage,
  posts: initialPosts,
  preview,
  lang,
}) => {
  const router = useRouter();
  const queryData = usePrismicQuery({
    type,
    uid,
    lang: lang?.currentLang,
    initialData: initialPage,
  });

  const posts = usePrismicPostsQuery({
    uid,
    lang: lang?.currentLang,
    initialData: initialPosts,
  });

  const page = preview ? initialPage : queryData;

  if (router?.isFallback && !queryData) {
    return <PageLoading />;
  }

  if (!queryData && !preview) {
    return <Page404 />;
  }

  return (
    <>
      <Meta {...formatMetadata(page.data)} />
      <>{PrismicSlice({ sections: page.data.body, posts })}</>
    </>
  );
};

export default Base;
