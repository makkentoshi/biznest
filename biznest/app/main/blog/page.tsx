'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Play } from 'lucide-react';
import gsap from 'gsap';

const posts = [
  {
    title: 'How to Build a Successful Startup in Kazakhstan',
    date: 'March 15, 2024',
    category: 'Startup',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
    excerpt: 'Essential tips and strategies for launching your startup...',
  },
  {
    title: 'The Future of AI in Business Automation',
    date: 'March 12, 2024',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    excerpt: 'Exploring how AI is transforming business processes...',
  },
  {
    title: 'Web Development Trends 2024',
    date: 'March 10, 2024',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    excerpt: 'Latest trends and technologies in web development...',
  },
];

const webinars = [
  {
    title: 'Introduction to Machine Learning',
    date: 'March 20, 2024',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
  },
  {
    title: 'Startup Funding Strategies',
    date: 'March 25, 2024',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
  },
];

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('articles');

  useEffect(() => {
    gsap.from('.blog-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog & Resources</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'articles' ? 'default' : 'outline'}
            onClick={() => setActiveTab('articles')}
          >
            Articles
          </Button>
          <Button
            variant={activeTab === 'webinars' ? 'default' : 'outline'}
            onClick={() => setActiveTab('webinars')}
          >
            Webinars
          </Button>
        </div>
      </div>

      {activeTab === 'articles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="blog-item overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center space-x-4 mb-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    {post.category}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="outline" className="w-full">Read More</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webinars.map((webinar, index) => (
            <Card key={index} className="blog-item overflow-hidden">
              <div className="relative">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-full h-64 object-cover"
                />
                <Button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  size="lg"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {webinar.date}
                  </div>
                  <div>{webinar.duration}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}