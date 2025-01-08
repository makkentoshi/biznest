"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const events = [
  {
    title: "Tech Startup Summit 2024",
    date: "March 15, 2024",
    location: "Main Conference Hall",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    description: "Annual gathering of tech startups and investors",
  },
  {
    title: "AI & Machine Learning Workshop",
    date: "March 20, 2024",
    location: "Innovation Lab",
    attendees: 100,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Hands-on workshop on AI and ML technologies",
  },
  {
    title: "Blockchain Technology Conference",
    date: "March 25, 2024",
    location: "Digital Arena",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1516245834210-c4c142787335",
    description: "Exploring the future of blockchain technology",
  },
];

export default function EventsPage() {
  const eventsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".event-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: eventsRef }
  );

  return (
    <div ref={eventsRef} className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card key={index} className="event-card overflow-hidden">
            <Image
              width={500}
              height={500}
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} attendees
                </div>
              </div>

              <Button className="w-full">Register Now</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
