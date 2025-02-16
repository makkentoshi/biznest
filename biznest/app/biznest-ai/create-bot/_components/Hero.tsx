"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-4 bg-black rounded-2xl"
            >
              <Bot size={48} className="text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-6xl font-bold text-black tracking-tight">
            Create Your Intelligent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
              Telegram Bot
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build powerful AI-driven Telegram bots in minutes. No coding required.
          </p>
          
          <div className="flex gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#create"
              className="px-8 py-4 bg-black text-white rounded-xl font-medium flex items-center gap-2"
            >
              <Sparkles size={20} />
              Create Bot
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#tutorial"
              className="px-8 py-4 bg-white text-black border-2 border-black rounded-xl font-medium flex items-center gap-2"
            >
              <MessageSquare size={20} />
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}