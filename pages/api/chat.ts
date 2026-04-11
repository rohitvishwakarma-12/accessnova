import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatReply } from '../../lib/chat-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const { message } = req.body as { message?: string };

  if (!message) {
    return res.status(200).json({
      reply:
        "I didn't quite catch that. Could you please rephrase your question?",
    });
  }

  try {
    const reply = await getChatReply(message);
    return res.status(200).json(reply);
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({
      reply:
        "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment! 🤖",
    });
  }
}
