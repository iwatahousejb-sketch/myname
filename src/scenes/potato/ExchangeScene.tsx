import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { RouteMap } from "../../components/RouteMap";
import { ShipIcon, CrownIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const ExchangeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [693, 723], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelO = interpolate(frame, [600, 640], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const figP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const coinDelays = [90, 115, 140];

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <SceneShot from={0} to={300}>
        <div style={{ position: "absolute", left: width * 0.5 - 55, top: height * 0.3, opacity: figP }}>
          <SilhouetteFigure size={130} color={theme.gold} />
          <div style={{ position: "absolute", top: -30, left: 40 }}>
            <CrownIcon size={30} color={theme.gold} />
          </div>
        </div>
        {coinDelays.map((d, i) => {
          const s = spring({ frame: frame - d, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: width * (0.4 + i * 0.08),
                top: height * 0.66,
                transform: `scale(${s})`,
                opacity: s,
              }}
            >
              <svg width={30} height={30} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="34" stroke={theme.gold} strokeWidth={6} fill="none" />
                <text x="50" y="62" textAnchor="middle" fill={theme.gold} fontSize={38}>
                  $
                </text>
              </svg>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            bottom: height * 0.18,
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <ShipIcon size={70} color={theme.creamDim} />
        </div>
      </SceneShot>

      <SceneShot from={300} to={723}>
        <div style={{ position: "absolute", top: height * 0.14, width: "100%" }}>
          <RouteMap width={width} height={height * 0.5} startFrame={40} fromLabel="南米" toLabel="ヨーロッパ" />
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
          <span style={{ color: theme.gold, fontFamily: serifFontFamily, fontSize: 34, fontWeight: 700, letterSpacing: 3 }}>
            コロンブス交換
          </span>
        </div>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          {
            text: "16世紀、スペイン人が南米を征服した際、銀や金と一緒に、この地味な作物をヨーロッパに持ち帰ります",
            from: 40,
            to: 294,
          },
          {
            text: "アメリカ大陸とユーラシア大陸の間でモノや作物、病原菌までもが行き来したこの現象は、後に「コロンブス交換」と呼ばれます",
            from: 316,
            to: 623,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
