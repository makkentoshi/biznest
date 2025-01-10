import { Bot } from 'lucide-react';
import Image from 'next/image';

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BizNest AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Главная</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Цены</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Новости</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Функции</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Контакты</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Попробовать бесплатно
            </button>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              AI-powered ассистент продаж
            </span>
            <h1 className="text-9xl font-bold text-gray-900 mb-6">
              BizNest AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ваш AI-powered ассистент продаж! Интегрируйте BizNest AI на любой сайт с помощью простого фрагмента кода!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Начать бесплатно
            </button>
          </div>

          {/* Изображение чата */}
          <div className="relative max-w-lg mx-auto">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-100">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-600"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Менеджер - Анна П.</p>
                    <p className="text-xs text-gray-500">BizNest AI</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex-1 bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">Здравствуйте! Как я могу помочь вам сегодня?</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="flex-1 bg-blue-600 rounded-lg p-3 ml-12">
                    <p className="text-sm text-white">Хочу узнать больше о ваших услугах</p>
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
    </div>
  );
}