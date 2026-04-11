import type { NextApiRequest, NextApiResponse } from 'next';
import { sendContactEmail } from '../../lib/contact-service';

function toQueryValue(value: string) {
  return encodeURIComponent(value);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const {
    email = '',
    message = '',
    name = '',
    subject = '',
  } = req.body as Record<string, string>;

  const result = await sendContactEmail({ email, message, name, subject });

  if (result.success) {
    return res.redirect(
      303,
      `/contact?success=${toQueryValue(
        'Thank you for your message! We will get back to you soon.',
      )}`,
    );
  }

  return res.redirect(303, `/contact?error=${toQueryValue(result.message)}`);
}
