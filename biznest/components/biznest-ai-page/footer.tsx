'use client';

import { useRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function HomeFooter() {
  const footerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    gsap.from('.footer-item', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
      },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="footer-item">
            <h3 className="text-xl font-bold text-white mb-4">BizNest</h3>
            <p className="text-white">
              Создаем будущее технологий вместе с вами
            </p>
          </div>
          
          {[
            {
              title: 'Компания',
              links: ['О нас', 'Команда', 'Карьера', 'Контакты'],
            },
            {
              title: 'Ресурсы',
              links: ['Блог', 'Документация', 'Поддержка', 'FAQ'],
            },
            {
              title: 'Правовая информация',
              links: ['Условия использования', 'Конфиденциальность', 'Cookies'],
            },
          ].map((section, index) => (
            <div key={index} className="footer-item">
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-white hover:text-gray-200 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="footer-item text-white">
              © 2025 BizNest. Все права защищены.
            </div>
            <div className="footer-item flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}