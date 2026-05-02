import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    text: "True Valley gave us an experience we will cherish forever. From the luxurious houseboat on Dal Lake to the private trekking guide in Pahalgam, every detail was flawless.",
    name: "Sarah & James Jenkins",
    location: "London, UK",
    package: "Snow & Serenity"
  },
  {
    text: "We wanted an authentic Kashmiri experience without sacrificing comfort. Tariq and his team delivered beyond expectations. The local food experiences were incredible.",
    name: "Amit Sharma",
    location: "Mumbai, India",
    package: "Kashmir Classic"
  },
  {
    text: "The Emperor's Retreat package was worth every penny. Helicopter transfers, a private butler, and the most stunning views of the Himalayas from our villa.",
    name: "Elena Rodriguez",
    location: "Dubai, UAE",
    package: "The Emperor's Retreat"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background relative border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">
            Guest Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">
            Echoes from the Valley
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl shadow-sm border border-border"
            >
              <div className="flex gap-1 text-secondary mb-6">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                ))}
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed italic">
                "{review.text}"
              </p>
              <div>
                <div className="font-serif font-bold text-foreground text-lg">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.location}</div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 inline-block px-3 py-1 rounded-full">
                  {review.package}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
