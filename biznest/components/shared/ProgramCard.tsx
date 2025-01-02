import { Share2, Heart } from 'lucide-react';

interface ProgramCardProps {
  image: string;
  status: string;
  title: string;
  description: string;
}

export default function ProgramCard({ image, status, title, description }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            {status}
          </span>
          <div className="flex space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}