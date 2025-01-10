'use client';

import { Button } from '@/components/ui/button';

const categories = [
  'All',
  'Grants',
  'Investments',
  'Credits',
  'Business Programs',
  'Educational Courses',
  'Regional',
  'Services',
  'Events',
  'Other',
];

interface ProgramFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export default function ProgramFilters({
  selectedCategories,
  setSelectedCategories,
}: ProgramFiltersProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}