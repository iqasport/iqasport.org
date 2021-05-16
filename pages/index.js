import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import {
  getPrismicDocByUid,
  formatMetadata,
  PrismicSlice,
  manageLocal,
} from 'modules/prismic';

const Meta = dynamic(() => import('components/meta'));
const Page404 = dynamic(() => import('pages/404'));
const PageLoading = dynamic(() => import('components/page-loading'));

const Home = ({
  page: initialPage,
  /* posts: initialPosts, */ preview,
  lang,
}) => {
  const router = useRouter();
  const { data: queryData } = useQuery(
    ['pages', 'home'],
    () => getPrismicDocByUid('pages', 'home', { lang: lang?.currentLang }),
    { initialData: initialPage }
  );
  // const { data: posts } = useQuery(
  //   ['post', 'home'],
  //   () =>
  //     getDocs('post', {
  //       orderings: '[my.post.date desc]',
  //       pageSize: 6,
  //     }),
  //   { initialData: initialPosts }
  // );
  const posts = [];

  const page = preview ? initialPage : queryData;

  if (router.isFallback && !queryData) {
    return <PageLoading />;
  }

  if (!queryData && !preview) {
    return <Page404 />;
  }

  return (
    <>
      <Meta {...formatMetadata(page.data)} />
      <>{PrismicSlice(page.data.body, posts)}</>
    </>
  );
};

export const getStaticProps = async ({ locale, locales }) => {
  const page = await getPrismicDocByUid('pages', 'home', { lang: locale });
  // const posts = await getDocs('post', {
  //   orderings: '[my.post.date desc]',
  //   pageSize: 6,
  // });
  const posts = [];

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);
  return {
    props: {
      page,
      posts,
      lang: {
        currentLang,
        isMyMainLanguage,
      },
    },
    revalidate: 1,
  };
};

export default Home;
