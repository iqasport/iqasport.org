import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';
// TODO: Re-enable sentry when Next12 issues resolved.
// import { captureException, withSentry } from '@sentry/nextjs';

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

const departmentEmails = {
  'Board of Trustees': ['hiring@iqasport.org', 'trustees@iqasport.org'],
  'Communications & Technology': [
    'hiring@iqasport.org',
    'communications@iqasport.org',
    'tech@iqasport.org',
  ],
  'Events & Membership Services': [
    'hiring@iqasport.org',
    'membership@iqasport.org',
  ],
  Gameplay: ['hiring@iqasport.org', 'gameplay@iqasport.org'],
  'Human Resources & Operations': 'human.resources@iqasport.org',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { message, email, name, role } = req?.body;

      const msg = {
        to: departmentEmails[role.department],
        from: 'info@iqasport.org',
        subject: `Volunteer Form: ${role?.title}`,
        text: `Name: ${name}\nEmail: ${email}\nPersonal Statement: ${message}`,
        html: `
          <b>Name:</b> ${name}<br />
          <b>Email:</b> ${email}<br />
          <b>Personal Statement:</b> ${message}
          `,
      };

      await sendgrid.send(msg);
      return res.status(201).json({});
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
