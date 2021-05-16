import { useRouter } from 'next/router';
import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const Meta = ({
  subTitle = null,
  description = 'The official site of the international governing body for Quidditch, with news, national associations, competitions, results, fixtures, development, organisation, rulebooks, publications, downloads, and contact details.',
  image = `${SITE_URL}/open-graph.png`,
  title = 'International Quidditch Association',
  type = 'website',
}) => {
  const { asPath } = useRouter();
  const url = `${SITE_URL}${asPath}`;
  const formattedTitle = subTitle ? `${subTitle} | ${title}` : title;

  return (
    <Head>
      <title>{formattedTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default Meta;
