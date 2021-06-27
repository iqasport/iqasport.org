import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import {
  getDocs,
  getPrismicDocByUid,
  formatMetadata,
  PrismicSlice,
  manageLocal,
} from 'modules/prismic';
import SchemaArticle from 'components/schema-article';
import { Box } from 'components';
const backgroundImage = '/images/news-bg.png';

const Meta = dynamic(() => import('components/meta'));
const Page404 = dynamic(() => import('pages/404'));
const PageLoading = dynamic(() => import('components/page-loading'));
const NewsHero = dynamic(() => import('components/news-hero'));
// const NewsFooter = dynamic(() => import('components/news-footer'));

// const BlogSupport = dynamic(() => import('components/blog-support'));

const Post = ({ page: initialPage, preview, lang }) => {
  const router = useRouter();

  const { data: queryData } = useQuery(
    ['posts', router.query.uid, lang?.currentLang],
    () =>
      getPrismicDocByUid('posts', router.query.uid, {
        lang: lang?.currentLang,
      }),
    { initialData: initialPage, enabled: !preview }
  );

  if (router.isFallback && !queryData) {
    return <PageLoading />;
  }

  if (!queryData && !preview) {
    return <Page404 />;
  }

  const page = preview ? initialPage : queryData;

  console.log(page.data);

  return (
    <>
      <Meta {...formatMetadata(page.data)} />
      <SchemaArticle page={page} />
      <Box
        as="article"
        width="100%"
        bg="white"
        backgroundRepeat="no-repeat"
        backgroundSize="fixed"
        bgImage={{ base: 'none', md: `url(${backgroundImage})` }}
        bgSize="100%"
        height="100%"
        bgColor="white"
      >
        <NewsHero {...page.data} />
        {PrismicSlice({ sections: page.data.body })}
        {/* <NewsFooter {...page.data} tags={page.tags} /> */}
      </Box>
    </>
  );
};

export const getStaticProps = async ({
  params: { uid },
  preview = null,
  previewData = {},
  locale,
  locales,
}) => {
  const { ref } = previewData;
  const page =
    (await getPrismicDocByUid(
      'posts',
      uid,
      ref ? { ref, lang: locale } : { lang: locale }
    )) || null;

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);
  return {
    props: { page, preview, lang: { currentLang, isMyMainLanguage } },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const allPages = await getDocs('posts');

  return {
    paths: allPages?.map(({ uid }) => `/news/${uid}`),
    fallback: true,
  };
};

export default Post;
