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
import { Flex } from 'components';
import Meta from 'components/meta';
import Page404 from 'pages/404';
import PageLoading from 'components/page-loading';
import NewsHero from 'components/news-hero';
import NewsFooter from 'components/news-footer';

const backgroundImage = '/images/news-bg.png';

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

  return (
    <>
      <Meta {...formatMetadata(page.data)} />
      <SchemaArticle page={page} />
      <Flex
        as="article"
        width="100%"
        bg="gray.100"
        backgroundRepeat="no-repeat"
        backgroundSize="fixed"
        bgImage={`url(${backgroundImage})`}
        bgSize="100%"
        height="100%"
        direction="column"
      >
        <NewsHero {...page.data} />
        {PrismicSlice({ sections: page.data.body })}
        <NewsFooter {...page.data} tags={page.tags} />
      </Flex>
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