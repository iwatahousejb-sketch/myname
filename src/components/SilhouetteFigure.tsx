import React from "react";

type SilhouetteFigureProps = {
  size: number;
  color: string;
  opacity?: number;
};

export const SilhouetteFigure: React.FC<SilhouetteFigureProps> = ({ size, color, opacity = 1 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 100 150" fill="none" opacity={opacity}>
    <circle cx="50" cy="26" r="18" fill={color} />
    <path d="M22 150 C16 96 26 60 50 58 C74 60 84 96 78 150 Z" fill={color} />
  </svg>
);
