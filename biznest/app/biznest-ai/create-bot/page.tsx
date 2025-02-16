"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Bots } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Bot, Zap } from "lucide-react";
import Hero from "./_components/Hero";
import TutorialVideo from "./_components/TutorialVideo";
import TelegramHeader from "./_components/TelegramHeader";

function CreateBot({}) {
  const [bots, setBots] = useState([]);
  const [botName, setBotName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [triggerWords, setTriggerWords] = useState("");
  const [botToken, setBotToken] = useState("");

  const { user } = useUser();

  /**
   * Used to Create New Telegram Bot
   */

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const bots = await db.select().from(Bots);
    setBots(bots);
  };

  const onCreateBot = async () => {
    if (!botName || !botToken) {
      toast("Please enter all fields!");
      return;
    }

    try {
      const result = await db
        .insert(Bots)
        .values({
          userId: user?.primaryEmailAddress?.emailAddress ?? "Unknown", // Исправлено!
          botToken: botToken, // Исправлено!
          prompt: prompt || "Вы - полезный ассистент.", // Значение по умолчанию
          triggerWords: Array.isArray(triggerWords) ? triggerWords : [], // Гарантия массива
          isAIEnabled: true, // По умолчанию true
        })
        .returning({ insertedId: Bots.id });

      if (result) {
        refreshData();
        toast("New Telegram Bot Created!");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      toast("Failed to create bot!");
    }
  };

  return (
    <>
    <TelegramHeader></TelegramHeader>
      <Hero></Hero>
      <TutorialVideo></TutorialVideo>

      <div className="bg-white py-24 flex justify-center text-center">
        <div className="max-w-4xl mx-auto text-center flex flex-col ">
          <h2 className="text-3xl font-bold mb-8">
            Create your own Telegram bot right now!
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white py-4 px-8 rounded-xl text-lg font-medium flex items-center justify-center gap-2"
              >
                Create
                <Zap size={20} />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl mx-auto p-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
              >
                <DialogHeader className="p-0">
                  <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                        className="p-4 bg-black rounded-2xl"
                      >
                        <Bot size={32} className="text-white" />
                      </motion.div>
                    </div>
                    <DialogTitle className="text-3xl font-bold text-black mb-4">
                      Create Your Bot
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill in the details below to create your custom Telegram
                      bot
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bot Name
                    </label>
                    <Input
                      placeholder="Bot Name"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bot Token
                    </label>
                    <Input
                      placeholder="Bot Token"
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trigger Words (comma separated)
                    </label>
                    <Input
                      placeholder="Trigger Words (comma separated)"
                      value={triggerWords}
                      onChange={(e) => setTriggerWords(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prompt (e.g., 'Act as a store support bot')
                    </label>
                    <textarea
                      placeholder="Prompt (e.g., 'Act as a store support bot')"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition"
                      rows={4}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onCreateBot}
                    className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    Create Bot
                    <Zap size={20} />
                  </motion.button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default CreateBot;
