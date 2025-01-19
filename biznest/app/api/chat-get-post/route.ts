import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

// Получение списка чатов
export async function GET() {
  try {
    console.log("Fetching chats...");

    // Подключаемся к базе данных
    const client = await connectToDatabase();
    const db = client.db('mydb'); // Указываем базу данных mydb

    // Получаем список чатов
    const chats = await db.collection('chats').find().sort({ createdAt: -1 }).toArray();
    console.log("Chats fetched successfully:", chats);

    return NextResponse.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}

// Создание нового чата
export async function POST(request: Request) {
  try {
    console.log("Creating new chat...");

    // Подключаемся к базе данных
    const client = await connectToDatabase();
    const db = client.db('mydb'); // Указываем базу данных mydb

    // Получаем данные из запроса
    const { title } = await request.json();

    // Создаем новый чат
    const newChat = {
      title,
      createdAt: new Date(),
    };

    // Сохраняем чат в MongoDB
    const result = await db.collection('chats').insertOne(newChat);
    console.log("Chat created successfully:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}