import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { SocratesFigure } from "../../components/SocratesFigure";

export const WisdomScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const socP = spring({ frame, fps, config: { damping: 13, mass: 0.7 } });
  const glowP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const pulse = 0.85 + Math.sin(frame / 16) * 0.15;
  const titleO = interpolate(frame, [46, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const captionO = interpolate(frame, [92, 114], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [92, 114], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit, alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: height * 0.5,
          transform: "translate(-50%, -50%)",
          opacity: socP,
        }}
      >
        <SocratesFigure size={230} pose="standing" color={theme.slate} robeColor={theme.cream} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: height * 0.5 - 260,
          transform: `translate(-50%, -50%) scale(${glowP * pulse})`,
          opacity: glowP,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: theme.glow,
            filter: "blur(2px)",
            opacity: 0.18,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: height * 0.16,
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: titleO,
        }}
      >
        <div style={{ color: theme.gold, fontFamily, fontSize: 54, fontWeight: 900, letterSpacing: 4 }}>
          無知の知
        </div>
        <div style={{ color: theme.creamDim, fontFamily, fontSize: 18, letterSpacing: 4, marginTop: 6 }}>
          What I Know Is That I Know Nothing
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: height * 0.1,
          width: "100%",
          textAlign: "center",
          opacity: captionO,
          transform: `translateY(${captionY}px)`,
          color: theme.white,
          fontFamily,
          fontSize: 32,
          lineHeight: 1.7,
          fontWeight: 500,
        }}
      >
        自分が何も知らないと知ること。
        <br />
        それこそが、知恵の始まりだと彼は考えた。
      </div>
    </AbsoluteFill>
  );
};
