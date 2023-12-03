import type { NextApiRequest, NextApiResponse } from 'next';
import * as prismic from '@prismicio/client';
import { Client, linkResolver } from 'modules/prismic';

const getPages = async (page, documents = []) => {
  const res = await Client().get({
    predicates: prismic.predicate.any('document.type', [
      'pages',
      'posts',
      'volunteer',
      'events',
      'about',
    ]),
    page,
    pageSize: 100,
    fetch: [],
  });
  if (res.next_page !== null) {
    return getPages(page + 1, documents.concat(res.results));
  }

  return documents.concat(res.results);
};

const createSitemap = ({ documents }) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${documents
      .map(
        (document) => `
      <url>
        <loc>https://iqasport.org${linkResolver(document)}</loc>
        <lastmod>${new Date(
          document.last_publication_date
        ).toISOString()}</lastmod>
      </url>
    `
      )
      .join('')}
  </urlset>
`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const documents = await getPages(1, []);

  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap({ documents }));
  res.end();
};

export default handler;
