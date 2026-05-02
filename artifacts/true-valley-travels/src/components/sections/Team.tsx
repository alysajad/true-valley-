import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Tariq Ahmad",
    role: "Founder & Head Guide",
    bio: "Born in Srinagar, Tariq's deep local roots make every journey authentic. 20+ years exploring Kashmir's every corner.",
    initials: "TA",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&face",
  },
  {
    name: "Zoya Khan",
    role: "Guest Experience Director",
    bio: "Her hospitality background ensures every stay, meal, and transfer is executed with flawless attention to detail.",
    initials: "ZK",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Irfan Mir",
    role: "Alpine & Ski Specialist",
    bio: "Certified mountain guide and ski instructor who has summited Apharwat over 200 times in all seasons.",
    initials: "IM",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Farooq Dar",
    role: "Cultural Liaison",
    bio: "Connects guests with artisans, musicians, and family kitchens — the authentic heart of Kashmiri culture.",
    initials: "FD",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
  },
];

export default function Team() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            className="text-secondary text-xs font-bold uppercase tracking-[0.35em] mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Meet Your Hosts
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            The Faces of True Valley
          </motion.h2>
          <motion.div
            className="w-12 h-0.5 bg-secondary mx-auto mt-5"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[
                    "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
                    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                  ].map((d, si) => (
                    <motion.a
                      key={si}
                      href="#"
                      className="w-9 h-9 bg-white/20 hover:bg-secondary flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.15 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={d} />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="p-5 text-center border-t-2 border-secondary/0 group-hover:border-secondary transition-colors duration-300">
                <h3 className="font-serif font-bold text-foreground uppercase tracking-wide text-base">{member.name}</h3>
                <p className="text-secondary font-bold text-[10px] uppercase tracking-widest mt-1 mb-3">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
