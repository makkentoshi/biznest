"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import TelegramHeader from "./_components/TelegramHeader";

export default function CreateBotPage() {
  const [botName, setBotName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [triggerWords, setTriggerWords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateBot = async () => {
    setIsLoading(true);

    // Отправка данных на сервер для создания бота
    const response = await fetch("/api/create-tg-bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botName,
        prompt,
        triggerWords,
      }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (data.success) {
      // Редирект на страницу управления ботом
      router.push("/biznest-ai/biznest-tool");
    } else {
      alert("Ошибка при создании бота");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <TelegramHeader />
      <div className="mx-auto max-w-5xl px-2 py-[10rem]">
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-2xl font-medium text-transparent">
            Создать ИИ-бота
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Настройте поведение и ответы вашего Telegram-бота
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Имя бота"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
          />
          <Textarea
            placeholder="Промпт бота (например, 'Отвечай как поддержка магазина')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Input
            placeholder="Триггерные слова (через запятую)"
            value={triggerWords}
            onChange={(e) => setTriggerWords(e.target.value)}
          />
          <Button onClick={handleCreateBot} disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать бота"}
          </Button>
        </div>
      </div>
    </main>
  );
}
