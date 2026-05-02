import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useSeason } from "@/context/SeasonContext";

const summerPackages = [
  {
    id: "s1", title: "Valley Essential", tier: "Budget", price: "15,000", duration: "4D / 3N",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80&auto=format&fit=crop",
    features: ["Mughal Gardens & Nishat Bagh", "Standard Hotel Stay", "Shikara Ride on Dal Lake", "Breakfast Included"],
    color: "#ffa11a",
  },
  {
    id: "s2", title: "Kashmir Classic", tier: "Premium", price: "35,000", duration: "6D / 5N",
    image: "https://images.unsplash.com/photo-1597735881925-45af51cedb7a?w=800&q=80&auto=format&fit=crop",
    features: ["Heritage Houseboat Stay", "Pahalgam River Walk", "Gondola Ride Gulmarg", "Half-Board Meals"],
    popular: true, color: "#ffa11a",
  },
  {
    id: "s3", title: "Garden & Peaks", tier: "Luxury", price: "75,000", duration: "7D / 6N",
    image: "https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=800&q=80&auto=format&fit=crop",
    features: ["5-Star Resort Stays", "Exclusive Shikara Sunrise", "Sonamarg Day Trek", "Full-Board Fine Dining"],
    color: "#ffa11a",
  },
  {
    id: "s4", title: "Emperor's Retreat", tier: "Ultra-Luxury", price: "1,50,000", duration: "10D / 9N",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&auto=format&fit=crop",
    features: ["Private Mountain Villa", "Helicopter Valley Tour", "Personal Butler & Guide", "Bespoke Cultural Evenings"],
    color: "#ffa11a",
  },
];

const winterPackages = [
  {
    id: "w1", title: "Snow Escapade", tier: "Budget", price: "18,000", duration: "4D / 3N",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80&auto=format&fit=crop",
    features: ["Gulmarg Snow Walk", "Sledding & Ice Activities", "Standard Lodge Stay", "Hot Meals Included"],
    color: "#ffa11a",
  },
  {
    id: "w2", title: "Ski & Stay", tier: "Premium", price: "45,000", duration: "6D / 5N",
    image: "https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=800&q=80&auto=format&fit=crop",
    features: ["Beginner Ski Lessons", "Gulmarg Gondola Ride", "Luxury Lodge Stay", "Half-Board Meals"],
    popular: true, color: "#ffa11a",
  },
  {
    id: "w3", title: "White Kashmir", tier: "Luxury", price: "90,000", duration: "7D / 6N",
    image: "https://images.unsplash.com/photo-1478827397896-7b7ccfc97d4a?w=800&q=80&auto=format&fit=crop",
    features: ["5-Star Mountain Lodge", "Advanced Ski Coaching", "Frozen Lake Photography", "Full-Board Fine Dining"],
    color: "#ffa11a",
  },
  {
    id: "w4", title: "Maharaja Snow Retreat", tier: "Ultra-Luxury", price: "2,00,000", duration: "10D / 9N",
    image: "https://images.unsplash.com/photo-1516912481800-3b51b2f58e56?w=800&q=80&auto=format&fit=crop",
    features: ["Exclusive Private Chalet", "Helicopter to Apharwat", "Personal Butler & Ski Coach", "Bespoke Winter Experiences"],
    color: "#ffa11a",
  },
];

function TiltCard({ pkg, i }: { pkg: typeof summerPackages[0] & { popular?: boolean }; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(useSpring(y, { stiffness: 180, damping: 22 }), [-0.5, 0.5], ["7deg", "-7deg"]);
  const ry = useTransform(useSpring(x, { stiffness: 180, damping: 22 }), [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      className="h-full"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: i * 0.1 }}
    >
      <motion.div
        className="h-full bg-white group cursor-pointer border border-border overflow-hidden flex flex-col"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        whileHover={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)", y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <motion.img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.55 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {pkg.popular && (
            <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
              Most Popular
            </span>
          )}
          <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            {pkg.tier}
          </span>
          <div className="absolute bottom-3 left-4 text-white">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, s) => <Star key={s} size={12} fill="currentColor" className="text-secondary" />)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-lg font-serif font-bold text-foreground uppercase tracking-wide mb-1">{pkg.title}</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {pkg.duration}
          </div>
          <div className="border-t border-border pt-3 mb-4">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Starting from</span>
            <div className="text-2xl font-serif font-bold text-primary mt-0.5">₹{pkg.price}<span className="text-sm font-normal text-muted-foreground ml-1">/ person</span></div>
          </div>
          <ul className="space-y-2 flex-1 mb-5">
            {pkg.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-2 text-muted-foreground text-xs">
                <Check size={13} className="text-secondary shrink-0 mt-0.5" />{f}
              </li>
            ))}
          </ul>
          <motion.a
            href="#contact"
            className="block w-full text-center bg-primary text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
            whileHover={{ letterSpacing: "0.25em" }}
            transition={{ duration: 0.2 }}
          >
            Enquire Now
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const { isSummer, season } = useSeason();
  const pkgs = isSummer ? summerPackages : winterPackages;

  return (
    <section id="packages" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Select Your Activity
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            {isSummer ? "Explore Kashmir Packages" : "Winter Tour Packages"}
          </motion.h2>
          <motion.div
            className="w-12 h-0.5 bg-secondary mx-auto mt-5"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <motion.div
          key={season}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {pkgs.map((pkg, i) => <TiltCard key={pkg.id} pkg={pkg} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
}
