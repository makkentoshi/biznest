"use client";

import { useState } from "react";
import { Bot, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import { Input } from "./input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message. I'll help you with that!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`
          w-[380px] bg-white shadow-2xl transition-all duration-300
          ${isMinimized ? 'h-[60px]' : 'h-[600px]'}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-gray-700" />
              <span className="font-medium text-gray-900">Support Chat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4 text-gray-500" />
                ) : (
                  <Minimize2 className="h-4 w-4 text-gray-500" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <ScrollArea className="flex-1 p-4 h-[480px]">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-lg px-4 py-2
                          ${
                            msg.sender === "user"
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-900"
                          }
                        `}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="mt-1 text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}