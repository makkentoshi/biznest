'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Heart } from 'lucide-react';
import { Program } from '@/types/program';
import Image from 'next/image';

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={program.image}
        width={500}
        height={500}
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
  );
}