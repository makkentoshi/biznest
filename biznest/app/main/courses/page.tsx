"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpen, Star, DollarSign } from "lucide-react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Courses() {
  const coursesRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (coursesRef.current) {
        gsap.from(coursesRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    },
    { scope: coursesRef }
  );

  const courses = [
    {
      title: "Data Analytics на Power BI",
      duration: "26 недель",
      price: "540 000 ₸",
      level: "Для начинающих",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "AI - интегратор с нуля",
      duration: "24 недели",
      price: "750 000 ₸",
      level: "Для начинающих",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Machine Learning",
      duration: "32 недели",
      price: "900 000 ₸",
      level: "Для продвинутых",
      image:
        "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      ref={coursesRef}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Образовательные курсы
        </h2>
        <p className="text-xl text-gray-600">
          Развивайте профессиональные навыки с нашими курсами
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              width={500}
              height={500}
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{course.duration}</span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{course.level}</span>
              </div>
              <div className="flex items-center mb-4">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{course.price}</span>
              </div>
              <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Записаться на курс
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
