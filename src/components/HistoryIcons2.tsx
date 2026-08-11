import React from "react";

type IconProps = {
  size: number;
  color: string;
  strokeWidth?: number;
};

export const ChurchIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <line x1="50" y1="8" x2="50" y2="26" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="42" y1="16" x2="58" y2="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M30 46 L50 26 L70 46 L70 88 L30 88 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <rect x="44" y="64" width="12" height="24" stroke={color} strokeWidth={strokeWidth * 0.8} />
    <line x1="20" y1="88" x2="80" y2="88" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const ScrollIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M28 22 C20 22 20 34 28 34 L28 76 C20 76 20 88 28 88 L72 88 C80 88 80 76 72 76 L72 34 C80 34 80 22 72 22 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <line x1="36" y1="42" x2="64" y2="42" stroke={color} strokeWidth={strokeWidth * 0.75} strokeLinecap="round" />
    <line x1="36" y1="54" x2="64" y2="54" stroke={color} strokeWidth={strokeWidth * 0.75} strokeLinecap="round" />
    <line x1="36" y1="66" x2="56" y2="66" stroke={color} strokeWidth={strokeWidth * 0.75} strokeLinecap="round" />
  </svg>
);

export const TroughIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M14 50 L86 50 L76 74 L24 74 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <ellipse cx="50" cy="50" rx="36" ry="9" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="40" cy="60" r="3.2" fill={color} opacity={0.8} />
    <circle cx="52" cy="63" r="3.2" fill={color} opacity={0.8} />
    <circle cx="62" cy="58" r="3.2" fill={color} opacity={0.8} />
    <line x1="24" y1="74" x2="20" y2="86" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    <line x1="76" y1="74" x2="80" y2="86" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
  </svg>
);

export const HourglassIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <line x1="24" y1="14" x2="76" y2="14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="24" y1="86" x2="76" y2="86" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M28 14 C28 40 50 44 50 50 C50 56 28 60 28 86" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M72 14 C72 40 50 44 50 50 C50 56 72 60 72 86" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M38 22 L62 22 L50 38 Z" fill={color} opacity={0.7} />
  </svg>
);

export const CityIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="10" y="46" width="18" height="42" stroke={color} strokeWidth={strokeWidth} />
    <rect x="32" y="30" width="20" height="58" stroke={color} strokeWidth={strokeWidth} />
    <rect x="56" y="52" width="16" height="36" stroke={color} strokeWidth={strokeWidth} />
    <rect x="76" y="38" width="16" height="50" stroke={color} strokeWidth={strokeWidth} />
    <line x1="6" y1="88" x2="94" y2="88" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {[16, 20, 24].map((y) => (
      <line key={y} x1="15" y1={y + 34} x2="21" y2={y + 34} stroke={color} strokeWidth={1.6} />
    ))}
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 26 C42 20 24 18 16 22 L16 76 C24 72 42 74 50 80 C58 74 76 72 84 76 L84 22 C76 18 58 20 50 26 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <line x1="50" y1="26" x2="50" y2="80" stroke={color} strokeWidth={strokeWidth * 0.75} />
  </svg>
);

export const MedicalIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.4 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="18" y="18" width="64" height="64" rx="10" stroke={color} strokeWidth={strokeWidth} />
    <line x1="50" y1="34" x2="50" y2="66" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="34" y1="50" x2="66" y2="50" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const GearIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="18" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="50" cy="50" r="6" fill={color} />
    {Array.from({ length: 8 }).map((_, i) => {
      const deg = i * 45;
      return (
        <line
          key={i}
          x1={50 + Math.cos((deg * Math.PI) / 180) * 26}
          y1={50 + Math.sin((deg * Math.PI) / 180) * 26}
          x2={50 + Math.cos((deg * Math.PI) / 180) * 38}
          y2={50 + Math.sin((deg * Math.PI) / 180) * 38}
          stroke={color}
          strokeWidth={strokeWidth * 1.6}
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

export const WheatIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 2.8 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <line x1="50" y1="20" x2="50" y2="88" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {[28, 40, 52, 64].map((y, i) => (
      <React.Fragment key={i}>
        <ellipse cx={50 - 10} cy={y} rx="7" ry="4.5" transform={`rotate(-30 ${50 - 10} ${y})`} fill={color} opacity={0.85} />
        <ellipse cx={50 + 10} cy={y} rx="7" ry="4.5" transform={`rotate(30 ${50 + 10} ${y})`} fill={color} opacity={0.85} />
      </React.Fragment>
    ))}
  </svg>
);

export const RiceIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 2.8 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 90 C40 60 30 40 44 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
    {[24, 34, 44, 54, 64].map((y, i) => (
      <ellipse key={i} cx={46 + (i % 2 === 0 ? -8 : 8)} cy={y} rx="5.5" ry="3.4" fill={color} opacity={0.85} />
    ))}
  </svg>
);

export const CornIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 14 C68 14 74 40 68 62 C64 80 56 90 50 90 C44 90 36 80 32 62 C26 40 32 14 50 14 Z" stroke={color} strokeWidth={strokeWidth} />
    {[26, 38, 50, 62, 74].map((y, i) => (
      <line key={i} x1="34" y1={y} x2="66" y2={y} stroke={color} strokeWidth={strokeWidth * 0.6} opacity={0.7} />
    ))}
  </svg>
);

export const TorchIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 14 C40 26 40 38 50 46 C60 38 60 26 50 14 Z" fill={color} opacity={0.85} />
    <path d="M50 22 C46 30 46 36 50 40 C54 36 54 30 50 22 Z" fill={color} opacity={0.5} />
    <line x1="50" y1="46" x2="50" y2="90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="38" y1="60" x2="62" y2="60" stroke={color} strokeWidth={strokeWidth * 0.7} />
  </svg>
);

export const HouseIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.2 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M16 48 L50 18 L84 48" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 42 L26 86 L74 86 L74 42" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <rect x="42" y="60" width="16" height="26" stroke={color} strokeWidth={strokeWidth * 0.8} />
  </svg>
);

export const MagnifyingIcon: React.FC<IconProps> = ({ size, color, strokeWidth = 3.4 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="44" cy="44" r="26" stroke={color} strokeWidth={strokeWidth} />
    <line x1="63" y1="63" x2="86" y2="86" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
