import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId } = auth(); // Получаем ID пользователя из Clerk
  const { questionId, answers } = await req.json(); // Получаем данные из запроса

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Сохраняем ответы в базу данных
    const response = await prisma.userResponse.create({
      data: {
        userId,
        questionId,
        answers: answers.join(', '), // Сохраняем ответы как строку
      },
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }
}