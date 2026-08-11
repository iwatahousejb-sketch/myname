import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { CrownIcon, GraveMarker, PotatoIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";

export const FrederickScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const exit = interpolate(frame, [1320, 1350], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kingP = spring({ frame: frame - 20, fps: 30, config: { damping: 200 } });
  const graveP = spring({ frame: frame - 1020, fps: 30, config: { damping: 12, mass: 0.6 } });
  const graveGroupO = interpolate(frame, [990, 1080], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        プロイセン王国 ── フリードリヒ2世
      </div>

      <div
        style={{
          position: "absolute",
          left: width * 0.28 - 60,
          top: height * 0.32,
          opacity: kingP,
          transform: `translateY(${(1 - kingP) * 20}px)`,
        }}
      >
        <SilhouetteFigure size={120} color={theme.gold} />
        <div style={{ position: "absolute", top: -34, left: 30 }}>
          <CrownIcon size={40} color={theme.gold} />
        </div>
      </div>

      <div style={{ position: "absolute", left: width * 0.7 - 70, top: height * 0.55, opacity: graveGroupO }}>
        <GraveMarker size={100} color={theme.creamDim} />
        <div style={{ position: "absolute", top: 30, left: 34, transform: `scale(${graveP})`, opacity: graveP }}>
          <PotatoIcon size={30} color={theme.gold} />
        </div>
      </div>

      <CaptionSequence
        items={[
          { text: "18世紀、状況を変えようとしたのが為政者たちだった", from: 40, to: 280 },
          { text: "フリードリヒ2世は、栽培奨励の布告を15回以上出した", from: 340, to: 660 },
          { text: "農民にはほとんど無視され、即効性はなかったとされる", from: 720, to: 980 },
          { text: "後世「ジャガイモ王」と呼ばれ、墓には今も供え物が絶えない", from: 1060, to: 1300 },
        ]}
      />
    </AbsoluteFill>
  );
};
