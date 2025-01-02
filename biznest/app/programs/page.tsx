'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Heart, Info } from 'lucide-react';
import ProgramCard from '@/components/home/program-card';
import ProgramFilters from '@/components/home/program-filters';
import { Program } from '@/types/program';

const programs: Program[] = [
  {
    id: 1,
    title: 'Expert Advice',
    description: 'Free consultations in all areas from Tech Hub experts',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
    status: 'Accepting applications',
    category: 'Services',
  },
  {
    id: 2,
    title: 'Startup Academy',
    description: 'Startup Academy is a course that provides basic knowledge of technology entrepreneurship',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
    status: 'Accepting applications',
    category: 'Education',
  },
  {
    id: 3,
    title: 'Vision Lab Access',
    description: 'Get access to our state-of-the-art Vision Lab facilities',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    status: 'Accepting applications',
    category: 'Infrastructure',
  },
  {
    id: 4,
    title: 'Startup English with Laura',
    description: 'English language course for tech entrepreneurs',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    status: 'Accepting applications',
    category: 'Education',
  },
];

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState(programs);

  const handleFilter = () => {
    let filtered = programs;
    
    if (searchQuery) {
      filtered = filtered.filter(program => 
        program.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(program =>
        selectedCategories.includes(program.category)
      );
    }
    
    setFilteredPrograms(filtered);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button variant="outline" className="text-green-600 border-green-600">
              All Programs
            </Button>
            <Button variant="ghost">Featured</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>

      <div className="w-80 shrink-0">
        <Card className="p-4">
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          <ProgramFilters
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <Button 
            className="w-full bg-green-600 hover:bg-green-700 mt-4"
            onClick={handleFilter}
          >
            Apply Filters
          </Button>

          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategories([]);
              setFilteredPrograms(programs);
            }}
          >
            Reset Filters
          </Button>
        </Card>
      </div>
    </div>
  );
}