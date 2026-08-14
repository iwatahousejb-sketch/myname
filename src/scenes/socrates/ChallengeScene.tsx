import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";

export const ChallengeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftP = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const rightP = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const circleP = spring({ frame: frame - 30, fps, config: { damping: 11, mass: 0.6 } });
  const pulse = 0.9 + Math.sin(frame / 12) * 0.1;

  const captionO = interpolate(frame, [70, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [70, 92], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          left: width * 0.2 - 60,
          bottom: height * 0.28,
          opacity: leftP,
          transform: `translateX(${(1 - leftP) * -30}px)`,
        }}
      >
        <SilhouetteFigure size={150} color={theme.cream} opacity={0.9} />
      </div>
      <div
        style={{
          position: "absolute",
          right: width * 0.2 - 60,
          bottom: height * 0.28,
          opacity: rightP,
          transform: `translateX(${(1 - rightP) * 30}px) scaleX(-1)`,
        }}
      >
        <SilhouetteFigure size={150} color={theme.slate} opacity={0.9} />
      </div>

      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.4,
          transform: `translate(-50%, -50%) scale(${circleP * pulse})`,
          opacity: circleP,
        }}
      >
        <div
          style={{
            width: 190,
            height: 190,
            borderRadius: "50%",
            border: `2px solid ${theme.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(201,164,104,0.06)",
            boxShadow: `0 0 60px rgba(201,164,104,0.18)`,
          }}
        >
          <span style={{ color: theme.gold, fontFamily, fontSize: 44, fontWeight: 700 }}>問い</span>
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
        「それは、本当に知っていると言えるのか?」
        <br />
        彼の問いは、常識と権威を静かに揺さぶった。
      </div>
    </AbsoluteFill>
  );
};
