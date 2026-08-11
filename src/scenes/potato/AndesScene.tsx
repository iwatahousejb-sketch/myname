import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";

export const AndesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1320, 1350], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mountainO = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kickerO = interpolate(frame, [0, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const potatoes = [
    { x: 0.4, delay: 150 },
    { x: 0.46, delay: 185 },
    { x: 0.52, delay: 220 },
    { x: 0.58, delay: 255 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }} opacity={mountainO}>
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
        約500年前 ── 南米アンデス山脈
      </div>

      <div style={{ position: "absolute", left: width * 0.42 - 55, bottom: height * 0.2 }}>
        <SilhouetteFigure size={110} color={theme.slate} />
      </div>

      {potatoes.map((p, i) => {
        const s = spring({ frame: frame - p.delay, fps: 30, config: { damping: 12, mass: 0.5 } });
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

      <CaptionSequence
        items={[
          { text: "時計の針を、500年ほど巻き戻す", from: 40, to: 260 },
          { text: "ジャガイモの原産地は、南米アンデス山脈", from: 340, to: 680 },
          { text: "インカ帝国以前から、痩せた高地で主食として栽培されていた", from: 760, to: 1220 },
        ]}
      />
    </AbsoluteFill>
  );
};
