import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { CaptionSequence } from "../../components/CaptionSequence";

const BARS = [
  { label: "ジャガイモ", value: 1, start: 640 },
  { label: "小麦", value: 0.34, start: 690 },
  { label: "大麦", value: 0.36, start: 740 },
  { label: "オート麦", value: 0.3, start: 790 },
];

export const EnergyDataScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1230, 1260], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleO = interpolate(frame, [570, 610], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barMaxWidth = width * 0.5;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.16,
          width: "100%",
          textAlign: "center",
          opacity: titleO,
          color: theme.gold,
          fontFamily,
          fontSize: 24,
          letterSpacing: 3,
        }}
      >
        同じ面積の土地から得られるエネルギー量(目安)
      </div>

      <div style={{ position: "absolute", left: width / 2 - barMaxWidth / 2, top: height * 0.32, width: barMaxWidth }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {BARS.map((b) => {
            const bp = spring({ frame: frame - b.start, fps, config: { damping: 200 } });
            const w = barMaxWidth * b.value * bp;
            return (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ color: theme.white, fontFamily, fontSize: 24, fontWeight: 700 }}>{b.label}</span>
                <div
                  style={{
                    height: 20,
                    width: barMaxWidth,
                    borderRadius: 10,
                    background: "rgba(236,228,210,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: w,
                      borderRadius: 10,
                      background:
                        b.label === "ジャガイモ"
                          ? `linear-gradient(90deg, ${theme.goldDim}, ${theme.gold})`
                          : theme.slateDim,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CaptionSequence
        items={[
          { text: "為政者たちは、なぜそこまで普及させたかったのか", from: 40, to: 340 },
          { text: "経済学者ナンとチエンの研究(2011)によれば", from: 400, to: 610 },
          { text: "小麦や大麦のおよそ3倍のエネルギーを生産できる", from: 850, to: 1200 },
        ]}
      />
    </AbsoluteFill>
  );
};
