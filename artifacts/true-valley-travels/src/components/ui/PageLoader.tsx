import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "If there is a paradise on earth, it is here, it is here, it is here.", author: "Mughal Emperor Jehangir on Kashmir" },
  { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
  { text: "Kashmir — where every valley tells a story older than memory.", author: "True Valley Travels" },
  { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
  { text: "Welcome. Your journey through the Himalayas begins now.", author: "True Valley Travels" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { text: "Dal Lake at dawn is not a place — it is a feeling.", author: "True Valley Travels" },
];

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const MIN_MS = 2800;
    const start = Date.now();
    let cur = 0;

    const iv = setInterval(() => {
      cur = Math.min(cur + Math.random() * 5 + 2.5, 100);
      setProgress(cur);

      if (cur >= 100) {
        clearInterval(iv);
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_MS - elapsed);
        setTimeout(() => setLoading(false), remaining + 350);
      }
    }, 60);

    return () => clearInterval(iv);
  }, []);

  /* Rotate quotes every 1.8 s */
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex(i => (i + 1) % quotes.length);
        setQuoteVisible(true);
      }, 350);
    }, 1800);
    return () => clearInterval(t);
  }, [loading]);

  const q = quotes[quoteIndex];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* Mountain illustration */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <svg viewBox="0 0 280 90" className="w-52 md:w-64" fill="none">
              <path d="M0 90 L70 20 L100 50 L140 5 L180 45 L210 20 L240 55 L280 30 L280 90 Z" fill="hsl(210 55% 22% / 0.10)" />
              <path d="M0 90 L50 55 L85 72 L120 30 L158 62 L192 38 L225 65 L260 45 L280 60 L280 90 Z" fill="hsl(210 55% 22% / 0.20)" />
              <path d="M120 30 L112 44 L128 44 Z" fill="white" stroke="hsl(210 55% 22% / 0.25)" strokeWidth="0.6" />
              <path d="M192 38 L184 52 L200 52 Z" fill="white" stroke="hsl(210 55% 22% / 0.25)" strokeWidth="0.6" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary uppercase tracking-[0.08em]">
              True Valley Travels
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.35em] mt-1.5">Kashmir</p>
          </motion.div>

          {/* Rotating quote */}
          <div className="w-full max-w-sm min-h-[72px] flex flex-col items-center justify-center mb-8 text-center">
            <AnimatePresence mode="wait">
              {quoteVisible && (
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Opening quote mark */}
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="text-secondary/50 mb-1">
                    <path d="M0 14V8.4C0 3.36 3.08 0.84 9.24 0L10.08 1.68C7.28 2.24 5.64 3.64 5.04 5.88H8.4V14H0ZM11.6 14V8.4C11.6 3.36 14.68 0.84 20.84 0L21.68 1.68C18.88 2.24 17.24 3.64 16.64 5.88H20V14H11.6Z" fill="currentColor"/>
                  </svg>
                  <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed font-light">
                    "{q.text}"
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary mt-1">
                    — {q.author}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-56 h-[3px] bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            />
          </div>
          <motion.p
            className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mt-3 font-semibold"
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
