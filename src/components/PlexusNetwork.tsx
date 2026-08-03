import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

type Point = { x: number; y: number; r: number; seed: number };

type PlexusNetworkProps = {
  width: number;
  height: number;
  count: number;
  color: string;
  maxDist: number;
  seedOffset?: number;
  opacity?: number;
  dotOpacity?: number;
};

// deterministic pseudo-random generator so layout is stable across renders
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PlexusNetwork: React.FC<PlexusNetworkProps> = ({
  width,
  height,
  count,
  color,
  maxDist,
  seedOffset = 1,
  opacity = 0.5,
  dotOpacity = 0.8,
}) => {
  const frame = useCurrentFrame();

  const points: Point[] = useMemo(() => {
    const rand = mulberry32(seedOffset * 9973 + 17);
    const pts: Point[] = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: rand() * width,
        y: rand() * height,
        r: 1.5 + rand() * 4.5,
        seed: rand() * 1000,
      });
    }
    return pts;
  }, [count, width, height, seedOffset]);

  const animated = points.map((p) => ({
    ...p,
    x: p.x + Math.sin(frame / 70 + p.seed) * 10,
    y: p.y + Math.cos(frame / 90 + p.seed) * 10,
  }));

  const lines: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
  for (let i = 0; i < animated.length; i++) {
    for (let j = i + 1; j < animated.length; j++) {
      const a = animated[i];
      const b = animated[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < maxDist) {
        lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, o: 1 - dist / maxDist });
      }
    }
  }

  return (
    <g opacity={opacity}>
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={color}
          strokeWidth={1}
          opacity={l.o * 0.6}
        />
      ))}
      {animated.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={color} opacity={dotOpacity} />
      ))}
    </g>
  );
};
