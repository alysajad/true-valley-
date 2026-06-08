import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

function Counter({ to, suffix = "", decimal = false }: { to: number; suffix?: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t0: number;
    const dur = 1800;
    const run = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(decimal ? Math.round(e * to * 10) / 10 : Math.floor(e * to));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [inView, to, decimal]);
  return <span ref={ref}>{decimal ? val.toFixed(1) : val.toLocaleString()}{suffix}</span>;
}

const stats = [
  { label: "Years of Experience", to: 15, suffix: "+", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { label: "Happy Travellers", to: 2500, suffix: "+", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  { label: "Kashmir Destinations", to: 6, icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
  { label: "Average Rating", to: 4.9, suffix: " / 5", decimal: true, icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
];

const QUOTES = {
  summer: { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
  winter: { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const { isSummer, season } = useSeason();
  const quote = QUOTES[isSummer ? "summer" : "winter"];

  return (
    <section ref={ref} className="relative overflow-hidden py-14 md:py-24">
      {/* Parallax dark mountain background */}
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=1600&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/88" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 mb-10 md:mb-14 pb-10 md:pb-14 border-b border-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className={`text-center px-3 md:px-6 py-4 ${i % 2 !== 0 || i > 0 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                  <path d={s.icon} />
                </svg>
              </div>
              <div className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-1">
                <Counter to={s.to} suffix={s.suffix} decimal={s.decimal} />
              </div>
              <p className="text-white/55 text-[10px] font-semibold uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote + CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex items-start gap-4 max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <svg className="text-secondary/50 shrink-0 mt-1" width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
            <div>
              <p className="text-white/90 text-lg md:text-xl font-light italic leading-relaxed">{quote.text}</p>
              <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-3">— {quote.author}</p>
            </div>
          </motion.div>
          <motion.a
            href="#packages"
            className="shrink-0 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Packages
          </motion.a>
        </div>
      </div>
    </section>
  );
}
