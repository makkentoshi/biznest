import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    console.log("Updating bot settings...");

    // Подключаемся к базе данных
    const client = await connectToDatabase();
    const db = client.db("mydb");

    // Получаем данные из запроса
    const { prompt, triggerWords, isAIEnabled } = await request.json();

    // Обновляем настройки бота
    const result = await db.collection("bots").updateOne(
      {},
      {
        $set: {
          prompt,
          triggerWords: triggerWords.split(",").map((word) => word.trim()),
          isAIEnabled,
        },
      }
    );
    console.log("Bot settings updated successfully:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating bot settings:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка при обновлении настроек" },
      { status: 500 }
    );
  }
}