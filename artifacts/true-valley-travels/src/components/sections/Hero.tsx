import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

// Summer: Kashmir valley in full bloom — bright green meadows, Pir Panjal peaks
const SUMMER_BG = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=90&auto=format&fit=crop";
// Winter: Gulmarg Gondola station with snow-blanketed Himalayan slopes
const WINTER_BG = "https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=1920&q=90&auto=format&fit=crop";

/* ── Animated SVG atmosphere overlay ──────────────────────
   Clouds, birds (summer) / snow-sweep (winter) on top of the photo
   to make the background feel alive                         */
function AtmosphereOverlay({ isSummer }: { isSummer: boolean }) {
  return (
    <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.55 }}
      >
        {isSummer ? (
          /* ─── SUMMER: drifting clouds + birds ─── */
          <>
            {/* cloud 1 */}
            <motion.g
              animate={{ x: [0, 320, 0] }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <ellipse cx="180" cy="110" rx="120" ry="38" fill="white" opacity="0.18" />
              <ellipse cx="240" cy="98" rx="80" ry="30" fill="white" opacity="0.14" />
              <ellipse cx="130" cy="118" rx="70" ry="24" fill="white" opacity="0.12" />
            </motion.g>
            {/* cloud 2 */}
            <motion.g
              animate={{ x: [0, -260, 0] }}
              transition={{ duration: 110, repeat: Infinity, ease: "linear", delay: 15 }}
            >
              <ellipse cx="900" cy="75" rx="100" ry="30" fill="white" opacity="0.13" />
              <ellipse cx="960" cy="62" rx="65" ry="22" fill="white" opacity="0.10" />
              <ellipse cx="850" cy="82" rx="58" ry="20" fill="white" opacity="0.09" />
            </motion.g>
            {/* cloud 3 */}
            <motion.g
              animate={{ x: [0, 180, 0] }}
              transition={{ duration: 95, repeat: Infinity, ease: "linear", delay: 35 }}
            >
              <ellipse cx="1250" cy="140" rx="90" ry="28" fill="white" opacity="0.15" />
              <ellipse cx="1310" cy="128" rx="60" ry="20" fill="white" opacity="0.11" />
            </motion.g>

            {/* birds flock - distant V shapes */}
            {[
              { cx: 420, cy: 160, delay: 0 },
              { cx: 450, cy: 145, delay: 0.4 },
              { cx: 470, cy: 165, delay: 0.8 },
              { cx: 490, cy: 148, delay: 1.2 },
              { cx: 510, cy: 162, delay: 0.6 },
            ].map((b, i) => (
              <motion.path
                key={i}
                d={`M${b.cx - 6},${b.cy} Q${b.cx},${b.cy - 4} ${b.cx + 6},${b.cy}`}
                fill="none"
                stroke="white"
                strokeWidth="1.2"
                opacity="0.5"
                animate={{
                  x: [0, 600],
                  y: [0, -40, 0],
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{ duration: 28, repeat: Infinity, delay: b.delay + i * 3, ease: "linear" }}
              />
            ))}

            {/* Horizon haze glow — warm orange */}
            <defs>
              <linearGradient id="hazeSum" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="70%" stopColor="transparent" />
                <stop offset="100%" stopColor="rgba(255,140,20,0.12)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="1440" height="800" fill="url(#hazeSum)" />
          </>
        ) : (
          /* ─── WINTER: sweep haze + snow shimmer ─── */
          <>
            {/* Blowing snow streaks */}
            {Array.from({ length: 12 }, (_, i) => (
              <motion.line
                key={i}
                x1={-40 + i * 130}
                y1={100 + i * 40}
                x2={60 + i * 130}
                y2={85 + i * 40}
                stroke="rgba(200,230,255,0.35)"
                strokeWidth="1"
                animate={{ x: [0, 80, 0], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 6 + i * 0.5, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              />
            ))}

            {/* Winter sky vignette — cool blue tint */}
            <defs>
              <radialGradient id="winVig" cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor="rgba(15,30,80,0.0)" />
                <stop offset="100%" stopColor="rgba(5,15,55,0.30)" />
              </radialGradient>
              <linearGradient id="snowHaze" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="rgba(180,220,255,0.08)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="1440" height="800" fill="url(#winVig)" />
            <rect x="0" y="0" width="1440" height="800" fill="url(#snowHaze)" />

            {/* Falling snowflakes */}
            {Array.from({ length: 20 }, (_, i) => {
              const x = (i * 79 + 30) % 1440;
              const size = 2 + (i % 3);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={-20}
                  r={size}
                  fill="rgba(220,240,255,0.65)"
                  animate={{
                    cy: [-20, 820],
                    cx: [x, x + (i % 2 === 0 ? 60 : -60)],
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{ duration: 12 + (i % 7) * 2, repeat: Infinity, delay: i * 1.1, ease: "linear" }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}

/* ── Season toggle pill ─────────────────────────────────── */
function SeasonToggle() {
  const { isSummer, toggleSeason } = useSeason();
  return (
    <motion.div
      className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 flex items-center bg-black/30 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {(["summer", "winter"] as const).map((s) => {
        const active = s === (isSummer ? "summer" : "winter");
        return (
          <motion.button
            key={s}
            onClick={() => { if (!active) toggleSeason(); }}
            className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${active ? "text-primary" : "text-white/55 hover:text-white/80"}`}
          >
            {active && (
              <motion.div
                layoutId="hero-season-pill"
                className="absolute inset-0 rounded-full bg-secondary"
                transition={{ type: "spring", bounce: 0.22, duration: 0.55 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {s === "summer" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <line x1="12" y1="2" x2="20" y2="6"/><line x1="12" y1="2" x2="4" y2="6"/>
                  <line x1="12" y1="22" x2="20" y2="18"/><line x1="12" y1="22" x2="4" y2="18"/>
                  <line x1="2" y1="12" x2="6" y2="4"/><line x1="22" y1="12" x2="18" y2="4"/>
                  <line x1="2" y1="12" x2="6" y2="20"/><line x1="22" y1="12" x2="18" y2="20"/>
                </svg>
              )}
              {s === "summer" ? "Summer" : "Winter"}
            </span>
          </motion.button>
        );
      })}
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
      animate={{ y: ["0vh", "115vh"], x: [0, (index % 2 === 0 ? 1 : -1) * (25 + (index % 5) * 12)], rotate: [0, 360], opacity: [0, 0.65, 0.65, 0] }}
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
  const x = useTransform(scrollY, [0, 600], ["75vw", "20vw"]);
  const y = useTransform(scrollY, [0, 600], ["8vh", "72vh"]);
  const rotate = useTransform(scrollY, [0, 600], [-20, 15]);
  const scale = useTransform(scrollY, [0, 300, 600], [1, 1.15, 0.8]);
  const opacity = useTransform(scrollY, [0, 100, 500, 600], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute z-15 pointer-events-none" style={{ x, y, rotate, scale, opacity }}>
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="14" r="8" fill="white" opacity="0.9" />
        <line x1="40" y1="22" x2="52" y2="38" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        <line x1="44" y1="28" x2="30" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
        <line x1="30" y1="42" x2="20" y2="55" stroke="rgba(255,161,26,0.9)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="48" y1="32" x2="62" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
        <line x1="62" y1="42" x2="68" y2="58" stroke="rgba(255,161,26,0.9)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="52" y1="38" x2="42" y2="55" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
        <line x1="34" y1="54" x2="56" y2="62" stroke="rgba(255,161,26,1)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="52" y1="38" x2="58" y2="54" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
        <line x1="50" y1="58" x2="72" y2="66" stroke="rgba(255,161,26,1)" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      {[0,1,2].map(i => (
        <motion.div key={i} className="absolute"
          style={{ top: 30 + i * 8, right: -20 - i * 10, width: 20 + i * 8, height: 1.5, background: "rgba(255,255,255,0.3)", borderRadius: 2, transform: "rotate(-25deg)" }}
          animate={{ opacity: [0.6, 0.1, 0.6], scaleX: [1, 1.5, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  );
}

/* ── Torn edge ──────────────────────────────────────────── */
function TornEdge({ isSummer }: { isSummer: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
        <AnimatePresence mode="wait">
          <motion.path
            key={isSummer ? "s" : "w"}
            d={isSummer
              ? "M0,100 L0,70 C18,75 35,48 55,60 C75,72 88,40 110,55 C130,68 148,38 168,52 C188,66 205,42 228,56 C250,70 265,44 290,58 C312,72 330,48 355,62 C378,76 395,50 418,64 C440,78 458,52 480,66 C502,80 520,55 545,68 C568,80 585,56 608,70 C630,82 648,58 670,72 C692,84 710,60 732,74 C754,86 772,62 795,75 C818,86 835,64 860,76 C882,87 900,65 922,77 C944,88 962,67 985,79 C1008,90 1025,68 1048,80 C1070,90 1090,70 1112,81 C1134,90 1152,72 1175,82 C1198,91 1215,74 1238,84 C1260,92 1278,76 1302,85 C1325,93 1342,78 1368,86 C1394,94 1415,80 1440,88 L1440,100 Z"
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
  const bgY = useTransform(scrollY, [0, 700], [0, 180]);
  const textY = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  const content = isSummer
    ? { line1: "KASHMIR", line2: "IN SUMMERS", sub: "Mughal gardens in bloom, Dal Lake at golden hour, mountain meadows alive with wildflowers." }
    : { line1: "SNOW", line2: "WONDERLAND", sub: "Gulmarg blanketed in fresh snow, gondola rides above the clouds, world-class skiing on Himalayan slopes." };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        height: "100dvh",
        minHeight: 600,
        // Fallback gradient if image slow
        background: isSummer
          ? "linear-gradient(160deg, #0f2540 0%, #193555 40%, #2a5080 100%)"
          : "linear-gradient(160deg, #070f20 0%, #0d1f3c 40%, #162b50 100%)"
      }}
    >
      {/* Parallax BG photo */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={season}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
          >
            <img
              src={isSummer ? SUMMER_BG : WINTER_BG}
              alt="Kashmir"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ transform: "scale(1.08)" }}
              onError={(e) => {
                // Fallback to confirmed working Kashmir images
                e.currentTarget.src = isSummer
                  ? "https://images.unsplash.com/photo-1597735881925-45af51cedb7a?w=1920&q=90"
                  : "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1920&q=90";
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay — season-tinted */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isSummer
              ? "linear-gradient(to bottom, rgba(10,20,45,0.30) 0%, rgba(8,16,38,0.18) 50%, rgba(5,10,25,0.08) 100%)"
              : "linear-gradient(to bottom, rgba(5,10,30,0.60) 0%, rgba(5,15,40,0.38) 55%, rgba(5,15,35,0.15) 100%)",
          }}
          transition={{ duration: 1.2 }}
        />
      </motion.div>

      {/* Animated SVG atmosphere (clouds, birds, snow shimmer) */}
      <AtmosphereOverlay isSummer={isSummer} />

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

          <motion.div variants={{ hidden: { opacity: 0, y: 60, skewY: 3 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={`${season}-l1`}
                className="font-serif font-bold leading-none text-secondary"
                style={{ fontSize: "clamp(3rem, 11vw, 9rem)", lineHeight: 0.92, letterSpacing: "-0.01em" }}
                initial={{ opacity: 0, x: -50, skewX: -4 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {content.line1}
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 60, skewY: -3 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 } } }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`${season}-l2`}
                className="font-serif font-bold leading-none text-white"
                style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)", lineHeight: 0.9, letterSpacing: "0.06em" }}
                initial={{ opacity: 0, x: 50, skewX: 4 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {content.line2}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } } }}
            className="mt-8 flex flex-col items-center gap-5"
          >
            <AnimatePresence mode="wait">
              <motion.p key={`${season}-sub`}
                className="text-white text-base font-medium max-w-xl leading-relaxed px-4 py-2 rounded"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.6)" }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {content.sub}
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-6 flex-wrap justify-center">
              <motion.a href="#packages"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider border border-black/50 transition-colors"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                {isSummer ? "View Summer Tours" : "View Winter Tours"}
              </motion.a>
              <motion.a href="#destinations"
                className="border-2 border-black/60 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-white/15 transition-colors"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                Destinations
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/25 relative overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full bg-secondary"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Season toggle on hero */}
      <SeasonToggle />

      {/* Torn edge */}
      <TornEdge isSummer={isSummer} />
    </section>
  );
}
