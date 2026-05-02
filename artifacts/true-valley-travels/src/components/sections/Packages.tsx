import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useSeason } from "@/context/SeasonContext";

const summerPackages = [
  {
    id: "budget",
    title: "Valley Essential",
    tier: "Budget",
    price: "15,000",
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80&auto=format&fit=crop",
    features: ["Mughal Gardens & Nishat Bagh", "Standard Hotel Stay", "Shikara Ride on Dal Lake", "Breakfast Included"],
  },
  {
    id: "premium",
    title: "Kashmir Classic",
    tier: "Premium",
    price: "35,000",
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1597735881925-45af51cedb7a?w=800&q=80&auto=format&fit=crop",
    features: ["Heritage Houseboat Stay", "Pahalgam River Walk", "Gondola Ride", "Half-Board Meals"],
    popular: true,
  },
  {
    id: "luxury",
    title: "Garden & Peaks",
    tier: "Luxury",
    price: "75,000",
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=800&q=80&auto=format&fit=crop",
    features: ["5-Star Resort Stays", "Exclusive Shikara Sunrise", "Sonamarg Day Trek", "Full-Board Fine Dining"],
  },
  {
    id: "ultra",
    title: "The Emperor's Retreat",
    tier: "Ultra-Luxury",
    price: "1,50,000",
    duration: "10 Days / 9 Nights",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&auto=format&fit=crop",
    features: ["Private Mountain Villa", "Helicopter Valley Tour", "Personal Butler & Guide", "Bespoke Cultural Evenings"],
  },
];

const winterPackages = [
  {
    id: "winter-budget",
    title: "Snow Escapade",
    tier: "Budget",
    price: "18,000",
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80&auto=format&fit=crop",
    features: ["Gulmarg Snow Walk", "Sledding & Ice Activities", "Standard Lodge Stay", "Hot Meals Included"],
  },
  {
    id: "winter-premium",
    title: "Ski & Stay",
    tier: "Premium",
    price: "45,000",
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1551524358-f34e3264bc65?w=800&q=80&auto=format&fit=crop",
    features: ["Beginner Ski Lessons", "Gulmarg Gondola Ride", "Luxury Lodge Stay", "Half-Board Meals"],
    popular: true,
  },
  {
    id: "winter-luxury",
    title: "White Kashmir",
    tier: "Luxury",
    price: "90,000",
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1478827397896-7b7ccfc97d4a?w=800&q=80&auto=format&fit=crop",
    features: ["5-Star Mountain Lodge", "Advanced Ski Coaching", "Frozen Lake Photography", "Full-Board Fine Dining"],
  },
  {
    id: "winter-ultra",
    title: "Maharaja Snow Retreat",
    tier: "Ultra-Luxury",
    price: "2,00,000",
    duration: "10 Days / 9 Nights",
    image: "https://images.unsplash.com/photo-1516912481800-3b51b2f58e56?w=800&q=80&auto=format&fit=crop",
    features: ["Exclusive Private Chalet", "Helicopter to Apharwat", "Personal Butler & Ski Coach", "Bespoke Winter Experiences"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function PackageCard({ pkg, index }: { pkg: typeof summerPackages[0] & { popular?: boolean }; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        className="relative h-full bg-white rounded-xl overflow-hidden border border-border group cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          borderColor: "hsl(var(--secondary))",
          y: -6,
        }}
        transition={{ duration: 0.3 }}
      >
        {pkg.popular && (
          <div className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-md shadow">
            Popular
          </div>
        )}

        <div className="h-[200px] relative overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <motion.img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 left-4 z-10 bg-secondary text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-md">
            {pkg.tier}
          </div>
        </div>

        <div className="p-6 flex flex-col" style={{ transform: "translateZ(30px)" }}>
          <div className="flex gap-0.5 mb-3 text-secondary">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">{pkg.title}</h3>
          <div className="flex items-baseline gap-1.5 mb-4 pb-4 border-b border-border">
            <span className="text-muted-foreground text-xs font-medium">From</span>
            <span className="text-2xl font-bold text-primary">₹{pkg.price}</span>
            <span className="text-muted-foreground text-xs">/ person</span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {pkg.duration}
          </div>
          <ul className="space-y-2.5 mb-6 flex-1">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
          <motion.a
            href="#contact"
            className="w-full bg-secondary text-white text-center py-3 rounded-md text-sm font-semibold block"
            whileHover={{ backgroundColor: "hsl(var(--primary))" }}
            transition={{ duration: 0.25 }}
          >
            Book Now
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const { isSummer, season } = useSeason();
  const packages = isSummer ? summerPackages : winterPackages;

  return (
    <section id="packages" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-secondary font-semibold tracking-widest uppercase text-sm mb-3 block"
          >
            {isSummer ? "Summer Packages" : "Winter Packages"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-5"
          >
            {isSummer ? "Journeys Crafted for You" : "Winter Escapes Await"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {isSummer
              ? "From quiet houseboat mornings to Mughal garden afternoons — choose how you experience the valley."
              : "From gentle snow walks to world-class skiing on Himalayan slopes — the valley in winter is unforgettable."}
          </motion.p>
        </div>

        <motion.div
          key={season}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
