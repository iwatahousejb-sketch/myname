import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { GreekColumns } from "../../components/GreekColumns";
import { SocratesFigure } from "../../components/SocratesFigure";
import { HemlockCup } from "../../components/HemlockCup";

export const TrialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const darken = interpolate(frame, [0, durationInFrames], [0, 0.4]);

  const caption1O = interpolate(frame, [10, 30, 130, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const caption2O = interpolate(frame, [170, 192], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const socP = spring({ frame, fps, config: { damping: 13, mass: 0.7 } });
  const cupP = spring({ frame: frame - 170, fps, config: { damping: 12, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <GreekColumns width={width} height={height * 0.86} color={theme.bgHigh} opacity={0.4} />
      <AbsoluteFill style={{ background: `rgba(0,0,0,${darken})` }} />

      <div
        style={{
          position: "absolute",
          left: width * 0.34 - 90,
          bottom: height * 0.14,
          opacity: socP * interpolate(frame, [150, 200], [1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${(1 - socP) * 20}px)`,
        }}
      >
        <SocratesFigure size={190} pose="standing" color={theme.slate} robeColor={theme.creamDim} />
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.62 - 80,
          bottom: height * 0.16,
          transform: `scale(${cupP})`,
          opacity: cupP,
        }}
      >
        <HemlockCup size={160} color={theme.gold} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: height * 0.1,
          width: "100%",
          textAlign: "center",
          opacity: caption1O,
          color: theme.white,
          fontFamily,
          fontSize: 32,
          lineHeight: 1.7,
          fontWeight: 500,
        }}
      >
        その問いは、権力者たちの怒りを買った。
        <br />
        彼は裁判にかけられ、死刑を宣告される。
      </div>

      <div
        style={{
          position: "absolute",
          bottom: height * 0.1,
          width: "100%",
          textAlign: "center",
          opacity: caption2O,
          color: theme.white,
          fontFamily,
          fontSize: 32,
          lineHeight: 1.7,
          fontWeight: 500,
        }}
      >
        紀元前399年、彼は毒杯を、静かに飲み干した。
      </div>
    </AbsoluteFill>
  );
};
