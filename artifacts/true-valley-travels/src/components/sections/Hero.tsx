import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center pt-20 bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="/images/hero.png" 
          alt="Dal Lake Aerial View" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center mt-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold leading-tight"
          >
            Discover the Beauty of Kashmir
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            True Valley Travels — Kashmir's most trusted journey curator
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90 text-lg px-8 py-6 rounded-md w-full sm:w-auto">
              Explore Tours
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-md w-full sm:w-auto">
              View Destinations
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-12 left-0 right-0 z-30 px-4"
      >
        <div className="max-w-5xl mx-auto bg-white rounded-lg p-4 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destination</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-foreground focus:outline-none focus:border-secondary">
              <option>Where are you going?</option>
              <option>Dal Lake</option>
              <option>Gulmarg</option>
              <option>Pahalgam</option>
            </select>
          </div>
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Travel Date</label>
            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-foreground focus:outline-none focus:border-secondary" />
          </div>
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Travellers</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-foreground focus:outline-none focus:border-secondary">
              <option>2 Adults, 0 Children</option>
              <option>1 Adult</option>
              <option>2 Adults, 2 Children</option>
            </select>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-white p-6 rounded-md h-[50px] w-full md:w-auto px-8 font-medium">
            Search
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
