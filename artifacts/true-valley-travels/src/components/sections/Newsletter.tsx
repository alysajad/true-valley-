import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const { isSummer } = useSeason();

  const bgImage = isSummer
    ? "https://images.unsplash.com/photo-1476514525635-39a29b10b8e7?w=1600&q=80&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1478827397896-7b7ccfc97d4a?w=1600&q=80&auto=format&fit=crop";

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img src={bgImage} alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block text-secondary font-semibold tracking-widest uppercase text-sm mb-5 bg-white/10 px-4 py-1.5 rounded-full"
          >
            Stay Connected
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5">
            Ready to Experience Kashmir?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Get exclusive seasonal offers, curated travel tips, and early access to limited packages.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.input
              type="email"
              placeholder="Your email address"
              className="px-5 py-4 rounded-md flex-1 max-w-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              type="submit"
              className="bg-secondary text-white px-8 py-4 rounded-md font-semibold text-sm hover:bg-secondary/90 transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe Now
            </motion.button>
          </form>
          <p className="text-white/40 text-xs mt-4">No spam, unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
