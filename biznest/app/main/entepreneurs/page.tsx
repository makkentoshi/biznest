"use client";

import { useState } from "react";
import {
  Bot,
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  Building2,
  History,
  Quote,
  Award,
  Briefcase,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Entrepreneur {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  region: "KZ" | "WORLD";
  netWorth: string;
  companies: string[];
  industry: string;
  description: string;
  businessModel: string;
  books: { title: string; year: string; description: string }[];
  advice: string[];
  lifeHistory: string;
  businessHistory: string;
  achievements: string[];
  gallery: string[];
}

const entrepreneurs: Entrepreneur[] = [
  {
    id: "1",
    name: "Тимур Кулибаев",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070&h=600",
    region: "KZ",
    netWorth: "$2.9B",
    companies: ["Halyk Bank", "KazEnergy"],
    industry: "Банкинг, Энергетика",
    description:
      "Казахстанский бизнесмен и председатель Национальной палаты предпринимателей Казахстана",
    businessModel:
      "Диверсифицированные инвестиции в банковский и энергетический секторы, фокусируясь на стратегических приобретениях и устойчивом росте. Использование синергии между финансовыми услугами и операциями в энергетическом секторе.",
    books: [
      {
        title: "Путь к лидерству",
        year: "2018",
        description:
          "Комплексное руководство по бизнес-лидерству на развивающихся рынках",
      },
    ],
    advice: [
      "Фокусируйтесь на стратегических секторах",
      "Стройте сильные партнерства",
      "Инвестируйте в человеческий капитал",
      "Думайте долгосрочно",
      "Поддерживайте сильное корпоративное управление",
    ],
    lifeHistory:
      "Родился в Алматы, окончил с отличием Московский государственный университет по специальности экономика. Начал карьеру в банковском секторе, позже расширился на энергетику и другие стратегические отрасли...",
    businessHistory:
      "Начал карьеру в банковском секторе, позже расширился на энергетику. Руководил крупными приобретениями и преобразовал традиционные бизнесы в современные корпорации...",
    achievements: [
      "Председатель Национальной палаты предпринимателей Казахстана",
      "Успешно провел Halyk Bank через несколько экономических циклов",
      "Пионер модернизации энергетического сектора Казахстана",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=600&h=400",
    ],
  },
  {
    id: "2",
    name: "Илон Маск",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage:
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=2070&h=600",
    region: "WORLD",
    netWorth: "$234B",
    companies: ["Tesla", "SpaceX", "X", "Neuralink"],
    industry: "Технологии, Космос, Автомобилестроение",
    description:
      "Предприниматель, известный созданием Tesla, SpaceX и других инновационных компаний",
    businessModel:
      "Изменение традиционных отраслей через технологии и инновации, фокусируясь на устойчивой энергетике и исследовании космоса",
    books: [
      {
        title: "Илон Маск: Tesla, SpaceX и поиски фантастического будущего",
        year: "2015",
        description:
          "Биография, описывающая путь Маска и его видение будущего",
      },
    ],
    advice: [
      "Думайте с точки зрения физических принципов",
      "Работайте очень усердно",
      "Принимайте взвешенные риски",
      "Фокусируйтесь на сигнале, а не на шуме",
      "Оптимизируйте для максимального воздействия",
    ],
    lifeHistory:
      "Родился в Претории, Южная Африка. Проявил ранний интерес к компьютерам и технологиям. Переехал в Северную Америку для получения образования...",
    businessHistory:
      "Сооснователь X.com, который позже стал PayPal, затем основал SpaceX и инвестировал в Tesla...",
    achievements: [
      "Революционизировал электромобили с Tesla",
      "Сделал многоразовые ракеты реальностью с SpaceX",
      "Пионер коммерческих космических путешествий",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1620812097331-ff636155488f?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1611816055460-618287c870bd?auto=format&fit=crop&q=80&w=600&h=400",
    ],
  },
];

export default function EntrepreneursPage() {
  const [selectedRegion, setSelectedRegion] = useState<"ALL" | "KZ" | "WORLD">(
    "ALL"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntrepreneur, setSelectedEntrepreneur] =
    useState<Entrepreneur | null>(null);

  const filteredEntrepreneurs = entrepreneurs.filter((e) => {
    const matchesRegion =
      selectedRegion === "ALL" || e.region === selectedRegion;
    const matchesSearch = e.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent">
            Предприниматели
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Откройте для себя самых влиятельных бизнес-лидеров мира
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Filters */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Регион
                  </label>
                  <div className="mt-2 space-y-2">
                    <Button
                      variant={selectedRegion === "KZ" ? "default" : "outline"}
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedRegion("KZ")}
                    >
                      🇰🇿 Казахстан
                    </Button>
                    <Button
                      variant={
                        selectedRegion === "WORLD" ? "default" : "outline"
                      }
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedRegion("WORLD")}
                    >
                      🌎 Мир
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Поиск
                  </label>
                  <div className="mt-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Поиск предпринимателей..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEntrepreneurs.map((entrepreneur) => (
                <Card
                  key={entrepreneur.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() => setSelectedEntrepreneur(entrepreneur)}
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={entrepreneur.image}
                        alt={entrepreneur.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {entrepreneur.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {entrepreneur.industry}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {entrepreneur.netWorth}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Entrepreneur Details Modal */}
        {selectedEntrepreneur && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <Card className="max-h-[90vh] w-full max-w-6xl overflow-hidden">
              <div className="relative h-48">
                <img
                  src={selectedEntrepreneur.coverImage}
                  alt="Обложка"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <Button
                  variant="outline"
                  className="absolute right-4 top-4 bg-white/90"
                  onClick={() => setSelectedEntrepreneur(null)}
                >
                  Закрыть
                </Button>
              </div>

              <div className="relative -mt-20 px-8">
                <div className="flex items-end space-x-6">
                  <img
                    src={selectedEntrepreneur.image}
                    alt={selectedEntrepreneur.name}
                    className="h-32 w-32 rounded-xl border-4 border-white object-cover shadow-lg"
                  />
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white">
                      {selectedEntrepreneur.name}
                    </h2>
                    <p className="text-gray-800">
                      {selectedEntrepreneur.industry}
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="h-[calc(90vh-16rem)] px-8 py-6">
                <Tabs defaultValue="overview" className="space-y-8">
                  <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 p-1">
                    <TabsTrigger
                      value="overview"
                      className="rounded-md px-3 py-1"
                    >
                      Обзор
                    </TabsTrigger>
                    <TabsTrigger
                      value="business"
                      className="rounded-md px-3 py-1"
                    >
                      Бизнес-модель
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="rounded-md px-3 py-1"
                    >
                      История
                    </TabsTrigger>
                    <TabsTrigger
                      value="advice"
                      className="rounded-md px-3 py-1"
                    >
                      Книги и советы
                    </TabsTrigger>
                    <TabsTrigger
                      value="gallery"
                      className="rounded-md px-3 py-1"
                    >
                      Галерея
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="p-6">
                        <h3 className="flex items-center text-lg font-medium">
                          <Building2 className="mr-2 h-5 w-5 text-gray-500" />
                          Компании
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {selectedEntrepreneur.companies.map(
                            (company, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-3 text-gray-600"
                              >
                                <Briefcase className="h-4 w-4" />
                                <span>{company}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </Card>

                      <Card className="p-6">
                        <h3 className="flex items-center text-lg font-medium">
                          <Award className="mr-2 h-5 w-5 text-gray-500" />
                          Достижения
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {selectedEntrepreneur.achievements.map(
                            (achievement, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-3 text-gray-600"
                              >
                                <div className="h-2 w-2 rounded-full bg-gray-400" />
                                <span>{achievement}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </Card>

                      <Card className="p-6">
                        <h3 className="flex items-center text-lg font-medium">
                          <TrendingUp className="mr-2 h-5 w-5 text-gray-500" />
                          Состояние
                        </h3>
                        <p className="mt-4 text-2xl font-bold text-gray-900">
                          {selectedEntrepreneur.netWorth}
                        </p>
                      </Card>

                      <Card className="p-6">
                        <h3 className="flex items-center text-lg font-medium">
                          <Globe2 className="mr-2 h-5 w-5 text-gray-500" />
                          Регион
                        </h3>
                        <p className="mt-4 text-xl">
                          {selectedEntrepreneur.region === "KZ"
                            ? "🇰🇿 Казахстан"
                            : "🌎 Мир"}
                        </p>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="business">
                    <Card className="p-6">
                      <h3 className="mb-4 text-xl font-medium">
                        Бизнес-стратегия
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedEntrepreneur.businessModel}
                      </p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="flex items-center text-lg font-medium">
                        <History className="mr-2 h-5 w-5 text-gray-500" />
                        Жизненный путь
                      </h3>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {selectedEntrepreneur.lifeHistory}
                      </p>
                    </Card>

                    <Card className="p-6">
                      <h3 className="flex items-center text-lg font-medium">
                        <Building2 className="mr-2 h-5 w-5 text-gray-500" />
                        Бизнес-путь
                      </h3>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {selectedEntrepreneur.businessHistory}
                      </p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advice" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="flex items-center text-lg font-medium">
                        <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                        Опубликованные книги
                      </h3>
                      <div className="mt-4 space-y-4">
                        {selectedEntrepreneur.books.map((book, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-100 pb-4 last:border-0"
                          >
                            <h4 className="font-medium text-gray-900">
                              {book.title} ({book.year})
                            </h4>
                            <p className="mt-2 text-gray-600">
                              {book.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="flex items-center text-lg font-medium">
                        <Quote className="mr-2 h-5 w-5 text-gray-500" />
                        Ключевые советы
                      </h3>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {selectedEntrepreneur.advice.map((advice, index) => (
                          <div
                            key={index}
                            className="rounded-lg bg-gray-50 p-4"
                          >
                            <p className="text-gray-600">{advice}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="gallery">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {selectedEntrepreneur.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video overflow-hidden rounded-lg"
                        >
                          <img
                            src={image}
                            alt={`Галерея ${index + 1}`}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}