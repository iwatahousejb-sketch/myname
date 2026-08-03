import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme, fontFamily } from "../theme";

type RippleQuestionsProps = {
  cx: number;
  cy: number;
  startFrame: number;
};

export const RippleQuestions: React.FC<RippleQuestionsProps> = ({ cx, cy, startFrame }) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;

  const rings = [0, 1, 2, 3].map((i) => {
    const t = ((rel - i * 20) % 90 + 90) % 90;
    const active = rel > i * 20;
    const r = interpolate(t, [0, 90], [10, 200]);
    const o = active ? interpolate(t, [0, 20, 90], [0, 0.5, 0]) : 0;
    return { r, o };
  });

  const bubbles = [
    { angle: -40, dist: 150, delay: 10 },
    { angle: 25, dist: 190, delay: 30 },
    { angle: -110, dist: 170, delay: 50 },
  ];

  return (
    <g>
      {rings.map((ring, i) => (
        <circle key={i} cx={cx} cy={cy} r={ring.r} stroke={theme.gold} strokeWidth={1.5} fill="none" opacity={ring.o} />
      ))}
      <circle cx={cx} cy={cy} r={8} fill={theme.gold} opacity={0.9} />
      {bubbles.map((b, i) => {
        const p = interpolate(rel - b.delay, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const x = cx + Math.cos((b.angle * Math.PI) / 180) * b.dist;
        const y = cy + Math.sin((b.angle * Math.PI) / 180) * b.dist;
        return (
          <g key={i} opacity={p} transform={`translate(${x} ${y}) scale(${0.7 + p * 0.3})`}>
            <circle r={22} fill={theme.bgHigh} stroke={theme.slate} strokeWidth={1.5} />
            <text
              x={0}
              y={9}
              textAnchor="middle"
              fill={theme.cream}
              fontFamily={fontFamily}
              fontSize={24}
              fontWeight={700}
            >
              ?
            </text>
          </g>
        );
      })}
    </g>
  );
};
