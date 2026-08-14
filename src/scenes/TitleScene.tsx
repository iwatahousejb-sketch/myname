import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const lineO = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: exit,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          transform: `scale(${0.85 + enter * 0.15})`,
          opacity: enter,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: lineO,
          }}
        >
          <div style={{ width: 40, height: 2, background: theme.gold, transform: `scaleX(${lineO})` }} />
          <span
            style={{
              color: theme.gold,
              fontFamily,
              fontSize: 26,
              letterSpacing: 4,
              fontWeight: 500,
            }}
          >
            20秒でわかる
          </span>
          <div style={{ width: 40, height: 2, background: theme.gold, transform: `scaleX(${lineO})` }} />
        </div>
        <div
          style={{
            color: theme.cream,
            fontFamily,
            fontWeight: 900,
            fontSize: 88,
            letterSpacing: 2,
            textAlign: "center",
            textShadow: `0 0 46px rgba(242,229,200,0.22)`,
          }}
        >
          パソコンとは？
        </div>
      </div>
    </AbsoluteFill>
  );
};
