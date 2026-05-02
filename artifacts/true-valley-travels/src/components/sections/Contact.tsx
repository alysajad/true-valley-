import React from "react";
import { motion } from "framer-motion";

const info = [
  { label: "Call Us", value: "+91 98765 43210", icon: "M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.69 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 6.18 2 2 0 0 1 4.11 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
  { label: "Email Us", value: "hello@truevalley.in", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6" },
  { label: "Visit Us", value: "Srinagar, J&K, India", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-14 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            Plan Your Kashmir Escape
          </motion.h2>
          <motion.div className="w-12 h-0.5 bg-secondary mx-auto mt-5" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Info sidebar */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <div className="bg-primary text-white p-8">
              <h3 className="font-serif font-bold text-xl uppercase tracking-wide mb-3">True Valley Travels</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-7">
                Tell us your travel dates, preferences, and budget. Our Kashmir experts will craft a bespoke itinerary within 24 hours.
              </p>
              <div className="space-y-5">
                {info.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-widest">{item.label}</div>
                      <div className="text-sm font-medium text-white/90">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-36 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&auto=format&fit=crop" alt="Kashmir" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/65 flex items-end p-4">
                <span className="font-serif font-bold text-white text-sm uppercase tracking-wide">Kashmir Awaits</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2 bg-white border border-border p-5 sm:p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65 }}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[["First Name", "John"], ["Last Name", "Doe"]].map(([label, ph]) => (
                  <div key={label} className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">{label}</label>
                    <input type="text" placeholder={ph} className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition" />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Travel Date</label>
                  <input type="date" className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Travellers</label>
                  <select className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition">
                    <option>2 Adults</option>
                    <option>1 Adult</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                    <option>Group (5+)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Package of Interest</label>
                <select className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition">
                  <option>Valley Essential (Budget)</option>
                  <option>Kashmir Classic (Premium)</option>
                  <option>Garden & Peaks (Luxury)</option>
                  <option>Emperor's Retreat (Ultra-Luxury)</option>
                  <option>Custom / Not sure yet</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Message</label>
                <textarea rows={4} placeholder="Tell us about your dream Kashmir trip..." className="w-full border border-border px-4 py-3 text-sm resize-none focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition" />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-secondary hover:bg-primary text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Inquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
