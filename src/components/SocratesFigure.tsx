import React from "react";
import { theme } from "../theme";

type SocratesFigureProps = {
  size: number;
  pose?: "teaching" | "seated" | "standing";
  color?: string;
  skinColor?: string;
  robeColor?: string;
};

const Head: React.FC<{ cx: number; cy: number; r: number; color: string; skinColor: string }> = ({
  cx,
  cy,
  r,
  color,
  skinColor,
}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={skinColor} />
    <path
      d={`M${cx - r * 0.94},${cy + r * 0.16} C${cx - r * 1.1},${cy + r * 0.7} ${cx - r * 0.7},${cy + r * 1.5} ${cx},${cy + r * 1.62} C${cx + r * 0.7},${cy + r * 1.5} ${cx + r * 1.1},${cy + r * 0.7} ${cx + r * 0.94},${cy + r * 0.16} C${cx + r * 0.66},${cy + r * 0.5} ${cx + r * 0.32},${cy + r * 0.62} ${cx},${cy + r * 0.62} C${cx - r * 0.32},${cy + r * 0.62} ${cx - r * 0.66},${cy + r * 0.5} ${cx - r * 0.94},${cy + r * 0.16} Z`}
      fill={color}
    />
    <path
      d={`M${cx - r * 0.94},${cy + r * 0.16} C${cx - r * 1.0},${cy + r * 0.55} ${cx - r * 0.82},${cy + r * 1.1} ${cx - r * 0.5},${cy + r * 1.4} C${cx - r * 0.72},${cy + r * 0.86} ${cx - r * 0.78},${cy + r * 0.4} ${cx - r * 0.7},${cy + r * 0.18} Z`}
      fill="#000"
      opacity={0.12}
    />
    <line
      x1={cx - r * 0.42}
      y1={cy - r * 0.22}
      x2={cx - r * 0.14}
      y2={cy - r * 0.3}
      stroke="#2a2016"
      strokeWidth={r * 0.07}
      strokeLinecap="round"
      opacity={0.55}
    />
    <line
      x1={cx + r * 0.14}
      y1={cy - r * 0.3}
      x2={cx + r * 0.42}
      y2={cy - r * 0.22}
      stroke="#2a2016"
      strokeWidth={r * 0.07}
      strokeLinecap="round"
      opacity={0.55}
    />
    <circle cx={cx - r * 0.28} cy={cy - r * 0.06} r={r * 0.07} fill="#2a2016" opacity={0.75} />
    <circle cx={cx + r * 0.28} cy={cy - r * 0.06} r={r * 0.07} fill="#2a2016" opacity={0.75} />
  </g>
);

export const SocratesFigure: React.FC<SocratesFigureProps> = ({
  size,
  pose = "teaching",
  color = theme.slate,
  skinColor = "#cbb08a",
  robeColor = theme.cream,
}) => {
  if (pose === "seated") {
    return (
      <svg width={size} height={size * 1.05} viewBox="0 0 200 210" fill="none">
        <ellipse cx="100" cy="196" rx="46" ry="8" fill="#000" opacity={0.25} />
        <path d="M56 210 C50 150 60 120 100 118 C140 120 150 150 144 210 Z" fill={robeColor} opacity={0.94} />
        <path d="M74 210 C70 168 76 140 100 138 C124 140 130 168 126 210 Z" fill={robeColor} opacity={0.55} />
        <path d="M62 150 C58 130 66 108 100 106 L100 210 L62 210 Z" fill="#000" opacity={0.12} />
        <Head cx={100} cy={70} r={32} color={color} skinColor={skinColor} />
      </svg>
    );
  }

  const armUp = pose === "teaching";

  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 200 260" fill="none">
      <ellipse cx="100" cy="248" rx="42" ry="8" fill="#000" opacity={0.22} />
      <path d="M60 258 C52 190 58 140 100 136 C142 140 148 190 140 258 Z" fill={robeColor} opacity={0.95} />
      <path d="M80 258 C76 200 82 160 100 156 C118 160 124 200 120 258 Z" fill={robeColor} opacity={0.55} />
      <path d="M68 190 C64 160 72 134 100 130 L100 258 L68 258 Z" fill="#000" opacity={0.1} />

      <path
        d={armUp ? "M62 168 C40 160 26 134 30 104" : "M64 168 C48 176 38 196 40 220"}
        stroke={robeColor}
        strokeWidth={20}
        strokeLinecap="round"
      />
      <circle cx={armUp ? 30 : 40} cy={armUp ? 104 : 220} r="11" fill={skinColor} />

      <path d="M138 168 C150 176 156 196 152 222" stroke={robeColor} strokeWidth={20} strokeLinecap="round" />
      <circle cx={152} cy={222} r="11" fill={skinColor} />

      <Head cx={100} cy={78} r={35} color={color} skinColor={skinColor} />
    </svg>
  );
};
