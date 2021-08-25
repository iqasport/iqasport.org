import { getStaticPrismicProps } from 'modules/prismic';
import PrismicPage from 'components/prismic-page';
import { ContactForm } from 'components/prismic';

const Home = (props) => {
  return (
    <>
      <PrismicPage type="pages" uid="home" {...props} />
      <ContactForm {...{ primary: { variant: 'white' } }} />
    </>
  );
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
    uid: 'home',
    lang: locale,
    locales,
  });

  return {
    props: { ...prismicProps, preview },
    revalidate: 1,
  };
};

export default Home;
