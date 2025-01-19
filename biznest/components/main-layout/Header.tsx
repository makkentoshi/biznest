import { UserButton } from '@clerk/nextjs';
import { Search, Bell, Download, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b rounded-xl border-gray-200 z-50 p-3">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center flex-1">
        <span className="text-2xl font-bold text-black">BizNest</span>
          <div className="ml-4 flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по порталу"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                Ctrl+K
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-black hover:text-gray-900">RU</button>
          <button className="p-2  hover:text-gray-500">
            <UserButton className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}