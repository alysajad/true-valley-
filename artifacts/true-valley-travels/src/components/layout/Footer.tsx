import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
          <div className="col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">True Valley</h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Curated immersive journeys through the world's most breathtaking valley. 
              Experience Kashmir not as a tourist, but as a guest.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Destinations</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Dal Lake</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Gulmarg</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Pahalgam</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Sonamarg</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Contact Info</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Srinagar, Jammu & Kashmir</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>hello@truevalley.in</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <div>© {new Date().getFullYear()} True Valley Travels. All rights reserved.</div>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
