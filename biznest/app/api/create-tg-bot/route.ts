import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    console.log("Creating new bot...");

    // Подключаемся к базе данных
    const client = await connectToDatabase();
    const db = client.db("mydb");

    // Получаем данные из запроса
    const { botName, prompt, triggerWords } = await request.json();

    // Создаем нового бота
    const newBot = {
      botName,
      prompt,
      triggerWords: triggerWords.split(",").map((word) => word.trim()),
      isAIEnabled: true,
      createdAt: new Date(),
    };

    // Сохраняем бота в MongoDB
    const result = await db.collection("bots").insertOne(newBot);
    console.log("Bot created successfully:", result);

    return NextResponse.json({ success: true, botId: result.insertedId });
  } catch (error) {
    console.error("Error creating bot:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка при создании бота" },
      { status: 500 }
    );
  }
}