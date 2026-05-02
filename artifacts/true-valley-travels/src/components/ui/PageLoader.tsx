import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cur = 0;
    const iv = setInterval(() => {
      cur = Math.min(cur + Math.random() * 28 + 15, 100);
      setProgress(cur);
      if (cur >= 100) { clearInterval(iv); setTimeout(() => setLoading(false), 200); }
    }, 40);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* Mountain illustration */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
            <svg viewBox="0 0 280 90" className="w-52 md:w-64" fill="none">
              <path d="M0 90 L70 20 L100 50 L140 5 L180 45 L210 20 L240 55 L280 30 L280 90 Z" fill="hsl(210 55% 22% / 0.10)" />
              <path d="M0 90 L50 55 L85 72 L120 30 L158 62 L192 38 L225 65 L260 45 L280 60 L280 90 Z" fill="hsl(210 55% 22% / 0.20)" />
              <path d="M120 30 L112 44 L128 44 Z" fill="white" stroke="hsl(210 55% 22% / 0.25)" strokeWidth="0.6" />
              <path d="M192 38 L184 52 L200 52 Z" fill="white" stroke="hsl(210 55% 22% / 0.25)" strokeWidth="0.6" />
            </svg>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary uppercase tracking-[0.08em]">True Valley Travels</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.35em] mt-1.5 mb-10">Kashmir</p>
          </motion.div>

          {/* Progress bar — orange like GoodLayers */}
          <div className="w-56 h-[3px] bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            />
          </div>
          <motion.p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mt-3 font-semibold"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.3 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
