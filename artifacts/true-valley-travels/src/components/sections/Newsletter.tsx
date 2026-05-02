import React from "react";
import { motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function Newsletter() {
  const { isSummer } = useSeason();
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-white/70 text-xs font-bold uppercase tracking-[0.35em] mb-2">Stay Connected</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
              {isSummer ? "Discover Kashmir This Summer" : "Experience Kashmir in Snow"}
            </h2>
            <p className="text-white/75 mt-3 text-sm leading-relaxed">
              Exclusive seasonal offers, curated travel tips, and early access to limited packages — straight to your inbox.
            </p>
          </motion.div>

          <motion.form
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <motion.input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3.5 text-foreground bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              type="submit"
              className="bg-primary text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
