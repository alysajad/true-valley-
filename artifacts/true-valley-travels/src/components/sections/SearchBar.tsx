import React from "react";
import { motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function SearchBar() {
  const { isSummer } = useSeason();
  return (
    <section className="bg-white relative z-10 py-0">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="bg-white border border-border rounded-sm shadow-2xl -mt-0 px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-xl font-bold text-foreground uppercase tracking-widest mb-6 text-center">
            Search for Tour
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Destination</label>
              <select className="w-full border border-border bg-muted/30 px-3 py-3 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition rounded-sm">
                <option value="">Where are you going?</option>
                <option>Dal Lake, Srinagar</option>
                <option>Gulmarg</option>
                <option>Pahalgam</option>
                <option>Sonamarg</option>
                <option>Yusmarg</option>
                <option>Doodhpathri</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Travel Date</label>
              <input
                type="date"
                className="w-full border border-border bg-muted/30 px-3 py-3 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition rounded-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Travellers</label>
              <select className="w-full border border-border bg-muted/30 px-3 py-3 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition rounded-sm">
                <option>2 Adults, 0 Children</option>
                <option>1 Adult</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
                <option>Group (5+)</option>
              </select>
            </div>
            <div className="flex items-end">
              <motion.button
                className="w-full bg-secondary hover:bg-primary text-white py-3 text-sm font-bold uppercase tracking-widest transition-colors rounded-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Search Tours
              </motion.button>
            </div>
          </div>
          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-2 self-center">Popular:</span>
            {(isSummer
              ? ["Dal Lake", "Mughal Gardens", "Pahalgam", "Sonamarg", "Gulmarg Golf"]
              : ["Gulmarg Skiing", "Gondola Ride", "Snow Trek", "Frozen Lake", "Apharwat"]
            ).map((tag) => (
              <motion.button
                key={tag}
                className="text-[11px] font-semibold border border-border hover:border-secondary hover:text-secondary px-3 py-1 rounded-full transition-colors text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
