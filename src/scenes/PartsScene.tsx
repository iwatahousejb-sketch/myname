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

  const cx = width / 2;
  const cy = height * 0.29;
  const nodes = [
    { key: "cpu", label: "CPU", sub: "頭脳", x: cx, y: cy, Icon: CpuNodeIcon, color: theme.green, delay: 14 },
    { key: "ram", label: "メモリ", sub: "作業机", x: cx - 240, y: cy - 195, Icon: RamNodeIcon, color: theme.cream, delay: 30 },
    { key: "storage", label: "ストレージ", sub: "倉庫", x: cx + 240, y: cy - 195, Icon: StorageNodeIcon, color: theme.cream, delay: 44 },
    { key: "io", label: "入出力装置", sub: "窓口", x: cx, y: cy + 235, Icon: IoNodeIcon, color: theme.cream, delay: 58 },
  ];

  const lineDelay = 24;

  // data viz
  const barO = interpolate(frame, [110, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barY = interpolate(frame, [110, 128], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bars = [
    { label: "CPU", value: 1, unit: "超高速", start: 128 },
    { label: "メモリ", value: 0.55, unit: "高速", start: 140 },
    { label: "ストレージ", value: 0.16, unit: "低速", start: 152 },
  ];
  const barMaxWidth = width * 0.62;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.06,
          width: "100%",
          textAlign: "center",
          opacity: titleO,
          color: theme.cream,
          fontFamily,
          fontSize: 42,
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
              stroke={theme.greenDim}
              strokeWidth={2.5}
              strokeDasharray="1 9"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {nodes.map((n) => {
        const p = spring({ frame: frame - n.delay, fps, config: { damping: 11, mass: 0.55 } });
        return (
          <div
            key={n.key}
            style={{
              position: "absolute",
              left: n.x - 90,
              top: n.y - 90,
              width: 180,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              transform: `scale(${p})`,
              opacity: p,
            }}
          >
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: "50%",
                background: "rgba(47,224,160,0.07)",
                border: `1.5px solid ${n.color}66`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <n.Icon color={n.color} size={56} />
            </div>
            <span style={{ color: n.color, fontFamily, fontSize: 30, fontWeight: 700 }}>{n.label}</span>
            <span style={{ color: theme.creamDim, fontFamily, fontSize: 16 }}>{n.sub}</span>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: height * 0.63,
          width: "100%",
          padding: "0 9%",
          opacity: barO,
          transform: `translateY(${barY}px)`,
        }}
      >
        <div
          style={{
            color: theme.green,
            fontFamily,
            fontSize: 24,
            letterSpacing: 3,
            fontWeight: 500,
            marginBottom: 22,
            textAlign: "center",
          }}
        >
          処理速度の目安
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {bars.map((b) => {
            const bp = spring({ frame: frame - b.start, fps, config: { damping: 200 } });
            const w = barMaxWidth * b.value * bp;
            return (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: theme.white, fontFamily, fontSize: 26, fontWeight: 700 }}>{b.label}</span>
                  <span style={{ color: theme.creamDim, fontFamily, fontSize: 20 }}>{b.unit}</span>
                </div>
                <div
                  style={{
                    height: 20,
                    width: barMaxWidth,
                    borderRadius: 10,
                    background: "rgba(239,227,200,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: w,
                      borderRadius: 10,
                      background: `linear-gradient(90deg, ${theme.greenDim}, ${theme.green})`,
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
