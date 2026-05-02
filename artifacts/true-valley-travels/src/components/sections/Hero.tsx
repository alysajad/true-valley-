import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

const SUMMER_BG = "https://images.unsplash.com/photo-1597735881925-45af51cedb7a?w=1920&q=85&auto=format&fit=crop";
// Gulmarg ski slopes — dramatic wide snow mountain panorama
const WINTER_BG = "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1920&q=85&auto=format&fit=crop";

/* ── Season toggle pill ─────────────────────────────────── */
function SeasonToggle() {
  const { isSummer, toggleSeason } = useSeason();
  return (
    <motion.div
      className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0 bg-white/10 backdrop-blur-md border border-white/25 rounded-full p-1 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Summer button */}
      <motion.button
        onClick={() => !isSummer && toggleSeason()}
        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isSummer ? "text-primary" : "text-white/55 hover:text-white/80"}`}
      >
        {isSummer && (
          <motion.div
            layoutId="season-pill"
            className="absolute inset-0 rounded-full bg-secondary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          Summer
        </span>
      </motion.button>

      {/* Winter button */}
      <motion.button
        onClick={() => isSummer && toggleSeason()}
        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${!isSummer ? "text-primary" : "text-white/55 hover:text-white/80"}`}
      >
        {!isSummer && (
          <motion.div
            layoutId="season-pill"
            className="absolute inset-0 rounded-full bg-secondary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="12" y1="2" x2="20" y2="6"/><line x1="12" y1="2" x2="4" y2="6"/>
            <line x1="12" y1="22" x2="20" y2="18"/><line x1="12" y1="22" x2="4" y2="18"/>
          </svg>
          Winter
        </span>
      </motion.button>
    </motion.div>
  );
}

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
      animate={{
        y: ["0vh", "115vh"],
        x: [0, (index % 2 === 0 ? 1 : -1) * (25 + (index % 5) * 12)],
        rotate: [0, 360],
        opacity: [0, 0.65, 0.65, 0],
      }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
    >
      {isSummer ? (
        <svg width={sz} height={sz} viewBox="0 0 10 10" fill="rgba(255,180,80,0.55)">
          <ellipse cx="5" cy="5" rx="5" ry="2.5" transform="rotate(35 5 5)" />
        </svg>
      ) : (
        <svg width={sz + 6} height={sz + 6} viewBox="0 0 24 24" fill="none" stroke="rgba(200,230,255,0.70)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="12" cy="12" r="2" fill="rgba(200,230,255,0.45)" stroke="none" />
        </svg>
      )}
    </motion.div>
  );
}

/* ── Scroll-triggered skier (winter only) ───────────────── */
function WinterSkier({ scrollY }: { scrollY: any }) {
  // Skier slides from top-right down to bottom-left as user scrolls
  const x = useTransform(scrollY, [0, 600], ["75vw", "20vw"]);
  const y = useTransform(scrollY, [0, 600], ["8vh", "72vh"]);
  const rotate = useTransform(scrollY, [0, 600], [-20, 15]);
  const scale = useTransform(scrollY, [0, 300, 600], [1, 1.15, 0.8]);
  const opacity = useTransform(scrollY, [0, 100, 500, 600], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute z-15 pointer-events-none"
      style={{ x, y, rotate, scale, opacity }}
    >
      {/* Skier SVG */}
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
        {/* Body */}
        <circle cx="40" cy="14" r="8" fill="white" opacity="0.9" />
        {/* Torso leaning forward */}
        <line x1="40" y1="22" x2="52" y2="38" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        {/* Left arm + pole */}
        <line x1="44" y1="28" x2="30" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
        <line x1="30" y1="42" x2="20" y2="55" stroke="rgba(255,161,26,0.9)" strokeWidth="2" strokeLinecap="round"/>
        {/* Right arm + pole */}
        <line x1="48" y1="32" x2="62" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
        <line x1="62" y1="42" x2="68" y2="58" stroke="rgba(255,161,26,0.9)" strokeWidth="2" strokeLinecap="round"/>
        {/* Left leg + ski */}
        <line x1="52" y1="38" x2="42" y2="55" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
        <line x1="34" y1="54" x2="56" y2="62" stroke="rgba(255,161,26,1)" strokeWidth="3" strokeLinecap="round"/>
        {/* Right leg + ski */}
        <line x1="52" y1="38" x2="58" y2="54" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
        <line x1="50" y1="58" x2="72" y2="66" stroke="rgba(255,161,26,1)" strokeWidth="3" strokeLinecap="round"/>
        {/* Snow spray */}
        {[0,1,2,3,4].map(i => (
          <motion.circle
            key={i}
            cx={64 + i * 3}
            cy={64 - i * 2}
            r={1.5 - i * 0.2}
            fill="rgba(200,230,255,0.7)"
            animate={{ opacity: [0.7, 0], scale: [1, 2.5], x: [0, (i % 2 === 0 ? 4 : -3)], y: [0, -5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </svg>
      {/* Speed lines */}
      {[0,1,2].map(i => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: 30 + i * 8, right: -20 - i * 10, width: 20 + i * 8, height: 1.5, background: "rgba(255,255,255,0.3)", borderRadius: 2, transform: "rotate(-25deg)" }}
          animate={{ opacity: [0.6, 0.1, 0.6], scaleX: [1, 1.5, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  );
}

/* ── Torn / brush-stroke edge ───────────────────────────── */
function TornEdge({ isSummer }: { isSummer: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
        <AnimatePresence mode="wait">
          <motion.path
            key={isSummer ? "summer-edge" : "winter-edge"}
            d={isSummer
              ? "M0,100 L0,70 C18,75 35,48 55,60 C75,72 88,40 110,55 C130,68 148,38 168,52 C188,66 205,42 228,56 C250,70 265,44 290,58 C312,72 330,48 355,62 C378,76 395,50 418,64 C440,78 458,52 480,66 C502,80 520,55 545,68 C568,80 585,56 608,70 C630,82 648,58 670,72 C692,84 710,60 732,74 C754,86 772,62 795,75 C818,86 835,64 860,76 C882,87 900,65 922,77 C944,88 962,67 985,79 C1008,90 1025,68 1048,80 C1070,90 1090,70 1112,81 C1134,90 1152,72 1175,82 C1198,91 1215,74 1238,84 C1260,92 1278,76 1302,85 C1325,93 1342,78 1368,86 C1394,94 1415,80 1440,88 L1440,100 Z"
              // Winter: sharper peaks like mountain ridge / snow drifts
              : "M0,100 L0,78 C15,68 30,85 48,72 C62,62 75,80 95,65 C112,52 125,75 145,58 C162,44 178,70 198,55 C215,42 232,66 252,50 C268,38 285,62 308,48 C325,36 342,58 362,44 C380,32 398,55 420,40 C438,28 456,52 478,38 C496,26 515,50 535,36 C552,24 572,48 595,34 C614,22 632,46 655,32 C672,20 692,44 715,30 C733,18 752,42 775,28 C793,16 812,40 835,26 C854,14 872,38 895,24 C914,12 934,36 958,22 C976,10 996,34 1020,20 C1040,8 1060,32 1085,18 C1105,6 1125,30 1148,18 C1168,8 1188,30 1212,18 C1232,8 1254,28 1278,16 C1300,6 1320,26 1345,15 C1368,5 1390,24 1415,14 C1432,7 1440,18 1440,18 L1440,100 Z"
            }
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
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
    : { line1: "SNOW", line2: "WONDERLAND", sub: "Gulmarg blanketed in fresh snow, gondola rides above the clouds, world-class skiing on Himalayan slopes." };

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
            onError={(e) => {
              e.currentTarget.src = isSummer
                ? "https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=1920&q=80"
                : "https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=1920&q=80";
            }}
          />
        </AnimatePresence>
        {/* Overlay — winter slightly cooler tint */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isSummer
              ? "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.12) 100%)"
              : "linear-gradient(to bottom, rgba(5,15,40,0.60) 0%, rgba(5,20,50,0.38) 60%, rgba(5,20,50,0.15) 100%)"
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => <Particle key={i} isSummer={isSummer} index={i} />)}
      </div>

      {/* Winter: scroll-triggered skier */}
      <AnimatePresence>
        {!isSummer && <WinterSkier key="skier" scrollY={scrollY} />}
      </AnimatePresence>

      {/* Hero text */}
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
            <AnimatePresence mode="wait">
              <motion.span key={season} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {isSummer ? "True Valley Travels — Kashmir in Summer" : "True Valley Travels — Kashmir in Winter"}
              </motion.span>
            </AnimatePresence>
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
                initial={{ opacity: 0, x: -50, skewX: -4 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {content.line1}
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          {/* Line 2 — WHITE */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 60, skewY: -3 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 } } }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={`${season}-l2`}
                className="font-serif font-bold leading-none text-white"
                style={{ fontSize: "clamp(4rem, 16vw, 13rem)", lineHeight: 0.9, letterSpacing: "0.06em" }}
                initial={{ opacity: 0, x: 50, skewX: 4 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            <AnimatePresence mode="wait">
              <motion.p
                key={`${season}-sub`}
                className="text-white/75 text-base font-light max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {content.sub}
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-4 flex-wrap justify-center">
              <motion.a
                href="#packages"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSummer ? "View Summer Tours" : "View Winter Tours"}
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/25 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-secondary"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* In-hero season toggle */}
      <SeasonToggle />

      {/* Torn brush edge — different shape for each season */}
      <TornEdge isSummer={isSummer} />
    </section>
  );
}
