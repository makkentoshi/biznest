'use client';

import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const news = [
  {
    title: 'Tech Hub and AI Innovation Center Partnership',
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    description: 'Strategic partnership to advance AI development in Kazakhstan',
  },
  {
    title: 'Startup Success Story: Local Fintech Raises $5M',
    date: 'March 8, 2024',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
    description: 'Tech Hub graduate company secures major investment',
  },
  {
    title: 'New Educational Programs Launch',
    date: 'March 5, 2024',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    description: 'Expanding opportunities for tech education',
  },
];

export default function NewsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.news-card', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section className="py-8" ref={containerRef}>
      <h2 className="text-2xl font-semibold mb-6">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <Card key={index} className="news-card overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                {item.date}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}