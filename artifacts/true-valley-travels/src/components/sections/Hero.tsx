import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

const SUMMER_BG = "https://images.unsplash.com/photo-1597735881925-45af51cedb7a?w=1920&q=85&auto=format&fit=crop";
const WINTER_BG = "https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=1920&q=85&auto=format&fit=crop";

/* ── Floating particles ─────────────────────────────────── */
function Particle({ isSummer, index }: { isSummer: boolean; index: number }) {
  const left = `${(index * 7.3 + 3) % 100}%`;
  const dur = 14 + (index % 7) * 2.2;
  const delay = (index % 9) * 1.8;
  const sz = isSummer ? 5 + (index % 4) * 3 : 7 + (index % 4) * 3;
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ left, top: -40 }}
      animate={{ y: ["0vh", "115vh"], x: [0, (index % 2 === 0 ? 1 : -1) * (25 + (index % 5) * 12)], rotate: [0, 360], opacity: [0, 0.65, 0.65, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
    >
      {isSummer ? (
        <svg width={sz} height={sz} viewBox="0 0 10 10" fill="rgba(255,180,80,0.55)">
          <ellipse cx="5" cy="5" rx="5" ry="2.5" transform="rotate(35 5 5)" />
        </svg>
      ) : (
        <svg width={sz + 5} height={sz + 5} viewBox="0 0 24 24" fill="none" stroke="rgba(200,230,255,0.65)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
          <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      )}
    </motion.div>
  );
}

/* ── Torn / brush-stroke edge SVG ───────────────────────── */
function TornEdge() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
        <path
          d="M0,100 L0,70 C18,75 35,48 55,60 C75,72 88,40 110,55 C130,68 148,38 168,52 C188,66 205,42 228,56 C250,70 265,44 290,58 C312,72 330,48 355,62 C378,76 395,50 418,64 C440,78 458,52 480,66 C502,80 520,55 545,68 C568,80 585,56 608,70 C630,82 648,58 670,72 C692,84 710,60 732,74 C754,86 772,62 795,75 C818,86 835,64 860,76 C882,87 900,65 922,77 C944,88 962,67 985,79 C1008,90 1025,68 1048,80 C1070,90 1090,70 1112,81 C1134,90 1152,72 1175,82 C1198,91 1215,74 1238,84 C1260,92 1278,76 1302,85 C1325,93 1342,78 1368,86 C1394,94 1415,80 1440,88 L1440,100 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { isSummer, season } = useSeason();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 200]);
  const textY = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  const content = isSummer
    ? { line1: "KASHMIR", line2: "IN SUMMERS", sub: "Mughal gardens in bloom, Dal Lake at golden hour, mountain meadows alive with wildflowers." }
    : { line1: "SNOW", line2: "WONDERLAND", sub: "Gulmarg blanketed in fresh snow, gondola rides above the clouds, skiing on Himalayan slopes." };

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ height: "100dvh", minHeight: 600 }}>
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={season}
            src={isSummer ? SUMMER_BG : WINTER_BG}
            alt="Kashmir"
            className="w-full object-cover object-center"
            style={{ height: "115%" }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=1920&q=80"; }}
          />
        </AnimatePresence>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/15" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(16)].map((_, i) => <Particle key={i} isSummer={isSummer} index={i} />)}
      </div>

      {/* Hero text — Oswald giant split-color */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="select-none"
        >
          {/* Small label */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-white/70 text-xs font-medium tracking-[0.45em] uppercase mb-6"
          >
            {isSummer ? "True Valley Travels — Kashmir in Summer" : "True Valley Travels — Kashmir in Winter"}
          </motion.p>

          {/* Line 1 — ORANGE */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 60, skewY: 3 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={`${season}-l1`}
                className="font-serif font-bold leading-none text-secondary"
                style={{ fontSize: "clamp(4.5rem, 18vw, 15rem)", lineHeight: 0.92, letterSpacing: "-0.01em" }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.55 }}
              >
                {content.line1}
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          {/* Line 2 — DARK / WHITE */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 60, skewY: -3 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 } } }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={`${season}-l2`}
                className="font-serif font-bold leading-none text-white"
                style={{ fontSize: "clamp(4rem, 16vw, 13rem)", lineHeight: 0.9, letterSpacing: "0.06em" }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55 }}
              >
                {content.line2}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Sub + CTA */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } } }}
            className="mt-8 flex flex-col items-center gap-5"
          >
            <p className="text-white/75 text-base font-light max-w-xl leading-relaxed">{content.sub}</p>
            <div className="flex gap-4">
              <motion.a
                href="#packages"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Tours
              </motion.a>
              <motion.a
                href="#destinations"
                className="border-2 border-white/60 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-white/15 transition-colors"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Destinations
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-white/25 relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 w-full bg-secondary"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Torn brush edge */}
      <TornEdge />
    </section>
  );
}
