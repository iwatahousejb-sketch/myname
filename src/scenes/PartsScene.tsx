import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../theme";
import { CpuNodeIcon, RamNodeIcon, StorageNodeIcon, IoNodeIcon } from "../components/Icons";

export const PartsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleO = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });

  const cx = width * 0.28;
  const cy = height * 0.58;
  const nodes = [
    { key: "cpu", label: "CPU", sub: "頭脳", x: cx, y: cy, Icon: CpuNodeIcon, color: theme.gold, delay: 14 },
    { key: "ram", label: "メモリ", sub: "作業机", x: cx - 235, y: cy - 165, Icon: RamNodeIcon, color: theme.cream, delay: 30 },
    { key: "storage", label: "ストレージ", sub: "倉庫", x: cx + 235, y: cy - 165, Icon: StorageNodeIcon, color: theme.cream, delay: 44 },
    { key: "io", label: "入出力装置", sub: "窓口", x: cx, y: cy + 205, Icon: IoNodeIcon, color: theme.cream, delay: 58 },
  ];

  const lineDelay = 24;

  const barO = interpolate(frame, [70, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barY = interpolate(frame, [70, 88], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bars = [
    { label: "CPU", value: 1, unit: "超高速", start: 88 },
    { label: "メモリ", value: 0.55, unit: "高速", start: 100 },
    { label: "ストレージ", value: 0.16, unit: "低速", start: 112 },
  ];
  const barAreaX = width * 0.58;
  const barMaxWidth = width * 0.34;

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
        中身は、4つのパーツでできている
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {nodes.slice(1).map((n, i) => {
          const p = spring({ frame: frame - lineDelay - i * 12, fps, config: { damping: 200 } });
          const x2 = interpolate(p, [0, 1], [cx, n.x]);
          const y2 = interpolate(p, [0, 1], [cy, n.y]);
          return (
            <line
              key={n.key}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke={theme.slate}
              strokeWidth={2}
              strokeDasharray="1 9"
              strokeLinecap="round"
            />
          );
        })}
        <line
          x1={width * 0.5}
          y1={height * 0.22}
          x2={width * 0.5}
          y2={height * 0.86}
          stroke={theme.slateDim}
          strokeWidth={1}
          opacity={0.5}
        />
      </svg>

      {nodes.map((n) => {
        const p = spring({ frame: frame - n.delay, fps, config: { damping: 11, mass: 0.55 } });
        return (
          <div
            key={n.key}
            style={{
              position: "absolute",
              left: n.x - 85,
              top: n.y - 85,
              width: 170,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              transform: `scale(${p})`,
              opacity: p,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "rgba(201,164,104,0.06)",
                border: `1.5px solid ${n.color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <n.Icon color={n.color} size={50} />
            </div>
            <span style={{ color: n.color, fontFamily, fontSize: 26, fontWeight: 700 }}>{n.label}</span>
            <span style={{ color: theme.creamDim, fontFamily, fontSize: 14 }}>{n.sub}</span>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: barAreaX,
          top: height * 0.32,
          width: barMaxWidth + 40,
          opacity: barO,
          transform: `translateY(${barY}px)`,
        }}
      >
        <div
          style={{
            color: theme.gold,
            fontFamily,
            fontSize: 22,
            letterSpacing: 3,
            fontWeight: 500,
            marginBottom: 26,
          }}
        >
          処理速度の目安
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {bars.map((b) => {
            const bp = spring({ frame: frame - b.start, fps, config: { damping: 200 } });
            const w = barMaxWidth * b.value * bp;
            return (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: theme.white, fontFamily, fontSize: 24, fontWeight: 700 }}>{b.label}</span>
                  <span style={{ color: theme.creamDim, fontFamily, fontSize: 18 }}>{b.unit}</span>
                </div>
                <div
                  style={{
                    height: 16,
                    width: barMaxWidth,
                    borderRadius: 8,
                    background: "rgba(236,228,210,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: w,
                      borderRadius: 8,
                      background: `linear-gradient(90deg, ${theme.goldDim}, ${theme.gold})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
