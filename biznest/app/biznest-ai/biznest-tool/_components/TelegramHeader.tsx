"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TelegramHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useGSAP(
    () => {
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className={` top-0 left-0 right-0 z-50 transition-all fixed duration-300 bg-black backdrop-blur-sm" :  ${
        isScrolled ? "bg-black/40 backdrop-blur-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/biznest-ai" className="nav-item">
            <span className="text-2xl font-bold text-white">BizNest</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Biznest Tool", href: "/biznest-ai/biznest-tool" },
               { label: "Biznest-AI", href: "/biznest-ai" },
              { label: "AI Помощник", href: "/biznest-ai/chat" },
              { label: "Новости", href: "/main/news" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="nav-item text-sm hover:text-gray-300 transition-colors text-white"
              >
                {item.label}
              </Link>
            ))}

            <SignedOut>
              <Link href="/sign-up" className="nav-item">
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-gray-400"
                >
                  Зарегистрироваться
                </Button>
              </Link>
            </SignedOut>
            <SignedOut>
              <Link href="/home" className="nav-item">
                <Button
                  variant="default"
                  className="border-white text-white  hover:text-gray-300"
                >
                  Войти
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
          <button
            className="md:hidden nav-item"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {["О нас", "Услуги", "Программы", "Контакты"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="block text-lg hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <SignedOut>
              <Link href="/home">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-black"
                >
                  Войти
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
}
