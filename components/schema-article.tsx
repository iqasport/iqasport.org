import Head from 'next/head';
import formatISO from 'date-fns/formatISO';
import parseJSON from 'date-fns/parseJSON';

const SchemaArticle = ({ page }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: page?.data?.title,
            image: page?.data?.image?.url,
            datePublished: page?.first_publication_date
              ? formatISO(parseJSON(page?.first_publication_date))
              : null,
            dateModified: page?.last_publication_date
              ? formatISO(parseJSON(page?.last_publication_date))
              : null,
          }),
        }}
      />
    </Head>
  );
};

export default SchemaArticle;
