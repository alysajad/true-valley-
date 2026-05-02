import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

const features = [
  {
    title: "Local Expertise",
    desc: "Born and raised in Kashmir. We know every mountain pass, hidden waterfall, and shikara owner in the valley.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Curated Stays",
    desc: "From heritage houseboats to luxury mountain resorts, we personally inspect and vet every property we recommend.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "24/7 Concierge",
    desc: "Your personal guide is always reachable. We handle everything — transport, reservations, surprises — so you only enjoy.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "Authentic Culture",
    desc: "Dine with local families, learn Kashmiri pashmina weaving, attend a traditional wazwan feast — the real Kashmir awaits.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

export default function WhyChooseUs() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const { isSummer } = useSeason();
  const imageUrl = isSummer
    ? "https://images.unsplash.com/photo-1597062232218-c875f79e9028?w=900&q=80&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80&auto=format&fit=crop";

  return (
    <section id="our-story" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-secondary font-semibold tracking-widest uppercase text-sm block mb-4">
                The True Valley Difference
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                We Don't Just Guide You.<br />We Host You.
              </h2>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                Kashmir is more than a destination — it's an emotion. Most agencies hand you a checklist of sights. We hand you a tapestry of experiences woven with local warmth and uncompromising attention to detail.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="group space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary"
                    whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "hsl(var(--secondary) / 0.2)" }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={feature.icon} />
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-serif font-bold text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:gap-3 transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ x: 4 }}
            >
              Plan your journey with us
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </motion.a>
          </div>

          {/* Right image with parallax */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src={imageUrl}
                alt="Kashmir landscape"
                className="w-full h-[115%] object-cover object-center"
                style={{ y: imageY }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-secondary text-white p-7 rounded-2xl shadow-2xl max-w-[220px]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.04, rotate: -1 }}
            >
              <div className="text-4xl font-serif font-bold mb-1">15+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/85">Years of crafting perfect Himalayan escapes</div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-border"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: 3 }}
            >
              <div className="text-2xl font-bold text-primary">4.9</div>
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="hsl(var(--secondary))"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <div className="text-xs text-muted-foreground font-medium">Rating</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
