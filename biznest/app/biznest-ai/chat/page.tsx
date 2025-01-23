"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Loader2, Copy, Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ChatHeader from "./_components/ChatHeader";

interface Chat {
  _id: string; // Уникальный идентификатор
  title: string; // Название чата
  createdAt?: Date; // Опциональное поле, если оно есть
}

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ type: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState(null); // Активный чат

  // Анимации GSAP
  useGSAP(
    () => {
      gsap.from(".chat-animation", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: chatRef }
  );
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Загрузка истории чатов
  //   useEffect(() => {
  //     const fetchChats = async () => {
  //       try {
  //         const response = await fetch("/api/chat-get-post");
  //         const data = await response.json();
  //         if (Array.isArray(data)) {
  //           setChats(data);
  //         } else {
  //           console.error("Expected an array but got:", data);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching chats:", error);
  //       }
  //     };
  //     fetchChats();
  //   }, []);

  // Создание нового чата

  const handleButtonClick = async (prompt: string) => {
    setInput(prompt); // Устанавливаем промпт в поле ввода
    await handleSend(); // Отправляем промпт
  };

  // Копирование промпта в буфер обмена
  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    alert("Промпт скопирован!");
  };

  // Отправка сообщения
  const handleNewChat = async () => {
    try {
      console.log("Creating new chat...");
      const response = await fetch(
        `${window.location.origin}/api/chat-get-post`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Новый чат" }),
        }
      );
      const newChat = await response.json();
      console.log("New chat created:", newChat);
      setChats([...chats, newChat]);
      setActiveChatId(newChat._id);
      setMessages([]); // Очищаем текущие сообщения
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { type: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Saving user message...");
      // Сохраняем сообщение пользователя в MongoDB
      if (activeChatId) {
        await fetch(
          `${window.location.origin}/api/chat-get-post/${activeChatId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [userMessage] }),
          }
        );
      }

      console.log("Fetching response from OpenAI...");
      // Получаем ответ от DeepSeek
      const response = await fetch(`${window.location.origin}/api/openai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { type: "bot", content: data.reply };

      console.log("Saving bot message...");
      // Сохраняем ответ бота в MongoDB
      if (activeChatId) {
        await fetch(
          `${window.location.origin}/api/chat-get-post/${activeChatId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [botMessage] }),
          }
        );
      }

      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  //   fetch("/api/chat-get-post", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       title: "Тестовый чат",
  //       messages: [{ type: "user", content: "Тест", timestamp: new Date() }],
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  //   // Популярные темы и промпты

  const popularPrompts = [
    {
      title: "Бизнес-план",
      prompt: "Придумай бизнес-план для кафе здорового питания.",
    },
    {
      title: "Маркетинговая стратегия",
      prompt: "Создай маркетинговую стратегию для интернет-магазина.",
    },
    {
      title: "Идеи для стартапа",
      prompt: "Предложи 5 идей для бизнеса в сфере технологий.",
    },
  ];

  return (
    <div className="flex h-screen mt-[5rem]" ref={chatRef}>
      <ChatHeader></ChatHeader>

      {/* Боковая панель */}
      <div className="w-64 bg-gray-50 border-r p-4">
        <Button onClick={handleNewChat} className="w-full mb-4">
          <Plus className="w-4 h-4 mr-2" />
          Новый чат
        </Button>

        {/* История чатов */}
        <div className="space-y-2">
          {chats.map((chat) => (
            <Button
              key={chat._id}
              onClick={() => setActiveChatId(chat._id)}
              variant={activeChatId === chat._id ? "default" : "ghost"}
              className="w-full justify-start"
            >
              {chat.title}
            </Button>
          ))}
        </div>

        {/* Популярные темы */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-2">Популярные темы</h2>
          <div className="space-y-2">
            {popularPrompts.map((item, index) => (
              <div
                key={index}
                className="p-2 bg-white border rounded-lg flex items-center justify-between"
              >
                <span className="text-sm">{item.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyPrompt(item.prompt)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Основной чат */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Заголовок чата */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold">BizNest Помощник</h1>
            <p className="text-sm text-gray-500">
              Спросите меня обо всем, что касается наших программ и услуг
            </p>
          </div>

          {/* Блок сообщений */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ maxHeight: "calc(100vh - 20rem)" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 chat-animation ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Фиксированный блок ввода */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <Card className="p-4 bg-gradient-to-br from-black to-gray-800 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Premium План</h3>
                  <p className="text-sm text-white mb-3">
                    Задавайте столько вопросов, сколько хотите c подпиской
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-black border-white hover:bg-white/90"
                  >
                    Управление Подпиской
                  </Button>
                </div>
              </div>
            </Card>
            <div className="flex space-x-2 my-5">
              <Button
                onClick={() =>
                  handleButtonClick(
                    "Придумай бизнес-план для кафе здорового питания."
                  )
                }
                disabled={isLoading}
              >
                Бизнес-план
              </Button>
              <Button
                onClick={() =>
                  handleButtonClick(
                    "Создай маркетинговую стратегию для интернет-магазина."
                  )
                }
                disabled={isLoading}
              >
                Маркетинг
              </Button>
              <Button
                onClick={() =>
                  handleButtonClick(
                    "Предложи 5 идей для бизнеса в сфере технологий."
                  )
                }
                disabled={isLoading}
              >
                Идеи для бизнеса
              </Button>
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
              <Button onClick={handleSend} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
