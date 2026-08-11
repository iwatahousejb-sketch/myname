import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";

export const RejectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1320, 1350], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const figP = spring({ frame: frame - 20, fps: 30, config: { damping: 200 } });
  const potatoP = spring({ frame: frame - 70, fps: 30, config: { damping: 12, mass: 0.6 } });
  const titleO = interpolate(frame, [700, 740], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          left: width * 0.5 - 60,
          top: height * 0.32,
          opacity: figP,
          transform: `translateY(${(1 - figP) * 20}px)`,
        }}
      >
        <SilhouetteFigure size={120} color={theme.slateDim} />
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.5 - 30,
          top: height * 0.56,
          transform: `scale(${potatoP})`,
          opacity: potatoP,
        }}
      >
        <PotatoIcon size={60} color="#c96a4a" />
        <svg width={60} height={60} viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0 }}>
          <line x1="20" y1="20" x2="80" y2="80" stroke="#c96a4a" strokeWidth={5} strokeLinecap="round" opacity={0.85} />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#c96a4a" strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: height * 0.14,
          width: "100%",
          textAlign: "center",
          opacity: titleO,
          color: theme.gold,
          fontFamily,
          fontSize: 46,
          fontWeight: 900,
          letterSpacing: 4,
        }}
      >
        「悪魔の植物」
      </div>

      <CaptionSequence
        items={[
          { text: "しかし当初、ジャガイモは受け入れられなかった", from: 40, to: 320 },
          { text: "ナス科の植物で、毒草に近い印象を持たれていた", from: 380, to: 680 },
          { text: "家畜の餌程度の扱いを受けていた時期もあった", from: 780, to: 1220 },
        ]}
      />
    </AbsoluteFill>
  );
};
