import { Bot, Search, Keyboard } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeHeader from "@/components/biznest-ai-page/header";

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHeader></HomeHeader>
      {/* Основной контент */}
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium mb-4">
              AI-powered ассистент
            </span>
            <h1 className="text-9xl font-bold text-gray-900 mb-6">
              BizNest AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ваш AI-powered ассистент! Создавайте, планируйте и реализуйте
              вместе с BizNest AI!
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors">
              <Link href={"/biznest-ai/chat"}>Начать бесплатно</Link>
            </button>
          </div>

          {/* Изображение чата */}
          <div className="relative max-w-lg mx-auto">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-100">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-800"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Чат-бот</p>
                    <p className="text-xs text-gray-500">BizNest AI</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex-1 bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      Здравствуйте! Как я могу помочь вам сегодня?
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="flex-1 bg-black rounded-lg p-3 ml-12">
                    <p className="text-sm text-white">
                      Что мне нужно сделать для создания бизнеса?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Декоративные элементы */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300 rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>
      </main>

      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Минималистичный,
            <br />
            AI-ассистент.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Наш AI-ассистент — это минималистичный и мощный инструмент, который
            помогает вам легко получать ответы.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button size="lg">Начать</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                Узнать больше
              </Button>
            </Link>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-10">Ощутите мощь:</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 rounded-lg border bg-card">
                <Bot className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-ответы</h3>
                <p className="text-muted-foreground">
                  Получайте интеллектуальные ответы благодаря нашей продвинутой
                  AI-системе.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <Search className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Умный поиск</h3>
                <p className="text-muted-foreground">
                  Быстро находите предыдущие диалоги с помощью мощной функции
                  поиска.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <Keyboard className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Горячие клавиши</h3>
                <p className="text-muted-foreground">
                  Эффективно управляйте с помощью интуитивных горячих клавиш.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
