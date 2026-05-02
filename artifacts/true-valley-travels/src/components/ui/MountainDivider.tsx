import React from "react";

interface MountainDividerProps {
  flipped?: boolean;
  color?: string;
}

export default function MountainDivider({ flipped = false, color = "hsl(var(--background))" }: MountainDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{
        height: 70,
        transform: flipped ? "scaleY(-1)" : "none",
        marginBottom: flipped ? -2 : 0,
        marginTop: flipped ? 0 : -2,
      }}
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        {/* Far mountain range */}
        <path
          d="M0 70 L0 48 L80 22 L160 44 L260 8 L360 35 L440 18 L540 40 L640 5 L720 30 L800 12 L900 38 L980 16 L1080 42 L1180 10 L1280 36 L1360 20 L1440 44 L1440 70 Z"
          fill={color}
          opacity="0.5"
        />
        {/* Near mountain range */}
        <path
          d="M0 70 L0 55 L100 32 L200 52 L320 28 L420 50 L520 30 L620 55 L740 20 L820 48 L920 28 L1020 54 L1120 32 L1220 58 L1340 30 L1440 52 L1440 70 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
