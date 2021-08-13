import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  getPrismicDocByUid,
  formatMetadata,
  PrismicSlice,
  manageLocal,
  getDocs,
} from 'modules/prismic';
import Meta from 'components/meta';
import Page404 from 'pages/404';
import PageLoading from 'components/page-loading';

const Home = ({ page: initialPage, posts: initialPosts, preview, lang }) => {
  const router = useRouter();
  const { data: queryData } = useQuery(
    ['pages', router.query.uid, lang?.currentLang],
    () =>
      getPrismicDocByUid('pages', router.query.uid, {
        lang: lang?.currentLang,
      }),
    { initialData: initialPage }
  );
  const { data: posts } = useQuery(
    ['posts', router.query.uid, lang?.currentLang],
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

export const getStaticProps = async ({
  params: { uid },
  preview = null,
  previewData = { ref: null },
  locale,
  locales,
}) => {
  const { ref } = previewData;
  const page = await getPrismicDocByUid('pages', uid, { lang: locale, ref });
  const posts = await getDocs('posts', {
    orderings: '[my.posts.date desc]',
    pageSize: 4,
    lang: locale,
  });

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);
  return {
    props: {
      preview,
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

export const getStaticPaths = async () => {
  const allPages = await getDocs('pages');

  return {
    paths: allPages?.map(({ uid }) => `/${uid}`),
    fallback: true,
  };
};

export default Home;
