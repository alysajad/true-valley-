import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    id: "budget",
    title: "Valley Essential",
    tier: "Budget",
    price: "₹15,000",
    duration: "4 Days / 3 Nights",
    image: "/images/package-budget.png",
    features: ["Mughal Gardens Tour", "Standard Hotel Stay", "Shikara Ride", "Breakfast Included"],
  },
  {
    id: "premium",
    title: "Kashmir Classic",
    tier: "Premium",
    price: "₹35,000",
    duration: "6 Days / 5 Nights",
    image: "/images/package-premium.png",
    features: ["Premium Houseboat Stay", "Gulmarg Gondola Ride", "Pahalgam Day Trip", "Half-Board Meals"],
    popular: true,
  },
  {
    id: "luxury",
    title: "Snow & Serenity",
    tier: "Luxury",
    price: "₹75,000",
    duration: "7 Days / 6 Nights",
    image: "/images/package-luxury.png",
    features: ["5-Star Resort Stays", "Private Skiing Lessons", "Exclusive Shikara", "Full-Board Fine Dining"],
  },
  {
    id: "ultra",
    title: "The Emperor's Retreat",
    tier: "Ultra-Luxury",
    price: "₹1,50,000",
    duration: "10 Days / 9 Nights",
    image: "/images/package-ultra.png",
    features: ["Private Mountain Villa", "Helicopter Transfers", "Personal Butler & Guide", "Bespoke Cultural Experiences"],
  },
];

function PackageCard({ pkg, index }: { pkg: any; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-border group"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {pkg.popular && (
          <div className="absolute top-4 right-4 z-20 bg-secondary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
            Most Popular
          </div>
        )}
        
        <div className="h-64 relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
          <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
          <img 
            src={pkg.image} 
            alt={pkg.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <span className="text-white/90 text-sm font-medium tracking-widest uppercase">{pkg.tier}</span>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col h-[calc(100%-16rem)]" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{pkg.title}</h3>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold text-primary">{pkg.price}</span>
            <span className="text-muted-foreground text-sm">/ person</span>
          </div>
          
          <div className="text-sm font-medium text-primary mb-6 bg-primary/5 inline-block px-3 py-1 rounded-full w-fit">
            {pkg.duration}
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {pkg.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                <Check className="w-5 h-5 text-secondary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg transition-transform hover:scale-[1.02]">
            View Details
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="py-24 md:py-32 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-medium tracking-widest uppercase text-sm"
          >
            Curated Experiences
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6"
          >
            Journeys Crafted for You
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From quiet houseboat mornings to thrilling alpine adventures, 
            choose how you want to experience the valley.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
