import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { RouteMap } from "../../components/RouteMap";
import { CaptionSequence } from "../../components/CaptionSequence";

export const ExchangeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1320, 1350], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelO = interpolate(frame, [700, 740], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div style={{ position: "absolute", top: height * 0.14, width: "100%" }}>
        <RouteMap width={width} height={height * 0.5} startFrame={60} fromLabel="南米" toLabel="ヨーロッパ" />
      </div>

      <div
        style={{
          position: "absolute",
          top: height * 0.62,
          width: "100%",
          textAlign: "center",
          opacity: labelO,
        }}
      >
        <span style={{ color: theme.gold, fontFamily, fontSize: 34, fontWeight: 700, letterSpacing: 3 }}>
          コロンブス交換
        </span>
      </div>

      <CaptionSequence
        items={[
          { text: "16世紀、スペイン人が南米を征服する", from: 40, to: 280 },
          { text: "銀や金と共に、この地味な作物をヨーロッパへ持ち帰った", from: 340, to: 650 },
          { text: "後に「コロンブス交換」と呼ばれる現象の始まりだった", from: 780, to: 1220 },
        ]}
      />
    </AbsoluteFill>
  );
};
