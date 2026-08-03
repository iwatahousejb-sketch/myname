import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";
import { InputIcon, ProcessIcon, OutputIcon } from "../components/Icons";

const NODES = [
  { label: "入力", sub: "INPUT", Icon: InputIcon, color: theme.cream },
  { label: "処理", sub: "PROCESS", Icon: ProcessIcon, color: theme.gold },
  { label: "出力", sub: "OUTPUT", Icon: OutputIcon, color: theme.cream },
];

export const IOScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cy = height * 0.46;
  const nodeXs = [0.22, 0.5, 0.78].map((f) => width * f);
  const nodeStart = [8, 34, 60];
  const lineStart = [24, 50];

  const kickerO = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const captionText = "情報を「入力」し、「処理」して、「出力」する機械。";
  const captionO = interpolate(frame, [95, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [95, 118], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pulseCycle = 42;
  const pulseLocal = ((frame - 100) % pulseCycle) / pulseCycle;
  const pulseActive = frame >= 100;
  const pulseT = Math.max(0, Math.min(1, pulseLocal)) * 2;
  let pulseX = nodeXs[0];
  let pulseVisible = false;
  if (pulseActive) {
    if (pulseT <= 1) {
      pulseX = interpolate(pulseT, [0, 1], [nodeXs[0], nodeXs[1]]);
      pulseVisible = true;
    } else {
      pulseX = interpolate(pulseT - 1, [0, 1], [nodeXs[1], nodeXs[2]]);
      pulseVisible = true;
    }
  }

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.1,
          width: "100%",
          textAlign: "center",
          opacity: kickerO,
        }}
      >
        <span
          style={{
            color: theme.gold,
            fontFamily,
            fontSize: 26,
            letterSpacing: 6,
            fontWeight: 500,
          }}
        >
          パソコンの正体
        </span>
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {lineStart.map((ls, i) => {
          const p = spring({ frame: frame - ls, fps, config: { damping: 200 } });
          const x1 = nodeXs[i] + 78;
          const x2 = nodeXs[i + 1] - 78;
          const xMid = interpolate(p, [0, 1], [x1, x2]);
          return (
            <line
              key={i}
              x1={x1}
              y1={cy}
              x2={xMid}
              y2={cy}
              stroke={theme.creamDim}
              strokeWidth={2.5}
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          );
        })}
        {pulseVisible && (
          <circle cx={pulseX} cy={cy} r={7} fill={theme.gold} opacity={0.95}>
            <animate attributeName="r" values="5;9;5" dur="0.7s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {NODES.map((n, i) => {
        const p = spring({ frame: frame - nodeStart[i], fps, config: { damping: 12, mass: 0.6 } });
        return (
          <div
            key={n.label}
            style={{
              position: "absolute",
              top: cy - 150,
              left: nodeXs[i] - 100,
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transform: `scale(${p})`,
              opacity: p,
            }}
          >
            <div
              style={{
                width: 118,
                height: 118,
                borderRadius: "50%",
                background: "rgba(236,228,210,0.05)",
                border: `1.5px solid ${n.color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <n.Icon color={n.color} size={58} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: n.color, fontFamily, fontSize: 36, fontWeight: 700 }}>{n.label}</span>
              <span style={{ color: theme.creamDim, fontFamily, fontSize: 15, letterSpacing: 3 }}>{n.sub}</span>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: height * 0.12,
          width: "100%",
          textAlign: "center",
          opacity: captionO,
          transform: `translateY(${captionY}px)`,
          color: theme.white,
          fontFamily,
          fontSize: 32,
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {captionText}
      </div>
    </AbsoluteFill>
  );
};
