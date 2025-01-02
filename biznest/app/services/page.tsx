'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Lightbulb, BookOpen, Bot } from 'lucide-react';
import gsap from 'gsap';

const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    description: 'Professional website development tailored to your business needs',
    features: [
      'Responsive Design',
      'E-commerce Solutions',
      'CMS Integration',
      'Performance Optimization',
    ],
  },
  {
    icon: Lightbulb,
    title: 'Startup Consulting',
    description: 'Expert guidance for your startup journey',
    features: [
      'Business Strategy',
      'Market Analysis',
      'Funding Preparation',
      'Growth Planning',
    ],
  },
  {
    icon: BookOpen,
    title: 'Educational Programs',
    description: 'Comprehensive tech education and training',
    features: [
      'Coding Bootcamps',
      'Digital Marketing',
      'Product Management',
      'UX/UI Design',
    ],
  },
  {
    icon: Bot,
    title: 'AI Solutions',
    description: 'Cutting-edge AI integration for business automation',
    features: [
      'Process Automation',
      'Data Analysis',
      'Chatbot Development',
      'Machine Learning Models',
    ],
  },
];

export default function ServicesPage() {
  useEffect(() => {
    gsap.from('.service-card', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600">Comprehensive solutions for your tech journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="service-card p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <service.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}