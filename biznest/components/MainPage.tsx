'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MainFooter from '@/components/main/footer';
import MainHeader from '@/components/main/header';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
    .from('.hero-description', {
      y: 50,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero-button', {
      y: 30,
      opacity: 0,
      duration: 0.5,
    }, '-=0.3');

    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top center',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });

    gsap.from('.stats-item', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top center',
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      <MainHeader />
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/50" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-11114-large.mp4" type="video/mp4" />
          </video>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="hero-title text-7xl md:text-8xl font-bold mb-8">
              Инновации начинаются здесь
            </h1>
            <p className="hero-description text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Biz Nest - это место, где технологии встречаются с возможностями. 
              Создавайте, развивайтесь и меняйте мир вместе с нами.
            </p>
            <Link href="/main" className="hero-button inline-block">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6">
                Начать путешествие <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Инновации',
                  description: 'Доступ к передовым технологиям и экспертизе',
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
                },
                {
                  title: 'Развитие',
                  description: 'Комплексная поддержка для роста вашего стартапа',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                },
                {
                  title: 'Сообщество',
                  description: 'Нетворкинг с лидерами индустрии',
                  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
                },
              ].map((feature, index) => (
                <div key={index} className="feature-card group">
                  <div className="relative overflow-hidden rounded-xl aspect-video mb-6">
                    <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors" />
                    <Image
                    width={500}
                    height={500}
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '500+', label: 'Стартапов' },
                { number: '₸100M+', label: 'Инвестиций' },
                { number: '50+', label: 'Менторов' },
                { number: '1000+', label: 'Участников' },
              ].map((stat, index) => (
                <div key={index} className="stats-item">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}