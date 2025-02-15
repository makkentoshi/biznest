"use client";

import { useState, useEffect } from "react";
import { Bot, Power, MessageSquare, Zap, PlayCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import TelegramHeader from "./_components/TelegramHeader";

export default function TelegramBotPage() {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [triggerWords, setTriggerWords] = useState("");
  const [botToken, setBotToken] = useState(""); // Add botToken state

  // Загрузка данных бота при открытии страницы
  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const response = await fetch("/api/get-tg-bot"); // Updated route
        if (!response.ok) {
          console.error("Failed to fetch bot data:", response.status);
          return;
        }
        const data = await response.json();

        if (data.success) {
          setPrompt(data.bot.prompt);
          setTriggerWords(data.bot.triggerWords.join(", "));
          setIsAIEnabled(data.bot.isAIEnabled);
          setBotToken(data.bot.botToken); // Assuming botToken is returned
        }
      } catch (error) {
        console.error("Error fetching bot data:", error);
      }
    };

    fetchBotData();
  }, []);

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/update-tg-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          triggerWords,
          isAIEnabled,
          botToken,
        }),
      });

      console.log(
        "Received request data:",
        JSON.stringify({
          prompt,
          triggerWords,
          isAIEnabled,
          botToken,
        })
      );

      if (!response.ok) {
        console.error("Failed to save settings:", response.status);
        alert("Ошибка при сохранении настроек");
        return;
      }
      const data = await response.json();
      if (data.success) {
        alert("Настройки сохранены!");
      } else {
        alert("Ошибка при сохранении настроек");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Ошибка при сохранении настроек");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <TelegramHeader />
      <div className="mx-auto max-w-5xl px-2 py-[10rem]">
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-2xl font-medium text-transparent">
            Управление ИИ-ботом
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Настройте поведение и ответы вашего Telegram-бота
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Панель конфигурации */}
          <Card className="md:col-span-3">
            <div className="space-y-4 p-4">
              {/* Bot Token */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <Bot className="h-4 w-4 text-gray-500" />
                  <span>Telegram Bot Token</span>
                </label>
                <Input
                  placeholder="Enter your bot token from BotFather"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="border-gray-200 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-200"
                />
              </div>

              {/* Переключатель ИИ */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-2">
                  <Power className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">ИИ-ассистент</span>
                </div>
                <Switch
                  checked={isAIEnabled}
                  onCheckedChange={setIsAIEnabled}
                  className="h-4 w-8"
                />
              </div>

              {/* Настройка промпта */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span>Промпт бота</span>
                </label>
                <Textarea
                  placeholder="Например, Отвечайте как поддержка магазина..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-24 resize-none border-gray-200 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-200"
                />
              </div>

              {/* Триггерные слова */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <Zap className="h-4 w-4 text-gray-500" />
                  <span>Триггерные слова</span>
                </label>
                <Input
                  placeholder="цена, доставка, поддержка"
                  value={triggerWords}
                  onChange={(e) => setTriggerWords(e.target.value)}
                  className="border-gray-200 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-200"
                />
              </div>

              <Button
                onClick={handleSaveSettings}
                className="h-8 w-full bg-gray-900 text-sm hover:bg-gray-800"
              >
                Сохранить настройки
              </Button>
            </div>
          </Card>

          {/* Панель предпросмотра */}
          <Card className="relative md:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
            <div className="relative h-full p-4">
              <div className="mb-4 flex items-center space-x-2">
                <Bot className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Предпросмотр
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-100 bg-white p-3">
                  <p className="text-sm text-gray-600">
                    {prompt || "Настройте поведение вашего бота..."}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-gray-500">
                    Триггерные слова:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {triggerWords.split(",").map(
                      (word, index) =>
                        word.trim() && (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                          >
                            {word.trim()}
                          </span>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
