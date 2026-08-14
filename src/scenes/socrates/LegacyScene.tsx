import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";

const CHAIN = [
  { label: "ソクラテス", sub: "哲学の問い", delay: 10 },
  { label: "プラトン", sub: "弟子", delay: 40 },
  { label: "アリストテレス", sub: "孫弟子", delay: 70 },
];

export const LegacyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleO = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const cy = height * 0.44;
  const xs = [0.24, 0.5, 0.76].map((f) => width * f);

  const captionO = interpolate(frame, [110, 132], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [110, 132], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.09,
          width: "100%",
          textAlign: "center",
          opacity: titleO,
          color: theme.cream,
          fontFamily,
          fontSize: 38,
          fontWeight: 700,
        }}
      >
        問いは、次の世代へと受け継がれた
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {[0, 1].map((i) => {
          const p = spring({ frame: frame - CHAIN[i + 1].delay + 6, fps, config: { damping: 200 } });
          const x2 = interpolate(p, [0, 1], [xs[i], xs[i + 1]]);
          return (
            <line
              key={i}
              x1={xs[i]}
              y1={cy}
              x2={x2}
              y2={cy}
              stroke={theme.gold}
              strokeWidth={2}
              strokeDasharray="1 9"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {CHAIN.map((c, i) => {
        const p = spring({ frame: frame - c.delay, fps, config: { damping: 11, mass: 0.6 } });
        return (
          <div
            key={c.label}
            style={{
              position: "absolute",
              left: xs[i] - 90,
              top: cy - 110,
              width: 180,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              transform: `scale(${p})`,
              opacity: p,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(201,164,104,0.06)",
                border: `1.5px solid ${i === 0 ? theme.gold : theme.cream}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <SilhouetteFigure size={56} color={i === 0 ? theme.gold : theme.cream} />
            </div>
            <span style={{ color: i === 0 ? theme.gold : theme.cream, fontFamily, fontSize: 24, fontWeight: 700 }}>
              {c.label}
            </span>
            <span style={{ color: theme.creamDim, fontFamily, fontSize: 14 }}>{c.sub}</span>
          </div>
        );
      })}

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
        彼の思想は弟子たちへ受け継がれ、西洋哲学の礎となった。
      </div>
    </AbsoluteFill>
  );
};
