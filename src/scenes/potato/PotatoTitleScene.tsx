import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { CaptionSequence } from "../../components/CaptionSequence";

export const PotatoTitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const iconP = spring({ frame: frame - 4, fps, config: { damping: 12, mass: 0.6 } });
  const lineO = interpolate(frame, [16, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ transform: `scale(${iconP})`, opacity: iconP, marginBottom: 4 }}>
            <PotatoIcon size={58} color={theme.gold} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: lineO }}>
            <div style={{ width: 40, height: 2, background: theme.gold }} />
            <span style={{ color: theme.gold, fontFamily, fontSize: 24, letterSpacing: 4, fontWeight: 500 }}>
              3分でわかる歴史
            </span>
            <div style={{ width: 40, height: 2, background: theme.gold }} />
          </div>
          <div
            style={{
              color: theme.cream,
              fontFamily,
              fontWeight: 900,
              fontSize: 68,
              letterSpacing: 1,
              textAlign: "center",
              lineHeight: 1.4,
              transform: `scale(${0.9 + enter * 0.1})`,
              opacity: enter,
              textShadow: `0 0 46px rgba(242,229,200,0.2)`,
            }}
          >
            なぜジャガイモは
            <br />
            世界の人口を変えたのか
          </div>
        </div>
      </AbsoluteFill>
      <CaptionSequence
        items={[
          { text: "たった一つの作物が、人口を大きく変えたとしたら?", from: 320, to: 580 },
          { text: "なぜ、それほどの力があったのか", from: 650, to: 950 },
        ]}
      />
    </AbsoluteFill>
  );
};
