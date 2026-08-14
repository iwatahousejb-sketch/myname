import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const p1 = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const p2 = spring({ frame: frame - 22, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exit }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "0 8%" }}>
        <div
          style={{
            opacity: p1,
            transform: `translateY(${interpolate(p1, [0, 1], [24, 0])}px)`,
            color: theme.creamDim,
            fontFamily,
            fontSize: 34,
            fontWeight: 500,
          }}
        >
          つまり、パソコンとは──
        </div>
        <div
          style={{
            opacity: p2,
            transform: `translateY(${interpolate(p2, [0, 1], [24, 0])}px)`,
            color: theme.cream,
            fontFamily,
            fontSize: 52,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.5,
            textShadow: `0 0 44px rgba(242,229,200,0.2)`,
          }}
        >
          情報を受け取り、考え、
          <br />
          <span style={{ color: theme.gold }}>形にして返す道具。</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
