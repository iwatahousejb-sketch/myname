import React from "react";

type OwlIconProps = {
  size: number;
  color: string;
};

export const OwlIcon: React.FC<OwlIconProps> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M30 30 L18 8 L40 20 Z" fill={color} />
    <path d="M70 30 L82 8 L60 20 Z" fill={color} />
    <path
      d="M50 18 C26 18 16 40 18 62 C20 84 32 92 50 92 C68 92 80 84 82 62 C84 40 74 18 50 18 Z"
      stroke={color}
      strokeWidth={3.4}
    />
    <circle cx="37" cy="52" r="15" stroke={color} strokeWidth={3.2} />
    <circle cx="63" cy="52" r="15" stroke={color} strokeWidth={3.2} />
    <circle cx="37" cy="52" r="4.2" fill={color} />
    <circle cx="63" cy="52" r="4.2" fill={color} />
    <path d="M50 60 L44 72 L56 72 Z" fill={color} />
    <path d="M32 84 C38 80 62 80 68 84" stroke={color} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);
