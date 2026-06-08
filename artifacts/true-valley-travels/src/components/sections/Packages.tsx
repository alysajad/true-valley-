import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Clock, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useSeason } from "@/context/SeasonContext";
import { packagesBySeason, type Package } from "@/data/packages";

/* Tier → accent color map: Budget=green-teal, Premium=primary (navy), Luxury=purple, Ultra-Luxury=secondary (orange) */
const TIER_STYLE: Record<string, { badge: string; accent: string }> = {
  "Budget":       { badge: "bg-emerald-600 text-white",   accent: "border-emerald-500" },
  "Premium":      { badge: "bg-primary text-white",       accent: "border-primary" },
  "Luxury":       { badge: "bg-violet-700 text-white",    accent: "border-violet-600" },
  "Ultra-Luxury": { badge: "bg-secondary text-white",     accent: "border-secondary" },
};

function TiltCard({ pkg, i }: { pkg: Package; i: number }) {
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
      <Link href={`/packages/${pkg.slug}`} className="block h-full">
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

            {/* Save badge — top right (Popular takes priority) */}
            {pkg.popular ? (
              <span className="absolute top-3 right-3 bg-secondary text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                ★ Most Popular
              </span>
            ) : (
              <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                Save ₹{pkg.save}
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
            <h3 className="text-base font-serif font-bold text-primary uppercase tracking-wide mb-1 leading-tight">
              {pkg.title}
            </h3>
            {/* Route */}
            <p className="text-[11px] text-muted-foreground mb-3 leading-snug">{pkg.route}</p>

            {/* Price block */}
            <div className="flex items-end justify-between mb-4 pb-4 border-b border-border">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Starting</span>
                  <span className="text-[11px] text-muted-foreground/70 line-through">₹{pkg.originalPrice}</span>
                </div>
                <span className="text-2xl font-serif font-bold text-secondary leading-none mt-0.5">₹{pkg.price}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Per Pax</p>
                {pkg.minPax && <p className="text-[9px] text-muted-foreground/70">{pkg.minPax}</p>}
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-2 flex-1 mb-5">
              {pkg.highlights.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2 text-muted-foreground text-[12px]">
                  <Check size={13} className="text-secondary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA — whole card links to detail page, so this is a visual button */}
            <span className="flex w-full items-center justify-center gap-2 bg-primary text-white py-3 text-[11px] font-bold uppercase tracking-[0.2em] group-hover:bg-secondary transition-colors duration-300">
              View Details
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Packages() {
  const { isSummer, season } = useSeason();
  const pkgs = packagesBySeason(isSummer ? "summer" : "winter");

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
            Every itinerary is crafted around your pace — from budget explorers to ultra-luxury seekers. Tap any package for the full day-by-day plan.
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
