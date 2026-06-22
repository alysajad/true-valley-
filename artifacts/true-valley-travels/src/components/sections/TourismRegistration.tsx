import React from "react";
import { motion } from "framer-motion";

export default function TourismRegistration() {
  return (
    <section className="py-14 md:py-20 bg-white season-transition overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 min-w-0">
        <motion.p
          className="text-muted-foreground text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Your comfort, safety, and joy remain at the heart of everything we do. Let us guide you
          through hidden trails, cultural heartlands, and breathtaking Himalayan vistas, creating
          memories that stay with you long after the journey ends.
        </motion.p>

        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-border/40 p-5 sm:p-6 md:p-8 mb-5 max-w-xs mx-auto">
            <img
              src="/jk-tourism.png"
              alt="J&K Department of Tourism"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mx-auto"
            />
          </div>
          <p className="font-serif font-bold text-foreground uppercase tracking-wide text-xs sm:text-sm md:text-base px-2">
            Registered with J&amp;K Department of Tourism
          </p>
        </motion.div>
      </div>
    </section>
  );
}
