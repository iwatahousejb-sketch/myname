import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { LineChart } from "../../components/LineChart";
import { CaptionSequence } from "../../components/CaptionSequence";

export const IrelandBoomScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1230, 1260], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
          color: theme.cream,
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        アイルランドの人口
      </div>

      <div style={{ position: "absolute", left: width * 0.2, top: height * 0.3, width: width * 0.6, height: height * 0.42 }}>
        <LineChart
          points={[
            { label: "1700年", value: 3 },
            { label: "1750年", value: 4.2 },
            { label: "1800年", value: 6 },
            { label: "1841年", value: 8.2 },
          ]}
          width={width * 0.6}
          height={height * 0.42}
          startFrame={280}
          unit="百万人"
        />
      </div>

      <CaptionSequence
        items={[
          { text: "この効果が最も劇的に表れたのがアイルランドだった", from: 40, to: 300 },
          { text: "1700年頃、300万人に満たなかった人口は", from: 360, to: 650 },
          { text: "1841年、およそ820万人にまで急増していた", from: 750, to: 1200 },
        ]}
      />
    </AbsoluteFill>
  );
};
