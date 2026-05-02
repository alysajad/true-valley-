import React from "react";
import { motion } from "framer-motion";

const cols = {
  "Quick Links": [
    { label: "Home", href: "/" }, { label: "Tour Packages", href: "#packages" },
    { label: "Destinations", href: "#destinations" }, { label: "About Us", href: "#our-story" },
    { label: "Contact", href: "#contact" },
  ],
  "Destinations": [
    { label: "Dal Lake, Srinagar", href: "#destinations" }, { label: "Gulmarg", href: "#destinations" },
    { label: "Pahalgam", href: "#destinations" }, { label: "Sonamarg", href: "#destinations" },
    { label: "Yusmarg", href: "#destinations" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">

          {/* Brand with real logo */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              {/* Logo on white badge — shows full color on dark footer */}
              <div className="inline-block bg-white rounded-lg p-2 shadow-md mb-1">
                <img
                  src="/logo.jpeg"
                  alt="True Valley Travels"
                  className="h-16 w-auto object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-7">
              Curated immersive journeys through the world's most breathtaking valley. Experience Kashmir not as a tourist, but as a cherished guest.
            </p>
            <div className="flex gap-3">
              {[
                { title: "Twitter/X", d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { title: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { title: "YouTube", d: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95C23 15.87 23 12 23 12s0-3.87-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ].map((s) => (
                <motion.a key={s.title} href="#" title={s.title} className="w-9 h-9 bg-white/10 hover:bg-secondary border border-white/10 hover:border-secondary flex items-center justify-center transition-all duration-200" whileHover={{ scale: 1.12, y: -2 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.d} /></svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-serif font-bold text-white uppercase tracking-widest text-xs mb-6 pb-3 border-b border-white/10">{heading}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <motion.a href={l.href} className="text-white/60 text-sm hover:text-secondary transition-colors flex items-center gap-2 group" whileHover={{ x: 5 }}>
                      <span className="w-0 h-px bg-secondary transition-all duration-300 group-hover:w-3 shrink-0" />
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-widest text-xs mb-6 pb-3 border-b border-white/10">Contact</h4>
            <ul className="space-y-4 text-sm">
              {[
                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0", text: "Srinagar, J&K, India", href: "#" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6", text: "hello@truevalley.in", href: "mailto:hello@truevalley.in" },
                { icon: "M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.69 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 6.18 2 2 0 0 1 4.11 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z", text: "+91 88991 77826", href: "tel:+918899177826" },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="flex items-start gap-3 text-white/60 hover:text-secondary transition-colors group">
                    <svg className="w-4 h-4 text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={item.icon} /></svg>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            {/* Small trust badge */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-white/35 mb-2">Certified & Trusted</div>
              <div className="flex gap-2 flex-wrap">
                {["Govt. of J&K", "IATO Member", "SSL Secure"].map((badge) => (
                  <span key={badge} className="text-[9px] border border-white/15 text-white/45 px-2 py-0.5 uppercase tracking-wide">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} True Valley Travels. All rights reserved. Crafted with ♥ in Kashmir.</div>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((t) => (
              <a key={t} href="#" className="hover:text-secondary transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
