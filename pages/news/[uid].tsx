import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import { getDocs, getPrismicDocByUid, manageLocal } from 'modules/prismic';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const PrismicSlice = dynamic(() => import('components/prismic'));
const SchemaArticle = dynamic(() => import('components/schema-article'));
const Meta = dynamic(() => import('components/meta'));
const Page404 = dynamic(() => import('pages/404'));
const PageLoading = dynamic(() => import('components/page-loading'));
const NewsHero = dynamic(() => import('components/news-hero'));
const NewsFooter = dynamic(() => import('components/news-footer'));

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
        direction="column"
        backgroundRepeat="no-repeat"
        backgroundSize="fixed"
        bgImage={`url(${backgroundImage})`}
        bgSize="100%"
        height="100%"
      >
        <NewsHero {...page.data} />
        <PrismicSlice sections={page.data.body} />
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
