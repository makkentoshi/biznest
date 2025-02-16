"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function TutorialVideo() {
  return (
    <section id="tutorial" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch our quick tutorial to learn how to create and customize your Telegram bot in just a few minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-6 bg-black rounded-full text-white"
            >
              <Play size={32} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}