import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import {
  getPrismicDocByUid,
  formatMetadata,
  PrismicSlice,
  manageLocal,
  getDocs,
} from 'modules/prismic';

const Meta = dynamic(() => import('components/meta'));
const Page404 = dynamic(() => import('pages/404'));
const PageLoading = dynamic(() => import('components/page-loading'));

const Home = ({ page: initialPage, posts: initialPosts, preview, lang }) => {
  const router = useRouter();
  const { data: queryData } = useQuery(
    ['pages', 'home', lang?.currentLang],
    () => getPrismicDocByUid('pages', 'home', { lang: lang?.currentLang }),
    { initialData: initialPage }
  );
  const { data: posts } = useQuery(
    ['posts', 'home', lang?.currentLang],
    () =>
      getDocs('posts', {
        orderings: '[my.posts.date desc]',
        pageSize: 4,
        lang: lang?.currentLang,
      }),
    { initialData: initialPosts }
  );

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
      <>{PrismicSlice({ sections: page.data.body, posts })}</>
    </>
  );
};

export const getStaticProps = async ({ locale, locales }) => {
  const page = await getPrismicDocByUid('pages', 'home', { lang: locale });
  const posts = await getDocs('posts', {
    orderings: '[my.posts.date desc]',
    pageSize: 4,
    lang: locale,
  });

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
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
