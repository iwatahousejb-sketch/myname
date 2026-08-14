import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { OwlIcon } from "../../components/OwlIcon";

export const SocTitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const iconP = spring({ frame: frame - 4, fps, config: { damping: 12, mass: 0.6 } });
  const lineO = interpolate(frame, [20, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 14, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exit }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ transform: `scale(${iconP})`, opacity: iconP, marginBottom: 6 }}>
          <OwlIcon size={64} color={theme.gold} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: lineO,
          }}
        >
          <div style={{ width: 40, height: 2, background: theme.gold }} />
          <span style={{ color: theme.gold, fontFamily, fontSize: 24, letterSpacing: 4, fontWeight: 500 }}>
            1分でわかる哲学者
          </span>
          <div style={{ width: 40, height: 2, background: theme.gold }} />
        </div>
        <div
          style={{
            color: theme.cream,
            fontFamily,
            fontWeight: 900,
            fontSize: 100,
            letterSpacing: 6,
            textAlign: "center",
            transform: `scale(${0.88 + enter * 0.12})`,
            opacity: enter,
            textShadow: `0 0 46px rgba(242,229,200,0.2)`,
          }}
        >
          ソクラテス
        </div>
        <div style={{ opacity: lineO, color: theme.creamDim, fontFamily, fontSize: 22, letterSpacing: 2 }}>
          紀元前469年 - 紀元前399年
        </div>
      </div>
    </AbsoluteFill>
  );
};
