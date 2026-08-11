import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { HourglassIcon } from "../../components/HistoryIcons2";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

const Mountains: React.FC<{ width: number; height: number; opacity: number }> = ({ width, height, opacity }) => (
  <svg width={width} height={height} style={{ position: "absolute", inset: 0 }} opacity={opacity}>
    <path
      d={`M0,${height * 0.72} L${width * 0.14},${height * 0.42} L${width * 0.26},${height * 0.6} L${width * 0.4},${height * 0.3} L${width * 0.54},${height * 0.62} L${width * 0.68},${height * 0.36} L${width * 0.82},${height * 0.6} L${width},${height * 0.5} L${width},${height} L0,${height} Z`}
      fill={theme.bgHigh}
      opacity={0.55}
    />
    <path
      d={`M0,${height * 0.82} L${width * 0.2},${height * 0.58} L${width * 0.36},${height * 0.7} L${width * 0.5},${height * 0.5} L${width * 0.66},${height * 0.74} L${width * 0.84},${height * 0.56} L${width},${height * 0.7} L${width},${height} L0,${height} Z`}
      fill={theme.bgMid}
      opacity={0.8}
    />
  </svg>
);

export const AndesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [615, 645], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kickerO = interpolate(frame, [0, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const hourP = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const figP = spring({ frame: frame - 300, fps, config: { damping: 200 } });

  const potatoes = [
    { x: 0.38, delay: 320 },
    { x: 0.46, delay: 345 },
    { x: 0.54, delay: 370 },
    { x: 0.62, delay: 395 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.1,
          width: "100%",
          textAlign: "center",
          opacity: kickerO,
          color: theme.gold,
          fontFamily: serifFontFamily,
          fontSize: 24,
          letterSpacing: 5,
        }}
      >
        約500年前 ── 南米アンデス山脈
      </div>

      <SceneShot from={0} to={165}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${hourP})`, opacity: hourP }}>
            <HourglassIcon size={130} color={theme.gold} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={165} to={300}>
        <Mountains width={width} height={height} opacity={1} />
      </SceneShot>

      <SceneShot from={300} to={645}>
        <Mountains width={width} height={height} opacity={0.5} />
        <div
          style={{
            position: "absolute",
            left: width * 0.42 - 55,
            bottom: height * 0.2,
            opacity: figP,
            transform: `scale(${0.9 + figP * 0.1})`,
          }}
        >
          <SilhouetteFigure size={130} color={theme.slate} />
        </div>
        {potatoes.map((p, i) => {
          const s = spring({ frame: frame - p.delay, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: width * p.x - 18,
                bottom: height * 0.16,
                transform: `scale(${s})`,
                opacity: s,
              }}
            >
              <PotatoIcon size={36} color={theme.creamDim} />
            </div>
          );
        })}
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "まず時計の針を500年ほど巻き戻します", from: 40, to: 141 },
          { text: "ジャガイモの原産地は南米アンデス山脈です", from: 163, to: 269 },
          {
            text: "インカ帝国以前から、この地域の人々は標高の高い痩せた土地でジャガイモを主食として栽培していました",
            from: 291,
            to: 545,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
