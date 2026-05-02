import React from "react";
import { motion } from "framer-motion";

const footerLinks = {
  "Quick Links": [
    { label: "About Us", href: "#our-story" },
    { label: "Our Team", href: "#our-story" },
    { label: "Packages", href: "#packages" },
    { label: "Testimonials", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  "Destinations": [
    { label: "Dal Lake, Srinagar", href: "#destinations" },
    { label: "Gulmarg", href: "#destinations" },
    { label: "Pahalgam", href: "#destinations" },
    { label: "Sonamarg", href: "#destinations" },
    { label: "Yusmarg", href: "#destinations" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.h3
              className="text-2xl font-serif font-bold mb-4 text-white"
              whileHover={{ x: 2 }}
            >
              True Valley Travels
            </motion.h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Curated immersive journeys through the world's most breathtaking valley. Experience Kashmir not as a tourist, but as a cherished guest.
            </p>
            <div className="flex gap-3">
              {[
                "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
                "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95C23 15.87 23 12 23 12s0-3.87-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
                "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
              ].map((path, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold mb-5 text-white text-xs uppercase tracking-widest">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-secondary transition-colors flex items-center gap-1.5 group"
                      whileHover={{ x: 4 }}
                    >
                      <span className="w-0 h-px bg-secondary transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-white text-xs uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0", text: "Srinagar, J&K, India" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6", text: "hello@truevalley.in" },
                { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.38 2 2 0 0 1 3 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", text: "+91 98765 43210" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                  <svg className="w-4 h-4 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <div>© {new Date().getFullYear()} True Valley Travels. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
