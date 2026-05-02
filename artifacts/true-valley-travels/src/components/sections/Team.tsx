import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Tariq Ahmad",
    role: "Founder & Head Guide",
    image: "/images/team-1.png",
    bio: "Born in Srinagar, Tariq knows every mountain pass, shikara owner, and hidden trail in the valley. His deep local roots make every journey authentic.",
    initials: "TA",
  },
  {
    name: "Zoya Khan",
    role: "Guest Experience Director",
    image: "/images/team-2.png",
    bio: "Ensures every stay, meal, and transit is executed with flawless attention to detail. Her hospitality background brings warmth to luxury.",
    initials: "ZK",
  },
  {
    name: "Irfan Mir",
    role: "Alpine Specialist",
    image: "/images/team-3.png",
    bio: "Our resident expert on Gulmarg skiing, high-altitude treks, and adventure sports. Irfan has summited Apharwat over 200 times.",
    initials: "IM",
  },
  {
    name: "Farooq Dar",
    role: "Cultural Liaison",
    image: "/images/team-4.png",
    bio: "Connects guests with authentic local artisans, traditional musicians, and family-run wazwan kitchens — the heart of Kashmiri culture.",
    initials: "FD",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function SocialIcon({ path }: { path: string }) {
  return (
    <motion.a
      href="#"
      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-white transition-colors"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </motion.a>
  );
}

export default function Team() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-secondary font-semibold tracking-widest uppercase text-sm block mb-4"
          >
            Meet Your Hosts
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-5"
          >
            The Faces of True Valley
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Kashmiri locals who turned their love for the valley into a vocation.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group bg-white rounded-2xl p-7 text-center border border-border relative overflow-hidden"
              whileHover={{
                y: -8,
                boxShadow: "0 24px 50px rgba(0,0,0,0.12)",
                borderTopColor: "hsl(var(--secondary))",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated top border */}
              <motion.div
                className="absolute top-0 left-0 h-1 bg-secondary rounded-t-2xl"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35 }}
              />

              <div className="mb-5 relative w-28 h-28 mx-auto">
                <motion.div
                  className="w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-lg"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement!;
                      parent.innerHTML = `<div class="w-full h-full bg-primary flex items-center justify-center text-white font-serif font-bold text-2xl">${member.initials}</div>`;
                    }}
                  />
                </motion.div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary rounded-full flex items-center justify-center shadow-md">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{member.bio}</p>

              <div className="flex justify-center gap-2">
                <SocialIcon path="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                <SocialIcon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <SocialIcon path="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95C23 15.87 23 12 23 12s0-3.87-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
