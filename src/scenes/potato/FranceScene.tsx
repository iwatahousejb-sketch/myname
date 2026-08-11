import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { CrownIcon, FlowerIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";

export const FranceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1590, 1620], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const parmP = spring({ frame: frame - 20, fps: 30, config: { damping: 200 } });
  const flowerP = spring({ frame: frame - 920, fps: 30, config: { damping: 11, mass: 0.6 } });
  const kingGroupO = interpolate(frame, [820, 900], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        フランス王国 ── アントワーヌ・パルマンティエ
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.3 - 55,
          top: height * 0.32,
          opacity: parmP,
          transform: `translateY(${(1 - parmP) * 20}px)`,
        }}
      >
        <SilhouetteFigure size={110} color={theme.slate} />
      </div>

      <div style={{ position: "absolute", left: width * 0.66 - 130, top: height * 0.3, opacity: kingGroupO, display: "flex", gap: 46 }}>
        <div style={{ position: "relative" }}>
          <SilhouetteFigure size={95} color={theme.gold} />
          <div style={{ position: "absolute", top: -28, left: 24 }}>
            <CrownIcon size={32} color={theme.gold} />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <SilhouetteFigure size={95} color={theme.cream} />
          <div style={{ position: "absolute", top: -28, left: 24 }}>
            <CrownIcon size={32} color={theme.cream} />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.66 - 20,
          top: height * 0.24,
          transform: `scale(${flowerP})`,
          opacity: flowerP,
        }}
      >
        <FlowerIcon size={44} color={theme.gold} />
      </div>

      <CaptionSequence
        items={[
          { text: "フランスでは、薬剤師パルマンティエが尽力した", from: 40, to: 340 },
          { text: "七年戦争の捕虜生活、ジャガイモだけの食事で健康を保った", from: 400, to: 760 },
          { text: "国王ルイ16世と王妃にジャガイモの花を贈った", from: 940, to: 1180 },
          { text: "畑にあえて衛兵を置き、盗んででも欲しい価値を演出した", from: 1220, to: 1420 },
          { text: "1785年の飢饉をきっかけに、非常食として一気に広まった", from: 1440, to: 1580 },
        ]}
      />
    </AbsoluteFill>
  );
};
