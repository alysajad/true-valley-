import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Tariq Ahmad",
    role: "Founder & Head Guide",
    image: "/images/team-1.png",
    bio: "Born in Srinagar, Tariq knows every mountain pass and shikara owner in the valley."
  },
  {
    name: "Zoya Khan",
    role: "Guest Experience Director",
    image: "/images/team-2.png",
    bio: "Ensures every stay, meal, and transit is executed with flawless luxury and warmth."
  },
  {
    name: "Irfan Mir",
    role: "Alpine Specialist",
    image: "/images/team-3.png",
    bio: "Our resident expert on Gulmarg skiing, high-altitude treks, and adventure sports."
  },
  {
    name: "Farooq Dar",
    role: "Cultural Liaison",
    image: "/images/team-4.png",
    bio: "Connects our guests with authentic local artisans, musicians, and traditional chefs."
  }
];

export default function Team() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">
            Meet Your Hosts
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6">
            The Faces of True Valley
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="mb-6 relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm uppercase tracking-wider mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
