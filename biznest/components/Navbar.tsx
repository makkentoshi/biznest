import { Link } from 'react-router-dom';
import { Menu, X, Home, BookOpen, GraduationCap, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Business Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Home className="h-5 w-5" />
              <span>Главная</span>
            </Link>
            <Link to="/programs" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <BookOpen className="h-5 w-5" />
              <span>Программы</span>
            </Link>
            <Link to="/courses" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <GraduationCap className="h-5 w-5" />
              <span>Курсы</span>
            </Link>
            <Link to="/chat" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <MessageSquare className="h-5 w-5" />
              <span>Бизнес-чат</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Главная
            </Link>
            <Link
              to="/programs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Программы
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Курсы
            </Link>
            <Link
              to="/chat"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Бизнес-чат
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}