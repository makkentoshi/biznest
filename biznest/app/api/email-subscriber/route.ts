import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function POST(req: Request) {
  const { email } = await req.json();

  await connectToDatabase();

  try {
    const subscriber = await Subscriber.create({ email });
    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add subscriber' }, { status: 500 });
  }
}

