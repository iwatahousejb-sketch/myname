import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";

export const EndCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({ frame, fps, config: { damping: 200 } });
  const markSpin = interpolate(frame, [0, 60], [0, 40]);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: p }}>
        <svg width={72} height={72} viewBox="0 0 100 100" style={{ transform: `rotate(${markSpin}deg)` }}>
          <circle cx="50" cy="50" r="34" stroke={theme.green} strokeWidth={4} fill="none" />
          <line x1="50" y1="30" x2="50" y2="70" stroke={theme.cream} strokeWidth={4} strokeLinecap="round" />
          <line x1="30" y1="50" x2="70" y2="50" stroke={theme.cream} strokeWidth={4} strokeLinecap="round" />
        </svg>
        <div
          style={{
            color: theme.cream,
            fontFamily,
            fontSize: 52,
            fontWeight: 900,
          }}
        >
          パソコンとは？
        </div>
        <div
          style={{
            color: theme.creamDim,
            fontFamily,
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          入力 → 処理 → 出力する機械
        </div>
      </div>
    </AbsoluteFill>
  );
};
