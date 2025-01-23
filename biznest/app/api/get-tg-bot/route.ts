import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Fetching bot data...");

    // Подключаемся к базе данных
    const client = await connectToDatabase();
    const db = client.db("mydb");

    // Получаем данные бота
    const bot = await db.collection("bots").findOne({});
    console.log("Bot data fetched successfully:", bot);

    return NextResponse.json({ success: true, bot });
  } catch (error) {
    console.error("Error fetching bot data:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении данных бота" },
      { status: 500 }
    );
  }
}