import React from "react";
import { motion } from "framer-motion";

const contactInfo = [
  {
    label: "Call us",
    value: "+91 98765 43210",
    icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.38 2 2 0 0 1 3 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  },
  {
    label: "Email us",
    value: "hello@truevalley.in",
    icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6",
  },
  {
    label: "Visit us",
    value: "Srinagar, Jammu & Kashmir",
    icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-secondary font-semibold tracking-widest uppercase text-sm block mb-4"
          >
            Begin Your Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground"
          >
            Let's Plan Your Kashmir Escape
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <h3 className="text-xl font-serif font-bold mb-3">True Valley Travels</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-7">
                Tell us your travel dates, preferences, and budget. Our Kashmir experts will craft a bespoke itinerary within 24 hours.
              </p>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">{info.label}</div>
                      <div className="text-sm font-medium">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative h-40 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&auto=format&fit=crop"
                alt="Kashmir"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-4">
                <span className="text-white font-serif font-bold text-sm">Kashmir awaits you</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-border"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm transition" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm transition" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm transition" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Travel Dates</label>
                  <input type="date" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Number of Travellers</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm bg-transparent transition">
                    <option>2 Adults</option>
                    <option>1 Adult</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                    <option>Group (5+)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">Package of Interest</label>
                <select className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm bg-transparent transition">
                  <option>Valley Essential (Budget)</option>
                  <option>Kashmir Classic (Premium)</option>
                  <option>Snow & Serenity (Luxury)</option>
                  <option>The Emperor's Retreat (Ultra-Luxury)</option>
                  <option>Custom / Not sure yet</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-sm resize-none transition" placeholder="Tell us about your dream Kashmir trip..." />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-lg text-base font-semibold transition-colors"
                whileHover={{ scale: 1.01, y: -1 }}
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
