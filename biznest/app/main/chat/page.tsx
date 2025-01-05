'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import gsap from 'gsap';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    gsap.from('.chat-animation', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([
      ...messages,
      { type: 'user', content: input },
    ]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { type: 'bot', content: 'Thank you for your message. Our team will assist you shortly.' },
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[calc(100vh-8rem)]">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold">Biz Nest Помощник</h1>
            <p className="text-sm text-gray-500">Ask me anything about our programs and services</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 chat-animation ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}