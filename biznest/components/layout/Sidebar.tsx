"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Calculator,
  FileCode2,
  Calendar,
  Users,
  School,
  Building2,
  ShoppingBag,
  Plane,
  BarChart3,
  Info,
  Mail,
  Instagram,
  BotIcon,
  PackageOpen,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Начальная страница", path: "/" },
  { icon: BookOpen, label: "Программы", path: "/main/programs" },
  { icon: Calendar, label: "Мероприятия", path: "/main/events" },
  { icon: Building2, label: "Истории бизнесменов", path: "/main/entepreneurs" },
  { icon: ShoppingBag, label: "Маркетплейс", path: "/main/marketplace" },
  { icon: Plane, label: "Удаленная работа", path: "/main/relocation" },
  { icon: BarChart3, label: "Аналитика", path: "/main/analytics" },
  { icon: BotIcon, label: "Чат-бот", path: "/main/chat" },
  { icon: PackageOpen, label: "Курсы", path: "/main/courses" },
];

const footerLinks = [
  { icon: Info, label: "Об BizNest", path: "/about" },
  { icon: Mail, label: "Связаться с нами", path: "/contact" },
  { icon: Instagram, label: "Социальные сети", path: "/social" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 pt-16">
      <div className="px-4 py-2">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <item.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-500 mr-3" />
              {item.label}
              {item.hasSubmenu && (
                <svg
                  className="ml-auto h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full border-t border-gray-200 px-4 py-4">
        <nav className="space-y-1">
          {footerLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group w-full text-left"
            >
              <item.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-500 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
