import type { NextApiRequest, NextApiResponse } from 'next';
import { linkResolver, getDocs, PrismicDocument } from 'modules/prismic';
import RSS from 'rss';

const getPages = async (page, documents = []) => {
  const res = await getDocs('posts', { pageSize: 100 });

  return documents.concat(res);
};

const createFeed = ({ documents }) => {
  const feed = new RSS({
    title: `International Quadball Association`,
    description: `The official site of the international governing body for quadball, with news, national associations, competitions, results, fixtures, development, organisation, rulebooks, publications, downloads, and contact details.`,
    language: 'en',
    site_url: 'https://iqasport.org/',
    feed_url: 'https://iqasport.org/api/feed.xml',
  });

  documents.forEach((post: PrismicDocument) => {
    feed.item({
      guid: post.id,
      title: post.data?.title,
      description: post.data?.meta_description ?? post.data?.synopsis,
      url: `https://iqasport.org${linkResolver(post)}`,
      date: new Date(post.last_publication_date),
      categories: post.tags.map((tag) => tag),
      enclosure: {
        url: post.data?.image?.url,
      },
    });
  });

  return feed.xml();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const documents = await getPages(1, []);

  const cacheMaxAgeUntilStaleSeconds = 60 * 60; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 60 * 60 * 60; // 60 minutes
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  );

  res.setHeader('Content-Type', 'text/xml');
  res.write(createFeed({ documents }));
  res.end();
};

export default handler;
