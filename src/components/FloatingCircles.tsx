import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

type Circle = { x: number; y: number; r: number; color: string; seed: number; o: number };

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type FloatingCirclesProps = {
  width: number;
  height: number;
  count: number;
  colors: string[];
  seedOffset?: number;
};

export const FloatingCircles: React.FC<FloatingCirclesProps> = ({
  width,
  height,
  count,
  colors,
  seedOffset = 5,
}) => {
  const frame = useCurrentFrame();
  const circles: Circle[] = useMemo(() => {
    const rand = mulberry32(seedOffset * 733 + 91);
    const arr: Circle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: rand() * width,
        y: rand() * height,
        r: 8 + rand() * 26,
        color: colors[Math.floor(rand() * colors.length)],
        seed: rand() * 1000,
        o: 0.15 + rand() * 0.35,
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, width, height, seedOffset]);

  return (
    <g>
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.x + Math.sin(frame / 100 + c.seed) * 14}
          cy={c.y + Math.cos(frame / 120 + c.seed) * 14}
          r={c.r}
          fill={c.color}
          opacity={c.o}
        />
      ))}
    </g>
  );
};
