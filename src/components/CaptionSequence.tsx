import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";

export type CaptionItem = {
  text: string;
  from: number;
  to: number;
};

const isWide = (ch: string) => ch.charCodeAt(0) > 0x2e80;

const estimateWidth = (text: string, fontSize: number) => {
  let units = 0;
  for (const ch of text) units += isWide(ch) ? 1.02 : 0.56;
  return units * fontSize;
};

const fitFontSize = (text: string, maxWidth: number, baseSize: number, minSize = 20) => {
  const w = estimateWidth(text, baseSize);
  if (w <= maxWidth) return baseSize;
  return Math.max(minSize, baseSize * (maxWidth / w));
};

const FADE = 10;

export const CaptionLine: React.FC<{
  text: string;
  opacity: number;
  y: number;
  maxWidth?: number;
  baseSize?: number;
  color?: string;
  weight?: number;
}> = ({ text, opacity, y, maxWidth = 1600, baseSize = 32, color = theme.white, weight = 500 }) => {
  const fontSize = fitFontSize(text, maxWidth, baseSize);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        textAlign: "center",
        opacity,
        color,
        fontFamily,
        fontSize,
        fontWeight: weight,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

export const CaptionSequence: React.FC<{
  items: CaptionItem[];
  y?: number;
  maxWidth?: number;
  baseSize?: number;
  color?: string;
}> = ({ items, y, maxWidth = 1600, baseSize = 32, color = theme.white }) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const bottom = y ?? height * 0.88;

  return (
    <>
      {items.map((item, i) => {
        if (frame < item.from - FADE || frame > item.to + FADE) return null;
        const o = interpolate(
          frame,
          [item.from - FADE, item.from, item.to, item.to + FADE],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <CaptionLine key={i} text={item.text} opacity={o} y={bottom} maxWidth={maxWidth} baseSize={baseSize} color={color} />
        );
      })}
    </>
  );
};
