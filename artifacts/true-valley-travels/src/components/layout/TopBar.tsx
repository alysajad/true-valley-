import React from "react";
import { motion } from "framer-motion";
import { useSeason } from "@/context/SeasonContext";

export default function TopBar() {
  const { isSummer, toggleSeason } = useSeason();
  return (
    <div className="bg-primary text-white/80 text-[11px] font-medium hidden md:block border-b border-white/10">
      <div className="container mx-auto px-6 flex items-center justify-between h-10">
        {/* Left: contact */}
        <div className="flex items-center gap-5">
          <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.69 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 6.18 2 2 0 0 1 4.11 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 98765 43210
          </a>
          <a href="mailto:hello@truevalley.in" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
            hello@truevalley.in
          </a>
          <span className="text-white/30">|</span>
          <span className="text-white/60">Srinagar, Jammu &amp; Kashmir</span>
        </div>

        {/* Right: socials + season toggle + login */}
        <div className="flex items-center gap-4">
          {/* Social icons */}
          {[
            { title: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
            { title: "Instagram", d: "M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.5-10a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
            { title: "Twitter/X", d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
          ].map((s) => (
            <motion.a key={s.title} href="#" title={s.title} className="text-white/50 hover:text-secondary transition-colors" whileHover={{ scale: 1.2 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.d} />
              </svg>
            </motion.a>
          ))}

          <span className="text-white/20">|</span>

          {/* Season toggle */}
          <motion.button
            onClick={toggleSeason}
            className="flex items-center gap-1.5 text-white/70 hover:text-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            title={`Switch to ${isSummer ? "Winter" : "Summer"}`}
          >
            {isSummer ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="20" y2="6"/><line x1="12" y1="2" x2="4" y2="6"/><line x1="12" y1="22" x2="20" y2="18"/><line x1="12" y1="22" x2="4" y2="18"/></svg>
            )}
            {isSummer ? "Summer Mode" : "Winter Mode"}
          </motion.button>

          <span className="text-white/20">|</span>
          <a href="#contact" className="flex items-center gap-1 hover:text-secondary transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Login
          </a>
          <a href="#contact" className="bg-secondary text-white px-3 py-1 hover:bg-secondary/90 transition-colors rounded-sm font-semibold">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
