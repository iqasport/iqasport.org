import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import {
  getDocs,
  getPrismicDocByUid,
  PrismicSlice,
  manageLocal,
} from 'modules/prismic';
import SchemaArticle from 'components/schema-article';
import { Flex } from '@chakra-ui/react';
import Meta from 'components/meta';
import Page404 from 'pages/404';
import PageLoading from 'components/page-loading';
import NewsHero from 'components/news-hero';
import NewsFooter from 'components/news-footer';

const backgroundImage = '/images/news-bg.png';

const Post = ({ page, preview }) => {
  const router = useRouter();

  if (router.isFallback && !page) {
    return <PageLoading />;
  }

  if (!page && !preview) {
    return <Page404 />;
  }

  const metaData = {
    description:
      page?.data?.meta_description || RichText.asText(page?.data?.synopsis),
    subTitle: page?.data?.meta_title || page?.data?.title,
    image: page?.data?.meta_image.url || page?.data?.image?.url,
  };

  return (
    <>
      <Meta {...metaData} />
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
