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
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm block mb-4">
            Meet Your Hosts
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            The Faces of True Valley
          </h2>
          <p className="text-muted-foreground text-lg">
            Our expert team of locals ensures your experience is authentic and flawless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-8 text-center border border-border border-t-4 border-t-transparent hover:border-t-secondary hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6 relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + member.name + '&background=random' }}
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {member.bio}
              </p>
              <div className="flex justify-center gap-4 text-muted-foreground">
                <a href="#" className="hover:text-secondary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="hover:text-secondary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
