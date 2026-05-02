import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { isSummer } = useSeason();

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 18 + 6;
      current = Math.min(current + increment, 100);
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Mountain silhouette SVG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <svg
              viewBox="0 0 300 100"
              className="w-56 md:w-72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background mountains */}
              <path
                d="M0 100 L60 30 L90 55 L130 10 L170 50 L200 25 L230 60 L260 35 L300 70 L300 100 Z"
                fill="hsl(var(--primary) / 0.12)"
              />
              {/* Foreground mountains */}
              <path
                d="M0 100 L40 60 L70 80 L110 35 L150 65 L185 40 L220 70 L250 50 L300 80 L300 100 Z"
                fill="hsl(var(--primary) / 0.22)"
              />
              {/* Snow caps */}
              <path
                d="M110 35 L103 48 L117 48 Z"
                fill="white"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="0.5"
              />
              <path
                d="M185 40 L178 53 L192 53 Z"
                fill="white"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-serif font-bold text-foreground tracking-wide"
          >
            True Valley Travels
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-xs text-muted-foreground uppercase tracking-[0.3em] mt-1.5 mb-10"
          >
            {isSummer ? "Kashmir in Summer" : "Kashmir in Winter"}
          </motion.p>

          {/* Progress bar */}
          <div className="w-52 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            />
          </div>

          <motion.p
            className="text-[11px] text-muted-foreground/60 uppercase tracking-widest mt-3 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
