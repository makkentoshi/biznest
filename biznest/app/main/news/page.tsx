"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  TrendingUp,
  Users,
  ChevronRight,
  Clock,
  Star,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: <Calendar className="w-5 h-5" />, label: "Мероприятия" },
  { icon: <Users className="w-5 h-5" />, label: "Истории бизнесменов" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Аналитика" },
];

const newsItems = [
  {
    category: "Мероприятия",
    title: "AI Conference 2024: Будущее искусственного интеллекта",
    excerpt:
      "Ведущие эксперты обсудят последние тренды в развитии ИИ и его влияние на бизнес",
    date: "2 часа назад",
    emoji: "📱",
    image:
      "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Истории бизнесменов",
    title: "От стартапа к успеху: история развития AI-платформы",
    excerpt: "Как небольшая команда создала революционный продукт в сфере ИИ",
    date: "5 часов назад",
    emoji: "💼",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Аналитика",
    title: "Тренды развития AI в 2024 году",
    excerpt: "Анализ ключевых направлений развития искусственного интеллекта",
    date: "1 день назад",
    emoji: "📊",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Мероприятия");
  const newsRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".news-card");

      cards.forEach((card: any, index: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        });
      });
    },
    { scope: newsRef }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Metallic Header */}
      <div className="   top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            Новости
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Clock className="w-4 h-4 mr-2" />
              Последние новости
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Star className="w-4 h-4 mr-2" />
              Популярное
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-gray-200/50">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Категории</h2>
                <p className="text-sm text-gray-500">
                  Выберите интересующий раздел
                </p>
              </div>
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => setActiveCategory(item.label)}
                    className={cn(
                      "w-full justify-start gap-3 h-12 rounded-2xl transition-all duration-300",
                      item.label === activeCategory && "bg-gray-100/50"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8" ref={newsRef}>
            {newsItems.map((item, index) => (
              <Card
                key={index}
                className="news-card overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-xl border-gray-200/50"
              >
                <div className="flex">
                  <div className="w-1/3">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-sm font-medium text-gray-500">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-400 ml-auto flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 hover:text-gray-600 cursor-pointer transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        className="rounded-full hover:bg-gray-100"
                      >
                        Читать далее
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
