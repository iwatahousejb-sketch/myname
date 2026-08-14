import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { CrownIcon, FlowerIcon, PotatoIcon } from "../../components/HistoryIcons";
import { TorchIcon } from "../../components/HistoryIcons2";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

const CROWD = [0.2, 0.3, 0.4, 0.6, 0.7, 0.8];

export const RussiaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1336, 1366], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kingP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const shakeAmt = interpolate(frame, [471, 650], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = Math.sin(frame / 2) * 3 * shakeAmt;
  const farmerP = spring({ frame: frame - 190, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: height * 0.1,
          width: "100%",
          textAlign: "center",
          color: theme.creamDim,
          fontFamily: serifFontFamily,
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        ロシア帝国 ── ジャガイモ一揆 (1834-1844)
      </div>

      <SceneShot from={0} to={190}>
        <div style={{ position: "absolute", left: width * 0.5 - 55, top: height * 0.28, opacity: kingP }}>
          <SilhouetteFigure size={130} color={theme.slateDim} />
          <div style={{ position: "absolute", top: -34, left: 34 }}>
            <CrownIcon size={40} color={theme.slateDim} />
          </div>
        </div>
      </SceneShot>

      <SceneShot from={190} to={471}>
        {[0.3, 0.45, 0.6, 0.75].map((x, i) => {
          const s = spring({ frame: frame - 220 - i * 18, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div key={i} style={{ position: "absolute", left: width * x, bottom: height * 0.16, opacity: s }}>
              <PotatoIcon size={30} color={theme.creamDim} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: width * 0.5 - 55, bottom: height * 0.18, opacity: farmerP }}>
          <SilhouetteFigure size={110} color={theme.slate} />
        </div>
      </SceneShot>

      <SceneShot from={471} to={1040}>
        {CROWD.map((x, i) => {
          const p = spring({ frame: frame - 480 - i * 24, fps, config: { damping: 12, mass: 0.6 } });
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
        {[0.24, 0.78].map((x, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * x,
              top: height * 0.22,
              opacity: interpolate(frame - 620, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <TorchIcon size={64} color={theme.gold} />
          </div>
        ))}
      </SceneShot>

      <SceneShot from={1040} to={1366}>
        <div style={{ position: "absolute", left: width * 0.3 - 22, top: height * 0.32, opacity: interpolate(frame - 1060, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <FlowerIcon size={54} color={theme.gold} />
        </div>
        <div style={{ position: "absolute", left: width * 0.66 - 22, top: height * 0.32, opacity: interpolate(frame - 1090, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <TorchIcon size={54} color={theme.gold} />
        </div>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "一方、ロシアでは事情がまったく違いました", from: 40, to: 146 },
          {
            text: "皇帝ニコライ1世のもとで、国有農民にジャガイモ栽培を強制する政策がとられると、農民たちは激しく反発しました",
            from: 168,
            to: 449,
          },
          {
            text: "1834年から1844年にかけて、「ジャガイモ一揆」と呼ばれる大規模な反乱がウラル地方などで発生し、最大で50万人以上の農民が蜂起して畑を破壊し、政府はついに軍隊を投入して鎮圧するという事態にまで発展しています",
            from: 471,
            to: 1027,
          },
          { text: "一つの作物をめぐって、ある国では国王が花を配り、別の国では農民が武器を取ったのです", from: 1049, to: 1266 },
        ]}
      />
    </AbsoluteFill>
  );
};
