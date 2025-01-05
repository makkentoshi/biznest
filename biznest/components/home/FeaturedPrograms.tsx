'use client';

import { useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Share2, Heart } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

const programs = [
  {
    title: 'ChatGPT Fundamentals',
    description: 'Learn the basics of AI and how to effectively use ChatGPT',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    status: 'Accepting applications',
  },
  {
    title: 'Startup Academy',
    description: 'Complete course on building and scaling your startup',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
    status: 'Accepting applications',
  },
  {
    title: 'Vision Lab Access',
    description: 'Get access to our state-of-the-art Vision Lab facilities',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    status: 'Accepting applications',
  },
];

export default function FeaturedPrograms() {
  useEffect(() => {
    gsap.from('.program-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Popular Programs</h2>
        <Link href="/programs" className="text-sm text-green-600 hover:underline">
          View all →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <Card key={index} className="program-card overflow-hidden">
            <Image
            width={500}
            height={500}
              src={program.image}
              alt={program.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="text-green-600 text-sm mb-2">{program.status}</div>
              <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  Apply Now
                </Button>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}