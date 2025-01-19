import { NextResponse } from 'next/server';
import Chat from '@/models/Chat';
import connectToDatabase from '@/lib/mongodb';

// Подключение к MongoDB
await connectToDatabase();

// Обновление чата (добавление сообщений)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('Updating chat with ID:', params.id);
    const { messages } = await request.json();
    console.log('Messages to add:', messages);

    const chat = await Chat.findByIdAndUpdate(
      params.id,
      { $push: { messages: { $each: messages } } }, // Добавляем новые сообщения
      { new: true }
    );

    if (!chat) {
      console.error('Chat not found with ID:', params.id);
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    console.log('Chat updated successfully:', chat);
    return NextResponse.json(chat);
  } catch (error) {
    console.error('Error updating chat:', error);
    return NextResponse.json(
      { error: 'Failed to update chat' },
      { status: 500 }
    );
  }
}