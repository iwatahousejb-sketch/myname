import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { FactoryIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";

const WORKERS = [0.08, 0.16, 0.24, 0.32];

export const IndustrialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1230, 1260], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const factoryP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const titleO = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.12,
          width: "100%",
          textAlign: "center",
          opacity: titleO,
          color: theme.creamDim,
          fontFamily,
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        イギリス本土
      </div>

      <div
        style={{
          position: "absolute",
          right: width * 0.16,
          bottom: height * 0.16,
          opacity: factoryP,
          transform: `scale(${factoryP})`,
        }}
      >
        <FactoryIcon size={190} color={theme.gold} />
      </div>

      {WORKERS.map((x, i) => {
        const p = spring({ frame: frame - 750 - i * 40, fps, config: { damping: 200 } });
        const travel = interpolate(p, [0, 1], [0, width * 0.32]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * x + travel,
              bottom: height * 0.16,
              opacity: p,
            }}
          >
            <SilhouetteFigure size={80} color={theme.slate} />
          </div>
        );
      })}

      <CaptionSequence
        items={[
          { text: "対照的な結果を残したのが、イギリス本土だった", from: 40, to: 320 },
          { text: "急増する人口を養えたことで、世界を支配下に置けたとする見方がある", from: 380, to: 700 },
          { text: "余った労働力は、都市の工場地帯へと流れ込んだ", from: 800, to: 1200 },
        ]}
      />
    </AbsoluteFill>
  );
};
