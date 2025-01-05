"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

const merchandise = [
  {
    id: 1,
    name: "Tech Hub Hoodie",
    price: 500,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description: "Premium quality hoodie with Tech Hub logo",
  },
  {
    id: 2,
    name: "Smart Water Bottle",
    price: 300,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    description: "Eco-friendly water bottle with temperature display",
  },
  {
    id: 3,
    name: "Premium Workshop Access",
    price: 1000,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    description: "One month access to premium workshops",
  },
];

export default function MarketplacePage() {
  const [balance, setBalance] = useState(2000);
  const [cart, setCart] = useState<number[]>([]);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".marketplace-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const handlePurchase = (itemId: number, price: number) => {
    if (balance >= price) {
      setBalance((prev) => prev - price);
      setCart((prev) => [...prev, itemId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6" ref={containerRef}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <Coins className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-semibold">{balance} Coins</span>
          </div>
          <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
            <ShoppingBag className="h-5 w-5 text-green-600 mr-2" />
            <span className="font-semibold">{cart.length} items</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchandise.map((item) => (
          <Card key={item.id} className="marketplace-item overflow-hidden">
            <Image
              width={500}
              height={500}
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="font-semibold">{item.price}</span>
                </div>
                <Button
                  onClick={() => handlePurchase(item.id, item.price)}
                  disabled={balance < item.price || cart.includes(item.id)}
                >
                  {cart.includes(item.id) ? "Purchased" : "Buy Now"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
