import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";
import { InputIcon, ProcessIcon, OutputIcon } from "../components/Icons";

const NODES = [
  { label: "入力", sub: "INPUT", Icon: InputIcon, color: theme.cream },
  { label: "処理", sub: "PROCESS", Icon: ProcessIcon, color: theme.green },
  { label: "出力", sub: "OUTPUT", Icon: OutputIcon, color: theme.cream },
];

export const IOScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cx = width / 2;
  const nodeYs = [0.3, 0.52, 0.74].map((f) => height * f);
  const nodeStart = [8, 34, 60];
  const lineStart = [24, 50];

  const kickerO = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const captionText = "情報を「入力」し、「処理」して、\n「出力」する機械。";
  const captionO = interpolate(frame, [95, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [95, 118], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pulseCycle = 42;
  const pulseLocal = ((frame - 100) % pulseCycle) / pulseCycle;
  const pulseActive = frame >= 100;
  const pulseT = Math.max(0, Math.min(1, pulseLocal)) * 2;
  let pulseY = nodeYs[0];
  let pulseVisible = false;
  if (pulseActive) {
    if (pulseT <= 1) {
      pulseY = interpolate(pulseT, [0, 1], [nodeYs[0], nodeYs[1]]);
      pulseVisible = true;
    } else {
      pulseY = interpolate(pulseT - 1, [0, 1], [nodeYs[1], nodeYs[2]]);
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
            color: theme.green,
            fontFamily,
            fontSize: 28,
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
          const y1 = nodeYs[i] + 68;
          const y2 = nodeYs[i + 1] - 68;
          const yMid = interpolate(p, [0, 1], [y1, y2]);
          return (
            <line
              key={i}
              x1={cx}
              y1={y1}
              x2={cx}
              y2={yMid}
              stroke={theme.creamDim}
              strokeWidth={3}
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          );
        })}
        {pulseVisible && (
          <circle cx={cx} cy={pulseY} r={9} fill={theme.green} opacity={0.95}>
            <animate attributeName="r" values="7;11;7" dur="0.7s" repeatCount="indefinite" />
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
              top: nodeYs[i] - 68,
              left: cx - 200,
              width: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
              transform: `scale(${p})`,
              opacity: p,
            }}
          >
            <div
              style={{
                width: 136,
                height: 136,
                borderRadius: "50%",
                background: "rgba(239,227,200,0.06)",
                border: `1.5px solid ${n.color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <n.Icon color={n.color} size={68} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: n.color, fontFamily, fontSize: 44, fontWeight: 700 }}>{n.label}</span>
              <span style={{ color: theme.creamDim, fontFamily, fontSize: 18, letterSpacing: 3 }}>{n.sub}</span>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: height * 0.09,
          width: "100%",
          textAlign: "center",
          opacity: captionO,
          transform: `translateY(${captionY}px)`,
          whiteSpace: "pre-line",
          color: theme.white,
          fontFamily,
          fontSize: 34,
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {captionText}
      </div>
    </AbsoluteFill>
  );
};
