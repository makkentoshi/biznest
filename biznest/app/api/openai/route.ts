import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  // Промпт для DeepSeek
  const prompt = `
Ты — профессиональный бизнес-консультант. Твоя задача — давать четкие, структурированные и понятные ответы на запросы пользователя. 
Ответы должны быть без лишних символов (например, **, ###), в читаемом формате. Если нужно перечислить пункты, используй маркированные списки. 
Не добавляй лишние комментарии или приветствия, просто давай ответ.
  `;

  try {
    // Отправляем запрос к DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // Укажи нужную модель
        messages: [
          { role: 'system', content: prompt }, // Системное сообщение с промптом
          { role: 'user', content: message },  // Сообщение пользователя
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Очищаем ответ от лишних символов
    const cleanReply = reply.replace(/###|\*\*/g, '').trim();

    return NextResponse.json({ reply: cleanReply });
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from DeepSeek' },
      { status: 500 }
    );
  }
}