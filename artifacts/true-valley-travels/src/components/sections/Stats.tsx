import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

function Counter({ to, suffix = "", decimal = false }: { to: number; suffix?: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(decimal ? Math.round(eased * to * 10) / 10 : Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, decimal]);

  return (
    <span ref={ref}>
      {decimal ? value.toFixed(1) : value.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { label: "Years of Experience", to: 15, suffix: "+", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { label: "Happy Travellers", to: 2500, suffix: "+", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  { label: "Destinations Covered", to: 6, icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
  { label: "Average Rating", to: 4.9, suffix: " / 5", decimal: true, icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
];

const summerQuote = {
  text: "The world is a book, and those who do not travel read only one page.",
  author: "Saint Augustine",
};

const winterQuote = {
  text: "In every walk with nature, one receives far more than he seeks.",
  author: "John Muir",
};

export default function Stats() {
  const { isSummer } = useSeason();
  const quote = isSummer ? summerQuote : winterQuote;

  return (
    <section className="bg-primary relative overflow-hidden">
      {/* Stats row */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-16 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/15">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center px-6 py-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d={stat.icon} />
                  </svg>
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-1 tabular-nums">
                <Counter to={stat.to} suffix={stat.suffix} decimal={stat.decimal} />
              </div>
              <p className="text-white/65 font-medium text-xs uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quote banner */}
      <div className="border-t border-white/10 bg-white/5">
        <div className="container mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            className="flex items-start gap-4 max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <svg
              className="text-secondary/60 shrink-0 mt-1"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            <div>
              <p className="text-white/90 text-lg md:text-xl font-serif italic leading-relaxed">
                {quote.text}
              </p>
              <p className="text-secondary font-semibold text-sm mt-2 uppercase tracking-widest">
                — {quote.author}
              </p>
            </div>
          </motion.div>

          <motion.a
            href="#packages"
            className="shrink-0 bg-secondary text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-secondary/90 transition-colors whitespace-nowrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Packages
          </motion.a>
        </div>
      </div>
    </section>
  );
}
