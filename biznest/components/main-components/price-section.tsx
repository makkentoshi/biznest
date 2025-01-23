"use client";

import { Bot, MessageSquare, Zap, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

{
  /* Секция с ценами */
}
export default function PriceSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Простая и прозрачная цена
            </h2>
            <p className="text-gray-600">
              Выберите план, который подходит именно вам
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Бесплатный план */}
            <div className="border rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Бесплатный план</h3>
                <p className="text-gray-600">Идеально для начала</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "100 сообщений в месяц",
                  "Базовые функции ИИ",
                  "Поддержка по email",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Начать <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Pro план */}
            <div className="border rounded-2xl p-8 bg-black text-white">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Pro план</h3>
                <p className="text-gray-400">Для продвинутых пользователей</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-400">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Неограниченное количество сообщений",
                  "Продвинутые функции ИИ",
                  "Приоритетная поддержка",
                  "Интеграции по запросу",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-100">
                Начать <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}