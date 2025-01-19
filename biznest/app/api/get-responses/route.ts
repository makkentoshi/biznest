import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  const { userId } = await auth(); // Получаем ID пользователя из Clerk

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await connectToDatabase();
  const db = client.db("mydb"); // Замените 'mydb' на имя вашей базы данных

  try {
    // Получаем все ответы пользователя
    const responses = await db
      .collection("user_responses")
      .find({ clerkUserId: userId })
      .toArray();

    return NextResponse.json({ success: true, responses });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch responses" },
      { status: 500 }
    );
  }
}
