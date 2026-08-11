import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { CaptionSequence } from "../../components/CaptionSequence";

export const ClosingPotatoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const finalExit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markStart = 1150;
  const markP = spring({ frame: frame - markStart, fps, config: { damping: 200 } });
  const glowPulse = 0.85 + Math.sin(frame / 16) * 0.15;

  return (
    <AbsoluteFill style={{ opacity: finalExit }}>
      <CaptionSequence
        items={[
          { text: "「世界の人口を2倍にした」は、やや誇張だが", from: 40, to: 340 },
          { text: "旧世界の人口増加のおよそ4分の1を後押ししたのは事実", from: 400, to: 750 },
          { text: "今や世界で4番目に多く生産される作物になった", from: 810, to: 1100 },
        ]}
        y={130}
        baseSize={34}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: markP }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 110,
                height: 110,
                transform: `translate(-50%, -50%) scale(${glowPulse})`,
                borderRadius: "50%",
                background: theme.glow,
                opacity: 0.14,
              }}
            />
            <PotatoIcon size={64} color={theme.gold} />
          </div>
          <div style={{ color: theme.cream, fontFamily, fontSize: 42, fontWeight: 900, textAlign: "center", lineHeight: 1.5 }}>
            スーパーの塊茎が、
            <br />
            かつて国家の運命を左右していた
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
