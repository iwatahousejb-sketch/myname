import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { SocratesFigure } from "../../components/SocratesFigure";
import { RippleQuestions } from "../../components/RippleQuestions";

export const QuestioningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const socP = spring({ frame, fps, config: { damping: 13, mass: 0.7 } });
  const labelO = interpolate(frame, [30, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const captionO = interpolate(frame, [86, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [86, 108], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const socX = width * 0.26;
  const rippleCx = width * 0.62;
  const rippleCy = height * 0.42;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <RippleQuestions cx={rippleCx} cy={rippleCy} startFrame={12} />
      </svg>

      <div
        style={{
          position: "absolute",
          left: socX - 105,
          top: height * 0.42 - 130,
          opacity: socP,
          transform: `translateY(${(1 - socP) * 20}px)`,
        }}
      >
        <SocratesFigure size={210} pose="teaching" color={theme.slate} robeColor={theme.cream} />
      </div>

      <div
        style={{
          position: "absolute",
          left: socX - 140,
          top: height * 0.14,
          width: 280,
          textAlign: "center",
          opacity: labelO,
          color: theme.gold,
          fontFamily,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        問答法
        <div style={{ color: theme.creamDim, fontFamily, fontSize: 16, letterSpacing: 3, marginTop: 4 }}>
          ELENCHUS
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
        彼は、何も書き残さなかった。ただ広場に立ち、
        <br />
        人々に問いを重ねた。
      </div>
    </AbsoluteFill>
  );
};
