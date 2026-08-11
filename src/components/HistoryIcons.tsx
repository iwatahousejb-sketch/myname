import React from "react";

type IconProps = {
  size: number;
  color: string;
  strokeWidth?: number;
};

export const PotatoIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M28 32 C14 40 12 62 24 76 C36 90 62 92 76 80 C90 68 90 44 76 30 C64 18 40 18 28 32 Z"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <circle cx="38" cy="42" r="3" fill={color} opacity={0.7} />
    <circle cx="58" cy="36" r="2.6" fill={color} opacity={0.7} />
    <circle cx="66" cy="58" r="3" fill={color} opacity={0.7} />
    <circle cx="42" cy="66" r="2.6" fill={color} opacity={0.7} />
    <circle cx="30" cy="56" r="2.2" fill={color} opacity={0.7} />
  </svg>
);

export const ShipIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 12 L50 56" stroke={color} strokeWidth={strokeWidth} />
    <path d="M50 16 L78 30 L50 42 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M50 24 L28 34 L50 42 Z" stroke={color} strokeWidth={strokeWidth * 0.85} strokeLinejoin="round" />
    <path
      d="M18 58 L82 58 L72 80 C58 88 42 88 28 80 Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <line x1="14" y1="58" x2="86" y2="58" stroke={color} strokeWidth={strokeWidth * 0.8} opacity={0.7} />
  </svg>
);

export const CrownIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M18 46 L30 74 L70 74 L82 46 L64 58 L50 32 L36 58 Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <line x1="26" y1="80" x2="74" y2="80" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const FlowerIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <ellipse
        key={deg}
        cx="50"
        cy="30"
        rx="9"
        ry="16"
        transform={`rotate(${deg} 50 50)`}
        stroke={color}
        strokeWidth={strokeWidth * 0.8}
      />
    ))}
    <circle cx="50" cy="50" r="8" fill={color} />
    <path d="M50 78 L50 92" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const FactoryIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M14 84 L14 54 L34 66 L34 54 L54 66 L54 40 L60 40 L60 84 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <rect x="60" y="60" width="26" height="24" stroke={color} strokeWidth={strokeWidth} />
    <path d="M68 40 C64 30 70 26 66 16" stroke={color} strokeWidth={strokeWidth * 0.7} strokeLinecap="round" opacity={0.6} />
    <line x1="14" y1="84" x2="86" y2="84" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);

export const GraveMarker: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M32 90 L32 42 C32 24 68 24 68 42 L68 90 Z" stroke={color} strokeWidth={strokeWidth} />
    <line x1="24" y1="90" x2="76" y2="90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const BlightIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M28 34 C14 42 12 64 26 78 C38 90 62 90 74 78 C88 64 86 42 72 34"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity={0.6}
    />
    <path d="M30 40 L40 50 M46 32 L52 46 M60 36 L54 52 M70 44 L58 56" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    <path d="M32 66 L44 60 M50 70 L50 58 M68 64 L56 60" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity={0.8} />
  </svg>
);
