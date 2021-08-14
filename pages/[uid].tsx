import { useRouter } from 'next/router';
import { getStaticPrismicProps, getDocs } from 'modules/prismic';
import PrismicPage from 'components/prismic-page';

const Page = (props) => {
  const router = useRouter();
  return <PrismicPage type="pages" uid={router.query.uid} {...props} />;
};

export const getStaticProps = async ({
  params: { uid },
  locale,
  locales,
  preview = null,
  previewData = { ref: null },
}) => {
  const prismicProps = await getStaticPrismicProps({
    previewData,
    type: 'pages',
    uid,
    lang: locale,
    locales,
  });

  return {
    props: { ...prismicProps, preview },
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

export default Page;
