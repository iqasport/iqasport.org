import { useRouter } from 'next/router';
import { getStaticPrismicProps, getDocs } from 'modules/prismic';
import dynamic from 'next/dynamic';

const PrismicPage = dynamic(() => import('components/prismic-page'));

const Page = (props) => {
  const router = useRouter();
  return <PrismicPage type="volunteer" uid={router.query.uid} {...props} />;
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
    type: 'volunteer',
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
  const allPages = await getDocs('volunteer');

  return {
    paths: allPages?.map(({ uid }) => `/volunteer/${uid}`),
    fallback: true,
  };
};

export default Page;
