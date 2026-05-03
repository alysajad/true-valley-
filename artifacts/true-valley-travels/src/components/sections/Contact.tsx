import React, { useState } from "react";
import { motion } from "framer-motion";

// ── WhatsApp config ──────────────────────────────────────────
const WA_NUMBER = "918899177826"; // country code + number, no +

function buildWhatsAppURL(fields: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  travellers: string;
  pkg: string;
  message: string;
}) {
  const lines: string[] = [
    "🙏 *New Tour Enquiry — True Valley Travels*",
    "",
    `👤 *Name:* ${fields.firstName} ${fields.lastName}`.trim(),
    fields.email   ? `📧 *Email:* ${fields.email}`        : "",
    fields.phone   ? `📞 *Phone:* ${fields.phone}`        : "",
    fields.date    ? `📅 *Travel Date:* ${fields.date}`   : "",
    `👥 *Travellers:* ${fields.travellers}`,
    `🏔️ *Package:* ${fields.pkg}`,
    fields.message ? `\n💬 *Message:*\n${fields.message}` : "",
    "",
    "_Sent via True Valley Travels website_",
  ].filter((l) => l !== undefined);

  const text = lines.join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ── Info sidebar data ────────────────────────────────────────
const info = [
  {
    label: "Call Us",
    value: "+91 88991 77826",
    href: "tel:+918899177826",
    icon: "M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.69 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 6.18 2 2 0 0 1 4.11 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  },
  {
    label: "Email Us",
    value: "info@truevalleytravels.in",
    href: "mailto:info@truevalleytravels.in",
    icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6",
  },
  {
    label: "Visit Us",
    value: "Srinagar, J&K, India",
    href: "#",
    icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  },
];

// WhatsApp SVG icon
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.853l-.485-.287-5.01 1.195 1.234-4.877-.318-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.29-9.953c-.397-.2-2.354-1.161-2.718-1.294-.365-.133-.63-.2-.896.2-.266.397-1.03 1.294-1.263 1.56-.232.265-.465.3-.862.1-.397-.2-1.676-.617-3.192-1.97-1.18-1.052-1.977-2.35-2.209-2.748-.233-.397-.025-.611.175-.808.18-.177.397-.465.596-.697.2-.232.265-.397.397-.662.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.776-.65-.671-.896-.684-.232-.012-.497-.015-.763-.015-.265 0-.696.1-1.061.497-.365.397-1.394 1.362-1.394 3.32s1.427 3.851 1.626 4.116c.2.265 2.808 4.287 6.805 6.013.951.41 1.693.655 2.27.839.954.304 1.822.261 2.508.158.766-.114 2.354-.962 2.686-1.89.332-.928.332-1.724.232-1.89-.1-.165-.365-.265-.762-.464z" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    travellers: "2 Adults",
    pkg: "Budget Explorer (₹6,999/pax)",
    message: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppURL(form);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition rounded-sm";
  const labelCls = "text-[10px] font-bold text-foreground uppercase tracking-widest";

  return (
    <section id="contact" className="py-14 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
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
          {/* ── Info sidebar ── */}
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
                  <a key={i} href={item.href} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0 group-hover:bg-secondary/40 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-widest">{item.label}</div>
                      <div className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp quick contact */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'd like to enquire about a Kashmir tour.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 px-5 font-bold text-sm uppercase tracking-wider transition-colors"
              >
                <WhatsAppIcon size={18} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="relative h-36 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&auto=format&fit=crop" alt="Kashmir" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/65 flex items-end p-4">
                <span className="font-serif font-bold text-white text-sm uppercase tracking-wide">Kashmir Awaits</span>
              </div>
            </div>
          </motion.div>

          {/* ── Enquiry Form ── */}
          <motion.div
            id="enquiry-form"
            className="lg:col-span-2 bg-white border border-border p-5 sm:p-8 scroll-mt-20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65 }}
          >
            <h3 className="font-serif text-xl font-bold text-primary uppercase tracking-wide mb-6">Send Us an Enquiry</h3>

            <form className="space-y-5" onSubmit={handleSendEnquiry}>
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={labelCls}>First Name <span className="text-secondary">*</span></label>
                  <input required type="text" placeholder="John" value={form.firstName} onChange={set("firstName")} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Last Name</label>
                  <input type="text" placeholder="Doe" value={form.lastName} onChange={set("lastName")} className={inputCls} />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={labelCls}>Email Address</label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={set("email")} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Phone / WhatsApp <span className="text-secondary">*</span></label>
                  <input required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} className={inputCls} />
                </div>
              </div>

              {/* Date + Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={labelCls}>Travel Date</label>
                  <input type="date" value={form.date} onChange={set("date")} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Travellers</label>
                  <select value={form.travellers} onChange={set("travellers")} className={inputCls}>
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                    <option>Group (5+)</option>
                  </select>
                </div>
              </div>

              {/* Package */}
              <div className="space-y-1.5">
                <label className={labelCls}>Package of Interest</label>
                <select value={form.pkg} onChange={set("pkg")} className={inputCls}>
                  <optgroup label="Summer Packages">
                    <option>Budget Explorer (₹6,999/pax)</option>
                    <option>Classic Delight (₹11,999/pax)</option>
                    <option>Royal Summer Paradise (₹19,999/pax)</option>
                    <option>Adventure Seekers (₹24,999/pax)</option>
                  </optgroup>
                  <optgroup label="Winter Packages">
                    <option>Budget Explorer Winter (₹6,999/pax)</option>
                    <option>Winter Special (₹17,999/pax)</option>
                    <option>Classic Delight Winter (₹11,999/pax)</option>
                    <option>Adventure Seekers Winter (₹24,999/pax)</option>
                  </optgroup>
                  <option>Custom / Not sure yet</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className={labelCls}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your dream Kashmir trip — preferred destinations, activities, budget, or anything else…"
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Send via WhatsApp button */}
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 text-sm font-bold uppercase tracking-widest transition-colors shadow-md"
                whileHover={{ scale: 1.01, boxShadow: "0 6px 24px rgba(37,211,102,0.35)" }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon size={20} />
                Send Enquiry via WhatsApp
              </motion.button>

              <p className="text-center text-[11px] text-muted-foreground">
                Tapping the button opens WhatsApp with your details pre-filled. We typically respond within a few hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
