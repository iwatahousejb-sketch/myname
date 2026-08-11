import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { CaptionSequence } from "../../components/CaptionSequence";

export const CaveatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p = spring({ frame: frame - 6, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ opacity: exit, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: p,
          transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`,
          color: theme.creamDim,
          fontFamily,
          fontSize: 30,
          fontWeight: 500,
          textAlign: "center",
          maxWidth: "70%",
          lineHeight: 1.8,
        }}
      >
        ただし、人口増加の要因はジャガイモだけでは説明できない
      </div>

      <CaptionSequence
        items={[
          { text: "農業技術や医療の進歩など、複数の要因が絡み合っている", from: 380, to: 700 },
          { text: "単純化されたストーリーには、慎重である必要がある", from: 780, to: 1000 },
        ]}
      />
    </AbsoluteFill>
  );
};
