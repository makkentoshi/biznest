import { ArrowRight } from 'lucide-react';

export default function Banner() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden mb-8">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative h-full flex items-center justify-between px-8">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">Получи бесплатную консультацию от эксперта</h2>
          <div className="flex space-x-4 mt-4">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Data Analysis</span>
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Marketing</span>
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Finance</span>
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Software development</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition-colors">
          Подать заявку сейчас
          <ArrowRight className="inline-block ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}