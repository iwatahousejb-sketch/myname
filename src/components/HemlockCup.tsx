import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

type HemlockCupProps = {
  size: number;
  color?: string;
};

export const HemlockCup: React.FC<HemlockCupProps> = ({ size, color = theme.gold }) => {
  const frame = useCurrentFrame();

  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 160 176" fill="none">
      {[0, 1, 2].map((i) => {
        const t = (frame + i * 22) % 66;
        const o = Math.max(0, 0.5 - t / 66);
        const y = 60 - t * 1.1;
        const x = 80 + Math.sin((frame + i * 30) / 18) * 8;
        return <circle key={i} cx={x} cy={y} r={3.2 - i * 0.4} fill={theme.creamDim} opacity={o} />;
      })}
      <path d="M46 60 L114 60 L104 100 C100 116 60 116 56 100 Z" fill={color} opacity={0.16} />
      <path d="M46 60 L114 60 L104 100 C100 116 60 116 56 100 Z" stroke={color} strokeWidth={3.4} />
      <ellipse cx="80" cy="60" rx="34" ry="8" fill={theme.bgDeep} stroke={color} strokeWidth={3} />
      <path d="M46 62 C24 66 24 90 44 92" stroke={color} strokeWidth={3.2} fill="none" strokeLinecap="round" />
      <path d="M114 62 C136 66 136 90 116 92" stroke={color} strokeWidth={3.2} fill="none" strokeLinecap="round" />
      <path d="M64 116 L58 150 L102 150 L96 116 Z" stroke={color} strokeWidth={3.4} fill="none" />
      <rect x="52" y="150" width="56" height="10" rx="3" stroke={color} strokeWidth={3.4} fill="none" />
    </svg>
  );
};
