import React from "react";
import { motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function Newsletter() {
  const { isSummer } = useSeason();
  return (
    /* Navy background — flows naturally from Testimonials (also navy) into Contact (light) */
    <section className="py-14 md:py-20 bg-primary relative overflow-hidden">
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="nlPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white"/>
              <line x1="0" y1="20" x2="40" y2="20" stroke="white" strokeWidth="0.3"/>
              <line x1="20" y1="0" x2="20" y2="40" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nlPattern)"/>
        </svg>
      </div>

      {/* Orange accent bar on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            {/* Small logo mark */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-secondary" />
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em]">Stay Connected</p>
            </div>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
              {isSummer ? "Discover Kashmir\nThis Summer" : "Experience Kashmir\nin Snow"}
            </h2>
            <p className="text-white/60 mt-4 text-sm leading-relaxed">
              Exclusive seasonal offers, curated travel tips, and early access to limited packages — straight to your inbox.
            </p>
            <div className="flex items-center gap-6 mt-6">
              {["No spam ever", "Unsubscribe anytime"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-white/40 text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="flex flex-col sm:flex-row gap-0 w-full max-w-md shrink-0"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 text-foreground bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 border-0"
            />
            <motion.button
              type="submit"
              className="bg-secondary text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-secondary/85 transition-colors whitespace-nowrap shrink-0"
              whileHover={{ scale: 1.02 }}
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
