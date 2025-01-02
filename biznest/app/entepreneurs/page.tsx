'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, DollarSign, Quote, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const entrepreneurs = [
  {
    id: 1,
    name: 'Михаил Ломтадзе',
    company: 'Kaspi.kz',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    books: ['Digital Banking Revolution'],
    quotes: ['Технологии должны делать жизнь людей проще'],
    business: 'Финтех, Электронная коммерция',
    margin: '45%',
    advice: 'Фокусируйтесь на потребностях клиента и постоянно улучшайте сервис',
  },
  {
    id: 2,
    name: 'Нурлан Смагулов',
    company: 'Astana Group',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    books: ['Путь к успеху в ритейле'],
    quotes: ['Бизнес - это марафон, а не спринт'],
    business: 'Ритейл, Недвижимость',
    margin: '30%',
    advice: 'Диверсификация бизнеса - ключ к устойчивому росту',
  },
  // Add more entrepreneurs...
];

export default function EntrepreneursPage() {
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState(entrepreneurs[0]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Top Entrepreneurs of Kazakhstan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            key={selectedEntrepreneur.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={selectedEntrepreneur.image}
                  alt={selectedEntrepreneur.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold">{selectedEntrepreneur.name}</h2>
                  <p className="text-gray-600">{selectedEntrepreneur.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Book className="h-5 w-5" />
                    <h3>Key Books</h3>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedEntrepreneur.books.map((book, index) => (
                      <li key={index}>{book}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Quote className="h-5 w-5" />
                    <h3>Notable Quotes</h3>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedEntrepreneur.quotes.map((quote, index) => (
                      <li key={index}>{quote}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Briefcase className="h-5 w-5" />
                    <h3>Business Type</h3>
                  </div>
                  <p className="text-gray-600">{selectedEntrepreneur.business}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <DollarSign className="h-5 w-5" />
                    <h3>Margin</h3>
                  </div>
                  <p className="text-gray-600">{selectedEntrepreneur.margin}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Business Advice</h3>
                <p className="text-gray-600">{selectedEntrepreneur.advice}</p>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-4">
          {entrepreneurs.map((entrepreneur) => (
            <Button
              key={entrepreneur.id}
              variant={selectedEntrepreneur.id === entrepreneur.id ? 'default' : 'outline'}
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => setSelectedEntrepreneur(entrepreneur)}
            >
              <div>
                <div className="font-semibold">{entrepreneur.name}</div>
                <div className="text-sm text-gray-500">{entrepreneur.company}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}