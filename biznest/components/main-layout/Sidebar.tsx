"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Newspaper,
  MessageSquare,
  Settings,
  ChevronRight,
  Bot,
  Zap,
  Users,
  BarChart,
  BookOpen,
  Calculator,
  FileCode2,
  Calendar,
  School,
  Building2,
  ShoppingBag,
  Plane,
  Info,
  Mail,
  Instagram,
  PackageOpen,
  BusIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  {
    title: "Главная",
    icon: Home,
    href: "/main",
  },
  {
    title: "Новости",
    icon: Newspaper,
    href: "/main/news",
  },
  {
    title: "AI Chat",
    icon: Bot,
    href: "/biznest-ai",
  },
  {
    title: "Аналитика",
    icon: BarChart,
    href: "/main/analytics",
  },
  {
    title: "Сообщество",
    icon: Users,
    href: "/main/community",
  },
  {
    title: "Программы",
    icon: BookOpen,
    href: "/main/programs",
  },

  {
    title: "Истории бизнесменов",
    icon: Building2,
    href: "/main/entepreneurs",
  },
  {
    title: "Маркетплейс",
    icon: ShoppingBag,
    href: "/main/marketplace",
  },
  {
    title: "Удаленная работа",
    icon: Plane,
    href: "/main/relocation",
  },
  {
    title: "Образовательные видео",
    icon: PackageOpen,
    href: "/main/courses",
  },
];

const footerLinks = [
  {
    title: "О BizNest",
    icon: Info,
    href: "/main/about",
  },
  {
    title: "Связаться с нами",
    icon: Mail,
    href: "/main/contact",
  },
  {
    title: "Социальные сети",
    icon: Instagram,
    href: "/main/social",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[18rem] flex-shrink-0 fixed h-screen pt-10 ">
      <div className="sticky top-20 bg-white/50 backdrop-blur-xl rounded-3xl border border-gray-200/50 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <div className="p-4">
            {/* Featured AI Tool */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">BizNest AI</h3>
                  <p className="text-sm text-gray-500">Pro Version</p>
                </div>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                Попробовать
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-12 rounded-2xl transition-all duration-300",
                        isActive && "bg-gray-100/80"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 ml-auto opacity-50 transition-transform",
                          isActive && "transform rotate-90"
                        )}
                      />
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50/50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Активность</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-semibold">1,234</span>
                  <span className="text-xs text-green-500">+12.3%</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 border-t border-gray-200/50 pt-4">
              <nav className="space-y-1">
                {footerLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 h-12 rounded-2xl transition-all duration-300",
                          isActive && "bg-gray-100/80"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 ml-auto opacity-50 transition-transform",
                            isActive && "transform rotate-90"
                          )}
                        />
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}