"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Bot, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const robotRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      // Анимация контента
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Анимация плавающего робота
      gsap.to(robotRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: contentRef }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white pt-20 pb-12 relative overflow-hidden rounded-t-xl">
      {/* Фоновое свечение */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-500/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4">
        <div ref={contentRef} className="relative z-10">
          {/* Основной контент */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <Bot className="w-4 h-4 text-indigo-100/10" />
              <span className="text-sm">Чат-бот с искусственным интеллектом</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-100/20 via-white to-gray-100/30 text-transparent bg-clip-text">
              Ощутите будущее
              <br />
              поддержки клиентов
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Преобразуйте ваше обслуживание клиентов с помощью нашего чат-бота.
              Мгновенные ответы, доступность 24/7 и взаимодействие, похожее на человеческое.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gray-500/30 hover:bg-gray-800/30 h-12 px-8"
              >
                Попробовать
              </Button>
              <Button
                size="lg"
                className="h-12 px-8 border-purple-500/50 hover:bg-gray-800/30"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Анимированный робот */}
          <div
            ref={robotRef}
            className="absolute top-20 right-0 w-72 h-72 pointer-events-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gray-500/30 rounded-full filter blur-3xl" />
              <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
                <circle cx="100" cy="60" r="30" className="fill-gray-600" />{" "}
                {/* Голова */}
                <rect
                  x="70"
                  y="90"
                  width="60"
                  height="80"
                  rx="20"
                  className="fill-gray-600"
                />{" "}
                {/* Тело */}
                <circle cx="85" cy="50" r="8" className="fill-white" />{" "}
                {/* Левый глаз */}
                <circle cx="115" cy="50" r="8" className="fill-white" />{" "}
                {/* Правый глаз */}
                <rect
                  x="40"
                  y="100"
                  width="20"
                  height="60"
                  rx="10"
                  className="fill-gray-400"
                />{" "}
                {/* Левая рука */}
                <rect
                  x="140"
                  y="100"
                  width="20"
                  height="60"
                  rx="10"
                  className="fill-gray-400"
                />{" "}
                {/* Правая рука */}
                <rect
                  x="75"
                  y="170"
                  width="20"
                  height="30"
                  rx="8"
                  className="fill-gray-700"
                />{" "}
                {/* Левая нога */}
                <rect
                  x="105"
                  y="170"
                  width="20"
                  height="30"
                  rx="8"
                  className="fill-gray-700"
                />{" "}
                {/* Правая нога */}
              </svg>
            </div>
          </div>

          {/* Тарифные планы */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-32">
            {/* Бесплатный план */}
            <Card className="bg-white/5 border-gray-500/20 backdrop-blur-sm p-8 rounded-2xl hover:border-gray-500/50 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Бесплатный план</h3>
                <p className="text-gray-200">Идеально для начала</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-300">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "100 сообщений в месяц",
                  "Базовые ответы ИИ",
                  "Стандартная поддержка",
                  "Интеграция с одним сайтом",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-gray-500/50 hover:bg-gray-500/10"
              >
                Начать <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Pro план */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-950 border-gray-500 backdrop-blur-sm p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-500 text-white px-4 py-1 text-sm rounded-bl-lg">
                Популярный
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Pro план</h3>
                <p className="text-gray-200">Для растущего бизнеса</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$20</span>
                <span className="text-gray-300">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Неограниченное количество сообщений",
                  "Продвинутый ИИ с учетом контекста",
                  "Приоритетная поддержка 24/7",
                  "Интеграция с несколькими сайтами",
                  "Кастомизация брендинга",
                  "Аналитическая панель",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gray-500/30 hover:bg-gray-800/30">
                Перейти на Pro <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}