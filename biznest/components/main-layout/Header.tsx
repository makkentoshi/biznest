import { UserButton } from "@clerk/nextjs";
import {
  Search,
  Bell,
  TouchpadOff,
  FileDigit,
  Download,
  User,
  MessageSquare,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  const navLinks = [
    {
      label: "Biznest Tool",
      href: "/biznest-ai/biznest-tool",
      icon: <FileDigit className="h-5 w-5 mr-2" />,
    },
    {
      label: "Biznest-AI",
      href: "/biznest-ai",
      icon: <User className="h-5 w-5 mr-2" />,
    },
    {
      label: "AI Помощник",
      href: "/biznest-ai/chat",
      icon: <MessageSquare className="h-5 w-5 mr-2" />,
    },
    {
      label: "Новости",
      href: "/main/news",
      icon: <Newspaper className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b rounded-xl border-gray-200 z-50 p-3">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center flex-1">
          <span className="text-2xl font-bold text-black">BizNest</span>
          <div className="ml-6 flex-1 max-w-2xl ">
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

        {/* Навигационные ссылки с иконками */}
        <div className="flex items-center justify-center flex-1 space-x-6">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <span className="flex items-center text-black hover:text-gray-900 cursor-pointer">
                {link.icon}
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button className="text-white ">RU</Button>
          <button className="p-2 hover:text-gray-500">
            <UserButton className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
