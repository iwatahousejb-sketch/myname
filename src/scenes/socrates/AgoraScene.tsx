import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { GreekColumns } from "../../components/GreekColumns";
import { SocratesFigure } from "../../components/SocratesFigure";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";

const CROWD = [
  { x: 0.28, size: 90, delay: 20 },
  { x: 0.36, size: 78, delay: 28 },
  { x: 0.66, size: 82, delay: 24 },
  { x: 0.74, size: 92, delay: 32 },
];

export const AgoraScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kickerO = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const socP = spring({ frame: frame - 10, fps, config: { damping: 13, mass: 0.7 } });

  const captionO = interpolate(frame, [70, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [70, 92], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <GreekColumns width={width} height={height * 0.86} color={theme.bgHigh} opacity={0.55} />

      <div
        style={{
          position: "absolute",
          top: height * 0.1,
          width: "100%",
          textAlign: "center",
          opacity: kickerO,
          color: theme.gold,
          fontFamily,
          fontSize: 24,
          letterSpacing: 5,
        }}
      >
        紀元前469年 ── アテナイ
      </div>

      {CROWD.map((c, i) => {
        const p = spring({ frame: frame - c.delay, fps, config: { damping: 200 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * c.x - c.size / 2,
              bottom: height * 0.14,
              opacity: p * 0.8,
              transform: `translateY(${(1 - p) * 20}px)`,
            }}
          >
            <SilhouetteFigure size={c.size} color={theme.slateDim} />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: width / 2 - 110,
          bottom: height * 0.14,
          opacity: socP,
          transform: `translateY(${(1 - socP) * 24}px)`,
        }}
      >
        <SocratesFigure size={220} pose="teaching" color={theme.slate} robeColor={theme.cream} />
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
        石工の子として生まれた男が、
        <br />
        後に「西洋哲学の父」と呼ばれることになる。
      </div>
    </AbsoluteFill>
  );
};
