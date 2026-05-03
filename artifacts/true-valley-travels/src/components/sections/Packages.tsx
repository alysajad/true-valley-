import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Clock, Star } from "lucide-react";
import { useSeason } from "@/context/SeasonContext";

const summerPackages = [
  {
    id: "s1", title: "Budget Explorer", tier: "Budget", price: "6,999", duration: "5D / 4N",
    minPax: "Min. 2 Pax",
    image: "/packages/s1_shikara.jpg",
    fallback: "/destinations/dal_summer.jpg",
    features: ["Private Transfers Included", "Premium Hotel Stay", "Daily Breakfast Included", "Guided Sightseeing Tours"],
  },
  {
    id: "s2", title: "Classic Delight", tier: "Premium", price: "11,999", duration: "10D / 9N",
    minPax: "Min. 2 Pax",
    image: "/packages/s2_houseboat.jpg",
    fallback: "/destinations/dal_summer.jpg",
    features: ["4 Destinations + Doodhpathri", "Comfortable Hotels | Kid-Friendly", "Private Transfers Included", "Breakfast & Sightseeing"],
    popular: true,
  },
  {
    id: "s3", title: "Royal Summer Paradise", tier: "Luxury", price: "19,999", duration: "12D / 11N",
    minPax: "Min. 2 Pax",
    image: "/packages/s3_sonamarg.jpg",
    fallback: "/destinations/sonamarg_summer.jpg",
    features: ["Family | Honeymoon | Leisure", "Premium Stay Throughout", "Private Transfers Included", "Breakfast & Sightseeing"],
  },
  {
    id: "s4", title: "Adventure Seekers", tier: "Ultra-Luxury", price: "24,999", duration: "8D / 7N",
    minPax: "Min. 2 Pax",
    image: "/packages/s4_pahalgam.jpg",
    fallback: "/destinations/pahalgam_summer.jpg",
    features: ["Adventure Kashmir Thrill", "Premium Adventure Stay", "Private Transfers Included", "Breakfast & Sightseeing"],
  },
];

const winterPackages = [
  {
    id: "w1", title: "Budget Explorer", tier: "Budget", price: "6,999", duration: "5D / 4N",
    minPax: "Min. 2 Pax",
    image: "/packages/w1_snow_walk.jpg",
    fallback: "/destinations/gulmarg_winter.jpg",
    features: ["Private Transfers Included", "Premium Hotel Stay", "Daily Breakfast Included", "Guided Sightseeing Tours"],
  },
  {
    id: "w2", title: "Winter Special", tier: "Premium", price: "17,999", duration: "6D / 5N",
    minPax: "Min. 2 Pax",
    image: "/packages/w2_gondola.jpg",
    fallback: "/destinations/gulmarg_winter.jpg",
    features: ["Guaranteed Snow Experience", "Gulmarg Skiing Included", "Sonamarg & Pahalgam Visit", "Private Transfers + Breakfast"],
    popular: true,
  },
  {
    id: "w3", title: "Classic Delight", tier: "Luxury", price: "11,999", duration: "10D / 9N",
    minPax: "Min. 2 Pax",
    image: "/packages/w3_skiing.jpg",
    fallback: "/destinations/gulmarg_winter.jpg",
    features: ["4 Destinations + Doodhpathri", "Comfortable Hotels | Kid-Friendly", "Private Transfers Included", "Breakfast & Sightseeing"],
  },
  {
    id: "w4", title: "Adventure Seekers", tier: "Ultra-Luxury", price: "24,999", duration: "8D / 7N",
    minPax: "Min. 2 Pax",
    image: "/packages/w4_apharwat.jpg",
    fallback: "/destinations/gulmarg_winter.jpg",
    features: ["Snow Adventure Kashmir Thrill", "Premium Mountain Lodge", "Private Transfers Included", "Breakfast & Sightseeing"],
  },
];

/* Tier → accent color map: Budget=green-teal, Premium=primary (navy), Luxury=purple, Ultra-Luxury=secondary (orange) */
const TIER_STYLE: Record<string, { badge: string; accent: string }> = {
  "Budget":       { badge: "bg-emerald-600 text-white",   accent: "border-emerald-500" },
  "Premium":      { badge: "bg-primary text-white",       accent: "border-primary" },
  "Luxury":       { badge: "bg-violet-700 text-white",    accent: "border-violet-600" },
  "Ultra-Luxury": { badge: "bg-secondary text-white",     accent: "border-secondary" },
};

function TiltCard({ pkg, i }: { pkg: typeof summerPackages[0] & { popular?: boolean }; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(useSpring(my, { stiffness: 180, damping: 22 }), [-0.5, 0.5], ["6deg", "-6deg"]);
  const ry = useTransform(useSpring(mx, { stiffness: 180, damping: 22 }), [-0.5, 0.5], ["-6deg", "6deg"]);
  const tier = TIER_STYLE[pkg.tier] ?? TIER_STYLE["Budget"];

  return (
    <motion.div
      className="h-full"
      style={{ perspective: 1100 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay: i * 0.1 }}
    >
      <motion.div
        className={`h-full bg-white group cursor-pointer flex flex-col border-t-4 ${tier.accent} shadow-sm`}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        whileHover={{ boxShadow: "0 28px 64px rgba(25,53,85,0.16)", y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden" style={{ transform: "translateZ(18px)" }}>
          <motion.img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.55 }}
            onError={(e) => { e.currentTarget.src = pkg.fallback || "https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=800&q=80"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Tier badge — top left */}
          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${tier.badge}`}>
            {pkg.tier}
          </span>

          {/* Popular badge — top right */}
          {pkg.popular && (
            <span className="absolute top-3 right-3 bg-secondary text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
              ★ Most Popular
            </span>
          )}

          {/* Duration on image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
            <Clock size={11} className="opacity-80"/>
            <span className="text-[11px] font-semibold">{pkg.duration}</span>
          </div>

          {/* Stars — bottom right */}
          <div className="absolute bottom-3 right-3 flex gap-0.5">
            {[...Array(5)].map((_, s) => <Star key={s} size={10} fill="#ffa11a" className="text-secondary" />)}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1" style={{ transform: "translateZ(28px)" }}>
          {/* Title */}
          <h3 className="text-base font-serif font-bold text-primary uppercase tracking-wide mb-3 leading-tight">
            {pkg.title}
          </h3>

          {/* Price block */}
          <div className="flex items-end justify-between mb-4 pb-4 border-b border-border">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Starting</span>
              <span className="text-2xl font-serif font-bold text-secondary">₹{pkg.price}</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Per Pax</p>
              {pkg.minPax && <p className="text-[9px] text-muted-foreground/70">{pkg.minPax}</p>}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-2 flex-1 mb-5">
            {pkg.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-2 text-muted-foreground text-[12px]">
                <Check size={13} className="text-secondary shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#enquiry-form"
            className="block w-full text-center bg-primary text-white py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-colors duration-300"
            whileHover={{ letterSpacing: "0.26em" }}
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
    <section id="packages" className="py-14 md:py-24 bg-muted/20 season-transition">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <motion.p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {isSummer ? "Summer Packages" : "Winter Packages"}
          </motion.p>
          <motion.h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}>
            {isSummer ? "Explore Kashmir Packages" : "Winter Tour Packages"}
          </motion.h2>
          <motion.div className="w-12 h-0.5 bg-secondary mx-auto mt-5"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
          <motion.p className="text-muted-foreground text-sm mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            Every itinerary is crafted around your pace — from budget explorers to ultra-luxury seekers.
          </motion.p>
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
