import { withSentry } from '@sentry/nextjs';
import { Client, linkResolver } from 'modules/prismic';

const handler = async (req, res) => {
  const { token: ref, documentId } = req.query;
  try {
    const redirectUrl = await Client(req).resolvePreviewURL({
      linkResolver,
      defaultURL: '/',
      previewToken: ref,
      documentID: documentId,
    });

    if (!redirectUrl) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.setPreviewData({ ref });
    res.setHeader('location', redirectUrl);
    res.statusCode = 302;
    res.end();
  } catch {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

export default withSentry(handler);
