import React from "react";
import { motion } from "framer-motion";

type Feature = { title: string; desc: string; icon: string };

const features: Feature[] = [
  { title: "Local Expertise", desc: "Born and raised in Kashmir — we know every hidden trail, shikara owner, and family-run wazwan kitchen in the valley.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Curated Stays", desc: "Every property — houseboat, mountain lodge, or luxury resort — is personally inspected by our team.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "24/7 Concierge", desc: "Your personal guide is always reachable — from airport arrival to farewell. Every detail handled for you.", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { title: "Authentic Culture", desc: "Dine with local families, learn pashmina weaving, attend a traditional feast — the real Kashmir, not a postcard of it.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { title: "Flexible Packages", desc: "Budget to ultra-luxury, solo to large groups — we build itineraries around your time, taste, and budget.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { title: "Trained Guides", desc: "All our guides are certified, bilingual, first-aid trained, and deeply passionate about Kashmir's heritage.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

const safetyFeatures: Feature[] = [
  {
    title: "Safety First",
    desc: "Your safety isn't just a priority—it's our sacred promise. We meticulously plan every journey with absolute responsibility, verified routes, and constant support to ensure you explore the Himalayas with complete peace of mind.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Local Drivers",
    desc: "Our drivers are true sons of the soil who know these winding mountain roads by heart. Their deep local knowledge, calm expertise, and warm hospitality make every transfer safe and comfortable.",
    icon: "M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-7 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0z",
  },
  {
    title: "Verified Routes",
    desc: "Every itinerary is mapped on routes we know personally—checked for weather, road conditions, and seasonal access so your journey stays smooth from Srinagar to the remotest valley.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "24/7 Support",
    desc: "From the moment you land until you depart, our team is reachable around the clock. Emergencies, itinerary changes, or a simple question—we are always just a call away.",
    icon: "M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      className="group space-y-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <motion.div
        className="w-14 h-14 border-2 border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.06, rotate: 5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={feature.icon} />
        </svg>
      </motion.div>
      <h4 className="font-serif font-bold text-foreground uppercase tracking-wide text-base">{feature.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="our-story" className="py-14 md:py-24 bg-white overflow-hidden season-transition">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-16">
          <motion.p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Value Before Business
          </motion.p>
          <motion.h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}>
            We Offer The Best
          </motion.h2>
          <motion.div className="w-12 h-0.5 bg-secondary mx-auto mt-5"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-w-0">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 min-w-0">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>

          <motion.div className="relative pb-16 sm:pb-12 lg:pb-8 pr-0 sm:pr-2 lg:pr-6 min-w-0 overflow-hidden sm:overflow-visible"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>

            <motion.div
              className="bg-white border border-border/60 shadow-md p-8 sm:p-12 flex flex-col items-center text-center"
              whileHover={{ scale: 1.01 }}
            >
              <img
                src="/logo.jpeg"
                alt="True Valley Travels"
                className="w-40 h-40 object-contain mb-5"
                style={{ mixBlendMode: "multiply" }}
              />
              <h3 className="font-serif text-2xl font-bold text-primary uppercase tracking-wide leading-tight mb-1">
                True Valley
              </h3>
              <h3 className="font-serif text-2xl font-bold text-primary uppercase tracking-wide leading-tight mb-1">
                Travels
              </h3>
              <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
                Kashmir · Est. 2009
              </p>
              <div className="w-10 h-0.5 bg-secondary mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Kashmir's most trusted travel partner — crafting unforgettable Himalayan escapes since 2009.
              </p>
            </motion.div>

            <motion.div
              className="absolute left-3 bottom-3 sm:-bottom-6 sm:-left-6 bg-secondary text-white p-4 sm:p-7 max-w-[min(100%,190px)] sm:max-w-[210px]"
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.04, rotate: -1 }}>
              <div className="text-3xl sm:text-4xl font-serif font-bold mb-1">15+</div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/85 leading-snug">Years crafting perfect Himalayan escapes</div>
            </motion.div>

            <motion.div
              className="absolute top-3 right-3 sm:top-4 sm:right-0 sm:-right-4 bg-white p-3 sm:p-4 shadow-xl border border-border"
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

        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
