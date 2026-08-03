import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type PlusGridProps = {
  x: number;
  y: number;
  color: string;
  cols?: number;
  rows?: number;
  gap?: number;
  size?: number;
  delay?: number;
};

export const PlusGrid: React.FC<PlusGridProps> = ({
  x,
  y,
  color,
  cols = 3,
  rows = 3,
  gap = 34,
  size = 11,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const items: React.ReactNode[] = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const localDelay = delay + idx * 2;
      const o = interpolate(frame - localDelay, [0, 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const cx = x + c * gap;
      const cy = y + r * gap;
      items.push(
        <g key={`${r}-${c}`} opacity={o}>
          <line x1={cx - size / 2} y1={cy} x2={cx + size / 2} y2={cy} stroke={color} strokeWidth={3} strokeLinecap="round" />
          <line x1={cx} y1={cy - size / 2} x2={cx} y2={cy + size / 2} stroke={color} strokeWidth={3} strokeLinecap="round" />
        </g>,
      );
      idx++;
    }
  }
  return <>{items}</>;
};
