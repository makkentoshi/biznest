// api/telegram/route.ts
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";
import { db } from "@/utils/dbConfig"; // Your Drizzle database connection
import { Gemini } from "../gemini/route"; // Corrected path to Gemini API handler
import { Incomes, Bots } from "@/utils/schema"; // Import table definitions from schema
import { eq } from "drizzle-orm";
import fetch from "node-fetch";

// Global to store bot instances (for hot-reloading purposes)
const telegramBots: { [key: string]: Telegraf } = {};

const geminiResponse: {
    amount: string;
    name: string;
} | null




async function setupTelegramBot(botToken: string): Promise<Telegraf | null> {
  if (!botToken) {
    console.error("Telegram Bot Token not provided");
    return null;
  }

  try {
    // Check if the bot instance already exists
    if (telegramBots[botToken]) {
      console.log(`Reusing existing bot instance for token ${botToken}`);
      return telegramBots[botToken];
    }

    const bot = new Telegraf(botToken);

    // Basic Commands
    bot.start((ctx) =>
      ctx.reply("Welcome! Send /help to see the command list.")
    );
    bot.help((ctx) => ctx.reply("Commands: /start, /help, /process_receipt"));
    bot.command("process_receipt", (ctx) => {
      ctx.reply("Please upload a PDF receipt for processing.");
    });

    // Handle document (PDF receipt)
    bot.on("document", async (ctx) => {
      try {
        if (ctx.message.document.mime_type === "application/pdf") {
          const fileId = ctx.message.document.file_id;
          const fileLink = await bot.telegram.getFileLink(fileId);

          // Download the PDF (you might need to use a library like 'node-fetch' or 'axios')
          const response = await fetch(fileLink.toString());
          if (!response.ok) {
            console.error(
              "Failed to download PDF:",
              response.status,
              response.statusText
            );
            return ctx.reply(
              "Failed to download the receipt. Please try again."
            );
          }
          const buffer = await response.arrayBuffer();

          // Process the PDF using Gemini
          const geminiResponse = await Gemini.processReceipt(
            Buffer.from(buffer)
          );
          const amount = parseFloat(geminiResponse.amount);
          if (isNaN(amount)) {
            console.error("Invalid amount:", geminiResponse.amount);
            return ctx.reply("Invalid receipt amount detected.");
          }

          if (geminiResponse && geminiResponse.amount && geminiResponse.name) {
            // Save the processed data to NeonDB
            try {
              const result = await db
                .insert(Incomes)
                .values({
                  name: geminiResponse.name,
                  amount: parseFloat(geminiResponse.amount),
                  createdby: ctx.from?.username || "telegram_user",
                  icon: "receipt",
                })
                .returning({ insertedId: Incomes.id });

              if (result) {
                ctx.reply(
                  `Receipt processed successfully! Amount: ${geminiResponse.amount}, Name: ${geminiResponse.name}`
                );
              } else {
                ctx.reply("Failed to save the data to the database.");
              }
            } catch (dbError: any) {
              console.error("Database error:", dbError);
              ctx.reply(
                "An error occurred while saving the data. Please contact support."
              );
            }
          } else {
            ctx.reply(
              "Could not extract the required information from the receipt."
            );
          }
        } else {
          ctx.reply("Please upload a PDF file.");
        }
      } catch (error: any) {
        console.error("Error processing receipt:", error);
        ctx.reply(
          "An error occurred while processing the receipt. Please try again."
        );
      }
    });

    // Handle text messages
    bot.on("text", async (ctx) => {
      try {
        // Assuming you have user authentication and can get the userId from the session
        const userId = ctx.from?.id.toString(); // Replace with actual user ID retrieval logic

        // Fetch bot settings from the database
        const existingBot = await db
          .select()
          .from(Bots)
          .where(eq(Bots.botToken, botToken));

        if (!existingBot.length) {
          return null; // Бот не найден в БД
        }

        if (existingBots.length > 0) {
          const telegramBot = existingBots[0];
          if (telegramBot.isAIEnabled) {
            // Use the prompt from the database
            const prompt = telegramBot.prompt || "You are a helpful assistant.";
            const triggerWords = telegramBot.triggerWords
              ? telegramBot.triggerWords.split(",")
              : [];

            // Check for trigger words
            const messageText = ctx.message.text.toLowerCase();
            const shouldRespond = triggerWords.some((word) =>
              messageText.includes(word.trim().toLowerCase())
            );

            if (shouldRespond) {
              // Process the message using Gemini
              const geminiResponse = await Gemini.generateContent(
                prompt + ctx.message.text
              );
              if (geminiResponse) {
                ctx.reply(geminiResponse);
              } else {
                ctx.reply(
                  "Sorry, I could not process your request at this time."
                );
              }
            } else {
              ctx.reply(
                "I am not configured to respond to this type of message."
              );
            }
          } else {
            ctx.reply("AI assistant is disabled.");
          }
        } else {
          ctx.reply("Bot settings not found. Please configure your bot.");
        }
      } catch (error: any) {
        console.error("Error processing text message:", error);
        ctx.reply(
          "An error occurred while processing the message. Please try again."
        );
      }
    });

    // Store the bot instance
    telegramBots[botToken] = bot;
    try {
      bot.startPolling(); // use long polling
      // const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/telegram/route?botToken=${botToken}`;
      // await bot.telegram.setWebhook(webhookUrl);
    } catch (webhookError) {
      console.error("Webhook error:", webhookError);
      // ctx.reply('Failed to set up webhook.');
    }

    return bot;
  } catch (error: any) {
    console.error("Telegram bot setup failed:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const body = await req.json();
    const botToken = body.botToken || searchParams.get('botToken');

    if (!botToken) {
      console.error("Bot Token not provided");
      return NextResponse.json(
        { error: "Bot Token not provided" },
        { status: 400 }
      );
    }

    const bot = await setupTelegramBot(botToken);

    if (bot) {
      try {
        //Manually handle the update

        //await bot.handleUpdate(await req.json());

        return NextResponse.json(
          { message: "Telegram bot setup successfully" },
          { status: 200 }
        );
      } catch (err: any) {
        console.error("Error handling update:", err);
        return NextResponse.json(
          { error: "Error handling update" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Failed to setup telegram bot" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in main POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle Telegram updates
  },
};

export const dynamic = "force-dynamic";
