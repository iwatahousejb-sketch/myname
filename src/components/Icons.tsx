import React from "react";

type IconProps = {
  color: string;
  size: number;
  strokeWidth?: number;
};

export const InputIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="10" y="30" width="80" height="42" rx="8" stroke={color} strokeWidth={strokeWidth} />
    {[0, 1, 2].map((row) =>
      [0, 1, 2, 3, 4].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={18 + col * 14}
          y={38 + row * 11}
          width="9"
          height="7"
          rx="1.5"
          fill={color}
          opacity={0.85}
        />
      )),
    )}
  </svg>
);

export const ProcessIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="28" y="28" width="44" height="44" rx="4" stroke={color} strokeWidth={strokeWidth} />
    <rect x="40" y="40" width="20" height="20" rx="2" stroke={color} strokeWidth={strokeWidth * 0.7} />
    {[18, 34, 50, 66, 82].map((pos, i) => (
      <React.Fragment key={i}>
        <line x1={pos > 50 ? 72 : 28} y1={pos} x2={pos > 50 ? 84 : 16} y2={pos} stroke={color} strokeWidth={strokeWidth * 0.7} />
      </React.Fragment>
    ))}
    {[18, 34, 50, 66, 82].map((pos, i) => (
      <React.Fragment key={`v${i}`}>
        <line x1={pos} y1={28} x2={pos} y2={16} stroke={color} strokeWidth={strokeWidth * 0.7} />
        <line x1={pos} y1={72} x2={pos} y2={84} stroke={color} strokeWidth={strokeWidth * 0.7} />
      </React.Fragment>
    ))}
  </svg>
);

export const OutputIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="14" y="20" width="72" height="48" rx="6" stroke={color} strokeWidth={strokeWidth} />
    <path d="M32 40 L46 52 L32 64" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="52" y1="64" x2="68" y2="64" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="50" y1="68" x2="50" y2="80" stroke={color} strokeWidth={strokeWidth} />
    <line x1="32" y1="86" x2="68" y2="86" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const CpuNodeIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="30" y="30" width="40" height="40" rx="3" stroke={color} strokeWidth={strokeWidth} />
    <rect x="42" y="42" width="16" height="16" fill={color} opacity={0.75} />
    {[26, 42, 58, 74].map((p, i) => (
      <React.Fragment key={i}>
        <line x1={p} y1={30} x2={p} y2={18} stroke={color} strokeWidth={strokeWidth * 0.7} />
        <line x1={p} y1={70} x2={p} y2={82} stroke={color} strokeWidth={strokeWidth * 0.7} />
      </React.Fragment>
    ))}
  </svg>
);

export const RamNodeIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="16" y="34" width="68" height="32" rx="3" stroke={color} strokeWidth={strokeWidth} />
    {[26, 38, 50, 62, 74].map((x, i) => (
      <line key={i} x1={x} y1={66} x2={x} y2={76} stroke={color} strokeWidth={strokeWidth} />
    ))}
    <line x1="24" y1="44" x2="76" y2="44" stroke={color} strokeWidth={strokeWidth * 0.6} opacity={0.7} />
    <line x1="24" y1="54" x2="76" y2="54" stroke={color} strokeWidth={strokeWidth * 0.6} opacity={0.7} />
  </svg>
);

export const StorageNodeIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="28" rx="34" ry="12" stroke={color} strokeWidth={strokeWidth} />
    <path d="M16 28 L16 72 A34 12 0 0 0 84 72 L84 28" stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="50" cy="50" rx="34" ry="12" stroke={color} strokeWidth={strokeWidth * 0.7} opacity={0.7} />
  </svg>
);

export const IoNodeIcon: React.FC<IconProps> = ({ color, size, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="18" y="22" width="64" height="56" rx="5" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="34" cy="40" r="5" stroke={color} strokeWidth={strokeWidth * 0.8} />
    <circle cx="52" cy="40" r="5" stroke={color} strokeWidth={strokeWidth * 0.8} />
    <circle cx="70" cy="40" r="5" stroke={color} strokeWidth={strokeWidth * 0.8} />
    <line x1="28" y1="60" x2="72" y2="60" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    <line x1="28" y1="68" x2="60" y2="68" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
  </svg>
);
