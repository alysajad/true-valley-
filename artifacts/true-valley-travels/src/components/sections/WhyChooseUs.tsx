import React from "react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Local Expertise",
      desc: "We are born and raised in Kashmir. We know the hidden valleys and secret trails."
    },
    {
      title: "Curated Stays",
      desc: "From heritage houseboats to luxury resorts, we personally vet every property."
    },
    {
      title: "24/7 Concierge",
      desc: "Your personal guide is always available. We handle everything, you just enjoy."
    },
    {
      title: "Authentic Culture",
      desc: "Dine with locals, learn traditional crafts, and experience the real Kashmir."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-secondary font-medium tracking-widest uppercase text-sm block mb-4">
                The True Valley Difference
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                We Don't Just Guide You.<br/>We Host You.
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                Kashmir is more than a destination on a map—it's an emotion. Most agencies 
                give you a checklist of spots. We give you a tapestry of experiences woven 
                with local warmth and uncompromising luxury.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              {features.map((feature, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5l10 -10"></path></svg>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden">
              <img src="/images/dest-sonamarg.png" alt="Kashmir landscape" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-secondary p-8 rounded-xl shadow-xl max-w-xs border border-secondary">
              <div className="text-4xl font-serif font-bold text-white mb-2">15+</div>
              <div className="text-sm font-bold text-white/90 uppercase tracking-wider">Years of crafting perfect Himalayan escapes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
