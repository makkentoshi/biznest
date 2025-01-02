import { Search, Bell, Download, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center flex-1">
          <div className="flex-shrink-0">
           BizNest
          </div>
          <div className="ml-4 flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по порталу"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <Bell className="h-6 w-6" />
          </button>
          <button className="p-2  hover:text-gray-500">
            <Download className="h-6 w-6" />
          </button>
          <button className="p-2  hover:text-gray-500">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}