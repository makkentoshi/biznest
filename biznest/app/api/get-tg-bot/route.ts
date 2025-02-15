// api/get-tg-bot/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/utils/dbConfig'; // Your Drizzle database connection
import { Bots } from '@/utils/schema'; // Your table definition
import { eq } from 'drizzle-orm';
import { auth } from "@clerk/nextjs/server";


export async function GET() {
  try {
    console.log("Fetching bot data...");

    // Get User ID from Clerk (or your auth provider)
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Пользователь не авторизован" },
        { status: 401 } // Unauthorized
      );
    }

    // Fetch bot from database
    const bots = await db.select().from(Bots).where(eq(Bots.userId, userId));

    if (bots.length > 0) {
      // Bot exists, return it
      return NextResponse.json({ success: true, bot: bots[0] });
    } else {
      // Bot does not exist, create it
      // You might want to disable the automatic creation, depending on your requirements
      console.log("Bot does not exist for user, creating...");
      return NextResponse.json({
        success: true,
        bot: {
          prompt: '',
          triggerWords: [],
          isAIEnabled: true,
          botToken: '',
        },
      });
    }
  } catch (error) {
    console.error('Error fetching Telegram bot data:', error);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении данных бота", details: error }, // Include error details for debugging
      { status: 500 }
    );
  }
}