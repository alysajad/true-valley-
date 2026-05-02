import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

const SUMMER_BG = "https://images.unsplash.com/photo-1597735881925-45af51cedb7a?w=1920&q=85&auto=format&fit=crop";
const WINTER_BG = "https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=1920&q=85&auto=format&fit=crop";

const SUMMER_BG2 = "/images/hero.png";
const WINTER_BG2 = "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1920&q=85&auto=format&fit=crop";

function FloatingParticle({ isSummer, index }: { isSummer: boolean; index: number }) {
  const left = useMemo(() => `${(index * 5.3 + 2) % 100}%`, [index]);
  const duration = useMemo(() => 12 + (index % 7) * 2, [index]);
  const delay = useMemo(() => (index % 8) * 1.5, [index]);
  const size = useMemo(() => 4 + (index % 4) * 3, [index]);

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ left, top: -30 }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, (index % 2 === 0 ? 1 : -1) * (20 + (index % 5) * 10)],
        rotate: [0, 360],
        opacity: [0, 0.7, 0.7, 0],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    >
      {isSummer ? (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="rgba(255,200,100,0.6)">
          <ellipse cx="5" cy="5" rx="5" ry="2.5" transform="rotate(30 5 5)" />
        </svg>
      ) : (
        <svg width={size + 4} height={size + 4} viewBox="0 0 24 24" fill="none" stroke="rgba(200,230,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      )}
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { isSummer, season } = useSeason();

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 180]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -60]);

  const bgImage = isSummer ? SUMMER_BG2 : WINTER_BG2;

  const content = isSummer
    ? {
        tag: "Kashmir in Summer",
        headline: ["Discover the", "Beauty of Kashmir"],
        sub: "Where ancient Mughal gardens bloom and Dal Lake shimmers at golden hour. True Valley Travels — your insider companion through the world's most breathtaking valley.",
        cta1: "Explore Summer Tours",
        cta2: "View Destinations",
        overlay: "from-black/70 via-black/30 to-transparent",
      }
    : {
        tag: "Kashmir in Winter",
        headline: ["A Snow", "Wonderland Awaits"],
        sub: "Gulmarg blanketed in snow, gondola rides above the clouds, skiing on Himalayan slopes. The valley transforms into something from a dream.",
        cta1: "Explore Winter Tours",
        cta2: "View Destinations",
        overlay: "from-[#0a1628]/80 via-[#0a2040]/40 to-transparent",
      };

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={season}
            src={bgImage}
            alt="Kashmir"
            className="w-full h-[115%] object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            onError={(e) => {
              e.currentTarget.src = isSummer ? SUMMER_BG : WINTER_BG;
            }}
          />
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-b ${content.overlay}`} />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <FloatingParticle key={i} isSummer={isSummer} index={i} />
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        className="container relative z-20 mx-auto px-4 md:px-6 text-center pt-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          className="max-w-5xl mx-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="inline-flex items-center gap-2 text-secondary font-semibold tracking-widest uppercase text-sm bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            {content.tag}
          </motion.span>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold leading-tight"
          >
            {content.headline[0]}
            <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={season}
                className="italic text-secondary"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
              >
                {content.headline[1]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            {content.sub}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#packages"
              className="bg-secondary text-white px-8 py-4 rounded-md text-base font-semibold hover:bg-secondary/90 transition-colors w-full sm:w-auto text-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.cta1}
            </motion.a>
            <motion.a
              href="#destinations"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/50 px-8 py-4 rounded-md text-base font-semibold hover:bg-white/20 transition-colors w-full sm:w-auto text-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.cta2}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Search bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-0"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto bg-white rounded-t-2xl p-5 shadow-2xl border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Destination</label>
              <select className="w-full bg-muted/40 border border-border rounded-md px-3 py-3 text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition">
                <option>Where are you going?</option>
                <option>Dal Lake, Srinagar</option>
                <option>Gulmarg</option>
                <option>Pahalgam</option>
                <option>Sonamarg</option>
                <option>Yusmarg</option>
                <option>Doodhpathri</option>
              </select>
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Travel Date</label>
              <input type="date" className="w-full bg-muted/40 border border-border rounded-md px-3 py-3 text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition" />
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Travellers</label>
              <select className="w-full bg-muted/40 border border-border rounded-md px-3 py-3 text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition">
                <option>2 Adults, 0 Children</option>
                <option>1 Adult</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
                <option>Group (5+)</option>
              </select>
            </div>
            <motion.button
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-md font-semibold text-sm whitespace-nowrap w-full md:w-auto transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Search Tours
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase rotate-90 origin-center mb-6">Scroll</span>
        <div className="w-px h-16 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-secondary"
          />
        </div>
      </motion.div>
    </section>
  );
}
