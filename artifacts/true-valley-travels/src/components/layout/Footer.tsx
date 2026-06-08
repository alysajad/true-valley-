import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useHashNav } from "@/lib/useHashNav";

const cols = {
  "Quick Links": [
    { label: "Home", href: "/" }, { label: "Tour Packages", href: "#packages" },
    { label: "Destinations", href: "#destinations" }, { label: "About Us", href: "#our-story" },
    { label: "Contact", href: "#enquiry-form" },
  ],
  "Company": [
    { label: "About Us", href: "#our-story" }, { label: "Contact", href: "#enquiry-form" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

/** Footer link that routes client-side for paths and smooth-scrolls for #anchors. */
function FooterLink({ label, href }: { label: string; href: string }) {
  const hashNav = useHashNav();
  const className =
    "text-white/60 text-sm hover:text-secondary transition-colors flex items-center gap-2 group";
  const inner = (
    <>
      <span className="w-0 h-px bg-secondary transition-all duration-300 group-hover:w-3 shrink-0" />
      {label}
    </>
  );
  if (href.startsWith("#")) {
    return (
      <motion.a href={href} onClick={(e) => { e.preventDefault(); hashNav(href); }} className={className} whileHover={{ x: 5 }}>
        {inner}
      </motion.a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">

          {/* Brand with real logo */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              {/* Logo + name on footer */}
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-lg p-1.5 shadow-md shrink-0">
                  <img
                    src="/logo.jpeg"
                    alt="True Valley Travels"
                    className="h-12 w-auto object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-white font-bold text-lg uppercase tracking-wide leading-tight">
                    True Valley
                  </span>
                  <span className="font-serif text-white font-bold text-lg uppercase tracking-wide leading-tight">
                    Travels
                  </span>
                  <span className="text-secondary text-[9px] font-bold uppercase tracking-[0.3em] mt-1">
                    Kashmir
                  </span>
                </div>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-7">
              Curated immersive journeys through the world's most breathtaking valley. Experience Kashmir not as a tourist, but as a cherished guest.
            </p>
            {/* Social icons — Instagram & WhatsApp only */}
            <div className="flex gap-3">
              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/true_valley1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 bg-white/10 hover:bg-secondary border border-white/10 hover:border-secondary flex items-center justify-center transition-all duration-200"
                whileHover={{ scale: 1.12, y: -2 }}
              >
                {/* Instagram icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                </svg>
              </motion.a>
              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/918899177826"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-9 h-9 bg-white/10 hover:bg-[#25D366] border border-white/10 hover:border-[#25D366] flex items-center justify-center transition-all duration-200"
                whileHover={{ scale: 1.12, y: -2 }}
              >
                <svg width="14" height="14" viewBox="0 0 32 32" fill="white">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.853l-.485-.287-5.01 1.195 1.234-4.877-.318-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.29-9.953c-.397-.2-2.354-1.161-2.718-1.294-.365-.133-.63-.2-.896.2-.266.397-1.03 1.294-1.263 1.56-.232.265-.465.3-.862.1-.397-.2-1.676-.617-3.192-1.97-1.18-1.052-1.977-2.35-2.209-2.748-.233-.397-.025-.611.175-.808.18-.177.397-.465.596-.697.2-.232.265-.397.397-.662.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.776-.65-.671-.896-.684-.232-.012-.497-.015-.763-.015-.265 0-.696.1-1.061.497-.365.397-1.394 1.362-1.394 3.32s1.427 3.851 1.626 4.116c.2.265 2.808 4.287 6.805 6.013.951.41 1.693.655 2.27.839.954.304 1.822.261 2.508.158.766-.114 2.354-.962 2.686-1.89.332-.928.332-1.724.232-1.89-.1-.165-.365-.265-.762-.464z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-serif font-bold text-white uppercase tracking-widest text-xs mb-6 pb-3 border-b border-white/10">{heading}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <FooterLink label={l.label} href={l.href} />
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
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6", text: "truevalleytours@gmail.com", href: "mailto:truevalleytours@gmail.com" },
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
            <Link href="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-secondary transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
