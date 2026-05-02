import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">True Valley</h3>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed">
              Curated immersive journeys through the world's most breathtaking valley. 
              Experience Kashmir not as a tourist, but as a guest.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white uppercase tracking-wider text-sm">Links</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-secondary transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Packages</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>Srinagar, Jammu & Kashmir</li>
              <li>hello@truevalley.in</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} True Valley Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
