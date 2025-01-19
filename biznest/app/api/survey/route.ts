import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: Request) {
  const { userId } = await auth(); // Получаем ID пользователя из Clerk

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { questionId, answers } = await req.json();

  const client = await connectToDatabase();
  const db = client.db('mydb'); // Замените 'mydb' на имя вашей базы данных

  try {
    // Сохраняем каждый ответ в базу данных
    for (const answer of answers) {
      await db.collection('user_responses').insertOne({
        clerkUserId: userId,
        question: `Question ${questionId}`,
        answer,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }
}