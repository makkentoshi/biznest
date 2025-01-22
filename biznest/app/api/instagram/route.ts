import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message, userId } = req.body;

    // Проверка на триггерное слово
    if (message.includes('цена')) {
      // Отправка запроса в OpenAI
      const aiResponse = await axios.post('/api/openai', { prompt: message });
      const replyMessage = aiResponse.data.reply;

      // Отправка ответа в Instagram
      await axios.post(`https://graph.facebook.com/v12.0/${userId}/messages`, {
        message: replyMessage,
        access_token: INSTAGRAM_ACCESS_TOKEN,
      });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}