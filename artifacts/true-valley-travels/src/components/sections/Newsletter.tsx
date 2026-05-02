import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Experience Kashmir?
          </h2>
          <p className="text-white/90 text-lg mb-10">
            Subscribe to our newsletter for exclusive offers, curated travel tips, and seasonal packages.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-6 py-4 rounded-md flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-7 rounded-md font-bold text-lg whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
