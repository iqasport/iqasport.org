import { getStaticPrismicProps } from 'modules/prismic';
import PrismicPage from 'components/prismic-page';

const Volunteer = (props) => {
  return <PrismicPage type="pages" uid="volunteer" {...props} />;
};

export const getStaticProps = async ({
  locale,
  locales,
  preview = null,
  previewData = { ref: null },
}) => {
  const prismicProps = await getStaticPrismicProps({
    previewData,
    type: 'pages',
    uid: 'volunteer',
    lang: locale,
    locales,
  });

  return {
    props: { ...prismicProps, preview },
    revalidate: 1,
  };
};

export default Volunteer;
