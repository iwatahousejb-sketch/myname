import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";

export const EndCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({ frame, fps, config: { damping: 200 } });
  const glowPulse = 0.85 + Math.sin(frame / 14) * 0.15;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: p }}>
        <svg width={78} height={92} viewBox="0 0 100 118">
          <circle cx="50" cy="46" r="38" fill={theme.glow} opacity={0.16 * glowPulse} />
          <circle cx="50" cy="46" r="26" stroke={theme.gold} strokeWidth={3.5} fill="none" />
          <path d="M40 46 A10 10 0 1 1 60 46" stroke={theme.gold} strokeWidth={3.5} fill="none" strokeLinecap="round" opacity={0.5} />
          <line x1="50" y1="72" x2="50" y2="80" stroke={theme.cream} strokeWidth={3.5} strokeLinecap="round" />
          <line x1="41" y1="84" x2="59" y2="84" stroke={theme.cream} strokeWidth={3.5} strokeLinecap="round" />
          <line x1="43" y1="90" x2="57" y2="90" stroke={theme.cream} strokeWidth={3.5} strokeLinecap="round" />
        </svg>
        <div
          style={{
            color: theme.cream,
            fontFamily,
            fontSize: 50,
            fontWeight: 900,
          }}
        >
          パソコンとは？
        </div>
        <div
          style={{
            color: theme.creamDim,
            fontFamily,
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          入力 → 処理 → 出力する機械
        </div>
      </div>
    </AbsoluteFill>
  );
};
