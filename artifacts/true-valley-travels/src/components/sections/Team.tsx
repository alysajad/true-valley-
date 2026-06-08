import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Abuzar",
    role: "Founder",
    bio: "Passionate about crafting unforgettable Kashmir experiences and bringing True Valley Travels to life.",
    initials: "AB",
    img: "/abuzar.jpg.jpeg",
  },
  {
    name: "Iqra Bashir",
    role: "Sales Lead",
    bio: "Dedicated to ensuring every guest has a seamless, personalized itinerary matched perfectly to their dreams.",
    initials: "IB",
    img: "/iqra.jpg",
    phone: "+919103185048",
  },
  {
    name: "Fatima",
    role: "Sales Head",
    bio: "Leads our sales team with care, helping every traveller plan the perfect Kashmir getaway.",
    initials: "FA",
    img: "/fatima.jpeg",
    phone: "+917006393285",
  }
];

export default function Team() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Meet Your Hosts
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            The Faces of True Valley
          </motion.h2>
          <motion.div
            className="w-12 h-0.5 bg-secondary mx-auto mt-5"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden bg-muted/20 border border-border"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
            >
              {/* Photo */}
              <div className="h-64 relative overflow-hidden bg-primary/10">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const p = el.parentElement!;
                    const d = document.createElement("div");
                    d.className = "w-full h-full flex items-center justify-center bg-primary text-white font-serif font-bold text-5xl";
                    d.textContent = member.initials;
                    p.appendChild(d);
                  }}
                />

              </div>

              {/* Text */}
              <div className="p-5 text-center border-t-2 border-secondary/0 group-hover:border-secondary transition-colors duration-300">
                <h3 className="font-serif font-bold text-foreground uppercase tracking-wide text-base">{member.name}</h3>
                <p className="text-secondary font-bold text-[10px] uppercase tracking-widest mt-1 mb-3">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-primary hover:text-secondary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {member.phone}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
