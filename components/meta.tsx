import { useRouter } from 'next/router';
import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

type MetaTypes = {
  subTitle?: string;
  description?: string;
  image?: string;
  title?: string;
  type?: string;
};

const Meta = ({
  subTitle,
  description,
  image = `${SITE_URL}/open-graph.png`,
  title = 'International Quadball Association',
  type = 'website',
}: MetaTypes): React.ReactElement => {
  const descriptionWithFallback =
    description ??
    'The official site of the international governing body for quadball, with news, national associations, competitions, results, fixtures, development, organisation, rulebooks, publications, downloads, and contact details.';
  const { asPath } = useRouter();
  const url = `${SITE_URL}${asPath}`;
  const formattedTitle = subTitle ? `${subTitle} | ${title}` : title;

  return (
    <Head>
      <title>{formattedTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={descriptionWithFallback} />
      <meta property="og:description" content={descriptionWithFallback} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default Meta;
