import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';
// TODO: Re-enable sentry when Next12 issues resolved.
// import { captureException, withSentry } from '@sentry/nextjs';

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { message, email, name, subject } = req?.body;

      const msg = {
        to: 'info@iqasport.org',
        from: 'info@iqasport.org',
        subject: `Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${req?.body.message}`,
        html: `
          <b>Name:</b> ${name}<br />
          <b>Email:</b> ${email}<br />
          <b>Message:</b> ${message}
          `,
      };
      await sendgrid.send(msg);
      res.status(201).json({});
      return;
    } catch (err) {
      // captureException(err);
      return res
        .status(400)
        .send({ error: 'Error in sendgrid Service.', errMsg: err });
    }
  }

  res.status(405);
};

// export default withSentry(handler);
export default handler;
