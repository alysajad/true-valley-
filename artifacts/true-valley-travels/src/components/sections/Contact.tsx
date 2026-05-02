import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-4 block">
                Begin Your Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Let's Plan Your <br/>Kashmir Escape
              </h2>
              <p className="text-white/70 text-lg mb-12 max-w-md">
                Tell us about your dream trip. Our experts will craft a bespoke itinerary tailored to your preferences.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Call us</div>
                    <div className="font-medium">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Email us</div>
                    <div className="font-medium">hello@truevalley.in</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl text-foreground">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Interested Package</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 bg-transparent">
                    <option>Valley Essential (Budget)</option>
                    <option>Kashmir Classic (Premium)</option>
                    <option>Snow & Serenity (Luxury)</option>
                    <option>The Emperor's Retreat (Ultra-Luxury)</option>
                    <option>Custom / Not sure yet</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Tell us about your travel dates and preferences..."></textarea>
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground py-6 text-lg rounded-xl">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
