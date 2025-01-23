import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    // Получаем токен бота из MongoDB
    const client = await connectToDatabase();
    const db = client.db("mydb");
    const bot = await db.collection("bots").findOne({});

    if (bot) {
      const botInstance = new TelegramBot(bot.botToken);

      // Обработка сообщения (например, через OpenAI)
      const response = await fetch("http://localhost:3000/api/handle-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          message: text,
        }),
      });

      const data = await response.json();
      if (data.reply) {
        // Отправляем ответ пользователю
        await botInstance.sendMessage(chatId, data.reply);
      }
    }
  }

  return NextResponse.json({ success: true });
}