// api/update-tg-bot/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/utils/dbConfig';
import { Bots } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { getAuth } from "@clerk/nextjs/server"; // Import getAuth from the server-side module

export async function POST(req: Request) {
    try {
        console.log("Updating bot data...");

        const { prompt, triggerWords, isAIEnabled, botToken } = await req.json();

        // Get User ID from Clerk using getAuth
        const authResult = await getAuth(req);
        const userId = authResult.userId;

        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Пользователь не авторизован" },
                { status: 401 } // Unauthorized
            );
        }

        // Check if a bot already exists for the user
        const existingBots = await db.select().from(Bots).where(eq(Bots.userId, userId));

        if (existingBots.length > 0) {
            // Update existing bot
            await db
                .update(Bots)
                .set({
                    prompt: prompt,
                    triggerWords: triggerWords,
                    isAIEnabled: isAIEnabled,
                    botToken: botToken,
                })
                .where(eq(Bots.userId, userId));

            console.log("Telegram bot settings updated successfully");
            return NextResponse.json({ success: true, message: "Telegram bot settings updated successfully" });

        } else {
            // Create new bot
            await db.insert(Bots).values({
                userId: userId,
                prompt: prompt,
                triggerWords: triggerWords,
                isAIEnabled: isAIEnabled,
                botToken: botToken,
            });
            console.log("Telegram bot settings created successfully");
            return NextResponse.json({ success: true, message: "Telegram bot settings created successfully" });
        }

    } catch (error) {
        console.error("Error updating Telegram bot settings:", error);
        return NextResponse.json(
            { success: false, error: "Ошибка при обновлении данных бота", details: error },
            { status: 500 }
        );
    }
}