import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setValue(Math.floor(progress * (to - from) + from));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else if (to === 4.9) {
        setValue(4.9 as any);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return <div ref={nodeRef} className="text-5xl md:text-6xl font-bold text-secondary mb-2">
    {to === 4.9 && inView ? "4.9" : value}{suffix}
  </div>;
}

export default function Stats() {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          <div className="text-center px-4">
            <Counter from={0} to={15} suffix="+" />
            <p className="text-white/70 font-medium text-sm uppercase tracking-wider">Years of Experience</p>
          </div>
          <div className="text-center px-4">
            <Counter from={0} to={2500} suffix="+" duration={2.5} />
            <p className="text-white/70 font-medium text-sm uppercase tracking-wider">Happy Travellers</p>
          </div>
          <div className="text-center px-4">
            <Counter from={0} to={6} />
            <p className="text-white/70 font-medium text-sm uppercase tracking-wider">Destinations Covered</p>
          </div>
          <div className="text-center px-4">
            <Counter from={0} to={4.9} suffix="" />
            <p className="text-white/70 font-medium text-sm uppercase tracking-wider">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
