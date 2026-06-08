import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

const reviews = [
  { text: "True Valley made our Kashmir trip absolutely effortless. Abuzar personally ensured our houseboat on Dal Lake was perfect, and the Shikara ride at sunset was magical. Every detail was taken care of.", name: "Amit Sharma", location: "Mumbai, India", package: "Kashmir Paradise Tour", initials: "AS" },
  { text: "We booked our honeymoon with True Valley and it was beyond our dreams. Iqra planned a romantic itinerary — the candlelit dinner on the houseboat and the Gulmarg gondola made it unforgettable.", name: "Priya & Rohan Mehta", location: "Pune, India", package: "Kashmir Honeymoon Tour", initials: "PM" },
  { text: "Pahalgam and the Betaab valley were stunning, and our driver felt more like a friend by the end. Iqra Bashir was always a call away. Genuinely the most well-organised trip our family has taken.", name: "Venkatesh Iyer", location: "Bengaluru, India", package: "Best of Kashmir Tour", initials: "VI" },
  { text: "From the Mughal gardens to the Wazwan dinner, every moment felt authentic. Abuzar and his team know Kashmir like the back of their hand. We never once felt like tourists being rushed around.", name: "Ananya Banerjee", location: "Kolkata, India", package: "Charismatic Kashmir Tour", initials: "AB" },
  { text: "Travelling with kids and elderly parents is never easy, but True Valley handled everything — comfortable cabs, the right hotels and a relaxed pace. Sonamarg was the highlight for the whole family.", name: "Harpreet Singh", location: "Delhi, India", package: "Kashmir Family Tour", initials: "HS" },
  { text: "True Valley gave us an experience we'll cherish forever. The service was world-class and every single detail across the valley was considered and flawless. Worth every bit of the journey from London.", name: "Sarah & James Jenkins", location: "London, UK", package: "Grand Kashmir Tour", initials: "SJ" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);

  /* Auto-rotate every 4 s — pauses on hover */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-28">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=1600&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/82" />
      </motion.div>

      <div
        className="container mx-auto px-4 md:px-6 relative z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="text-center mb-14">
          <motion.p
            className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Client Testimonials
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            Kashmir Talks
          </motion.h2>
          <motion.div className="w-12 h-0.5 bg-secondary mx-auto mt-5" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <svg className="text-secondary/40 mx-auto mb-6" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
              </svg>

              <p className="text-white/90 text-base md:text-xl font-light italic leading-relaxed mb-8 md:mb-10 px-2">
                "{reviews[active].text}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center font-serif font-bold text-white text-lg">
                  {reviews[active].initials}
                </div>
                <div className="text-left">
                  <div className="font-serif font-bold text-white uppercase tracking-wide">{reviews[active].name}</div>
                  <div className="text-secondary text-xs font-semibold uppercase tracking-widest">{reviews[active].location}</div>
                  <div className="text-white/50 text-xs mt-0.5">{reviews[active].package}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-12">
            {reviews.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className="h-2 rounded-full transition-all duration-300"
                animate={{ width: active === i ? 32 : 8, backgroundColor: active === i ? "#ffa11a" : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex justify-center gap-4 mt-8">
            {[
              { label: "prev", d: "M15 18l-6-6 6-6", onClick: () => setActive((active - 1 + reviews.length) % reviews.length) },
              { label: "next", d: "M9 18l6-6-6-6", onClick: () => setActive((active + 1) % reviews.length) },
            ].map((btn) => (
              <motion.button
                key={btn.label}
                onClick={btn.onClick}
                className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/70 hover:border-secondary hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={btn.d.replace("M15 18l-6-6 6-6", "15,18 9,12 15,6").replace("M9 18l6-6-6-6", "9,18 15,12 9,6")} />
                  <path d={btn.d} />
                </svg>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
