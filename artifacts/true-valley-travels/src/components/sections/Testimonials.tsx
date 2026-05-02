import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    text: "True Valley gave us an experience we will cherish forever. From the luxurious houseboat on Dal Lake at sunrise to our private guide in Pahalgam — every single detail was considered and flawless.",
    name: "Sarah & James Jenkins",
    location: "London, UK",
    package: "Kashmir Classic",
    avatar: "SJ",
  },
  {
    text: "We wanted authenticity without sacrificing comfort. Tariq and his team delivered beyond all expectations. The floating vegetable market at dawn, the wazwan dinner with a local family — incredible.",
    name: "Amit Sharma",
    location: "Mumbai, India",
    package: "Valley Essential",
    avatar: "AS",
  },
  {
    text: "The Emperor's Retreat package was worth every rupee. Helicopter transfers through the valley, a private butler, and views of the Himalayas from our villa that I'll never forget.",
    name: "Elena Rodriguez",
    location: "Dubai, UAE",
    package: "Emperor's Retreat",
    avatar: "ER",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-secondary font-semibold tracking-widest uppercase text-sm block mb-4"
          >
            Guest Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground"
          >
            Echoes from the Valley
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className="bg-background border border-border rounded-2xl p-8 relative group"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.10)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote mark */}
              <motion.div
                className="absolute top-6 right-8 text-secondary/15 font-serif text-8xl leading-none select-none"
                whileHover={{ scale: 1.1 }}
              >
                "
              </motion.div>

              <div className="flex gap-0.5 text-secondary mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-muted-foreground text-base mb-7 leading-relaxed relative z-10 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-sm shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-serif font-bold text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.location}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  {review.package}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
