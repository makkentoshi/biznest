'use client';

import { useRef } from 'react';
import { Button } from '../ui/button';
import { Rocket, Target, Users } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MissionSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.mission-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section className="py-12 bg-gray-50" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 mission-item">
          <h2 className="text-3xl font-bold mb-4">Развитие инноваций в Казахстане</h2>
          <p className="text-xl text-gray-600">Строим будущее технологий через сотрудничество и инновации</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Rocket,
              title: 'Центр инноваций',
              description: 'Доступ к передовым технологиям и экспертизе',
            },
            {
              icon: Target,
              title: 'Поддержка стартапов',
              description: 'Комплексные ресурсы для роста стартапов',
            },
            {
              icon: Users,
              title: 'Сообщество',
              description: 'Общайтесь с лидерами отрасли и единомышленниками',
            },
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm mission-item">
              <item.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mission-item">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Начните свой путь
          </Button>
        </div>
      </div>
    </section>
  );
}