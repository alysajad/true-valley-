import React from "react";
import { motion } from "framer-motion";

const features = [
  { title: "Local Expertise", desc: "Born and raised in Kashmir — we know every hidden trail, shikara owner, and family-run wazwan kitchen in the valley.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Curated Stays", desc: "Every property — houseboat, mountain lodge, or luxury resort — is personally inspected by our team.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "24/7 Concierge", desc: "Your personal guide is always reachable — from airport arrival to farewell. Every detail handled for you.", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { title: "Authentic Culture", desc: "Dine with local families, learn pashmina weaving, attend a traditional feast — the real Kashmir, not a postcard of it.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { title: "Flexible Packages", desc: "Budget to ultra-luxury, solo to large groups — we build itineraries around your time, taste, and budget.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { title: "Trained Guides", desc: "All our guides are certified, bilingual, first-aid trained, and deeply passionate about Kashmir's heritage.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

export default function WhyChooseUs() {
  return (
    <section id="our-story" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-16">
          <motion.p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Value Before Business
          </motion.p>
          <motion.h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}>
            We Offer The Best
          </motion.h2>
          <motion.div className="w-12 h-0.5 bg-secondary mx-auto mt-5"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} className="group space-y-3"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: i * 0.08 }}>
                <motion.div
                  className="w-14 h-14 border-2 border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.06, rotate: 5 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </motion.div>
                <h4 className="font-serif font-bold text-foreground uppercase tracking-wide text-base">{f.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right column: logo card only */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>

            {/* Logo card — white background, single image */}
            <motion.div
              className="bg-white border border-border/60 shadow-md p-12 flex flex-col items-center text-center"
              whileHover={{ scale: 1.01 }}
            >
              <img
                src="/logo.jpeg"
                alt="True Valley Travels"
                className="w-48 h-48 object-contain mb-6"
              />
              <div className="w-10 h-0.5 bg-secondary mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Kashmir's most trusted travel partner — crafting unforgettable Himalayan escapes since 2009.
              </p>
            </motion.div>

            {/* Stat card overlay */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-secondary text-white p-7 max-w-[210px]"
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.04, rotate: -1 }}>
              <div className="text-4xl font-serif font-bold mb-1">15+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/85">Years crafting perfect Himalayan escapes</div>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              className="absolute top-4 -right-4 bg-white p-4 shadow-xl border border-border"
              initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: 3 }}>
              <div className="text-2xl font-serif font-bold text-primary">4.9</div>
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#ffa11a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Rating</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
