import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { CrownIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";

const CROWD = [0.2, 0.3, 0.4, 0.6, 0.7, 0.8];

export const RussiaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1230, 1260], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kingP = spring({ frame: frame - 20, fps: 30, config: { damping: 200 } });
  const shakeAmt = interpolate(frame, [420, 600], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = Math.sin(frame / 2) * 3 * shakeAmt;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.1,
          width: "100%",
          textAlign: "center",
          color: theme.creamDim,
          fontFamily,
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        ロシア帝国 ── ジャガイモ一揆 (1834-1844)
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.5 - 55,
          top: height * 0.22,
          opacity: kingP,
        }}
      >
        <SilhouetteFigure size={110} color={theme.slateDim} />
        <div style={{ position: "absolute", top: -30, left: 26 }}>
          <CrownIcon size={36} color={theme.slateDim} />
        </div>
      </div>

      {CROWD.map((x, i) => {
        const p = spring({ frame: frame - 450 - i * 24, fps: 30, config: { damping: 12, mass: 0.6 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * x - 45,
              bottom: height * 0.14,
              opacity: p,
              transform: `translateY(${(1 - p) * 20 + shake}px)`,
            }}
          >
            <SilhouetteFigure size={90} color={i % 2 === 0 ? theme.cream : theme.slate} />
          </div>
        );
      })}

      <CaptionSequence
        items={[
          { text: "ロシアでは、事情がまったく違った", from: 40, to: 260 },
          { text: "皇帝ニコライ1世が栽培を強制すると、農民は激しく反発", from: 320, to: 620 },
          { text: "最大50万人以上が蜂起する大規模な反乱が発生した", from: 680, to: 1000 },
          { text: "政府はついに、軍隊を投入して鎮圧した", from: 1040, to: 1220 },
        ]}
      />
    </AbsoluteFill>
  );
};
