import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center pt-20">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/images/hero.png" 
          alt="Dal Lake Aerial View" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <span className="inline-block text-secondary font-medium tracking-widest uppercase text-sm md:text-base">
            The Insider's Gateway to Kashmir
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold leading-tight">
            Breathe the <br/>
            <span className="italic text-secondary">Mountain Air</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Curated immersive journeys through the world's most breathtaking valley. 
            Experience Kashmir not as a tourist, but as a guest.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-secondary text-primary-foreground hover:bg-secondary/90 text-lg px-8 py-6 rounded-full w-full sm:w-auto transition-transform hover:scale-105">
              Explore Packages
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-full w-full sm:w-auto transition-transform hover:scale-105">
              View Destinations
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70"
      >
        <span className="text-sm tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-secondary"
          />
        </div>
      </motion.div>
    </section>
  );
}
