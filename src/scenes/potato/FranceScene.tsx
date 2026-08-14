import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { CrownIcon, FlowerIcon, PotatoIcon } from "../../components/HistoryIcons";
import { TorchIcon } from "../../components/HistoryIcons2";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const FranceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1819, 1849], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const parmP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const flowerP = spring({ frame: frame - 560, fps, config: { damping: 11, mass: 0.6 } });
  const kingGroupO = interpolate(frame, [460, 540], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const guardP = spring({ frame: frame - 940, fps, config: { damping: 200 } });
  const harvestCrowd = [0.32, 0.44, 0.56, 0.68];

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
        フランス王国 ── アントワーヌ・パルマンティエ
      </div>

      <SceneShot from={0} to={480}>
        <div
          style={{
            position: "absolute",
            left: width * 0.5 - 55,
            top: height * 0.3,
            opacity: parmP,
            transform: `translateY(${(1 - parmP) * 20}px)`,
          }}
        >
          <SilhouetteFigure size={130} color={theme.slate} />
        </div>
      </SceneShot>

      <SceneShot from={480} to={910}>
        <div style={{ position: "absolute", left: width * 0.5 - 130, top: height * 0.28, opacity: kingGroupO, display: "flex", gap: 46 }}>
          <div style={{ position: "relative" }}>
            <SilhouetteFigure size={110} color={theme.gold} />
            <div style={{ position: "absolute", top: -30, left: 28 }}>
              <CrownIcon size={36} color={theme.gold} />
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <SilhouetteFigure size={110} color={theme.cream} />
            <div style={{ position: "absolute", top: -30, left: 28 }}>
              <CrownIcon size={36} color={theme.cream} />
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: width * 0.5 - 20,
            top: height * 0.22,
            transform: `scale(${flowerP})`,
            opacity: flowerP,
          }}
        >
          <FlowerIcon size={44} color={theme.gold} />
        </div>
      </SceneShot>

      <SceneShot from={910} to={1450}>
        <div style={{ position: "absolute", left: width * 0.28, bottom: height * 0.16, opacity: guardP }}>
          <SilhouetteFigure size={110} color={theme.creamDim} />
        </div>
        <div
          style={{
            position: "absolute",
            left: width * 0.62,
            top: height * 0.24,
            opacity: interpolate(frame - 990, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <TorchIcon size={80} color={theme.gold} />
        </div>
      </SceneShot>

      <SceneShot from={1450} to={1849}>
        {harvestCrowd.map((x, i) => {
          const s = spring({ frame: frame - 1490 - i * 22, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ position: "absolute", left: width * x, bottom: height * 0.16, opacity: s }}>
              <SilhouetteFigure size={95} color={i % 2 === 0 ? theme.cream : theme.slate} />
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: width * 0.5 - 24,
            top: height * 0.3,
            opacity: interpolate(frame - 1600, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <PotatoIcon size={48} color={theme.gold} />
        </div>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          {
            text: "一方フランスでは、薬剤師アントワーヌ・パルマンティエが、七年戦争でプロイセン軍の捕虜となり、ジャガイモだけの食事で健康を保った経験から、普及活動に生涯を捧げました",
            from: 40,
            to: 469,
          },
          {
            text: "国王ルイ16世とマリー・アントワネットにジャガイモの花を贈り、二人がそれを衣装に着けたことで社交界の話題になった、という逸話は複数の史料で伝えられています",
            from: 491,
            to: 899,
          },
          {
            text: "パルマンティエ自身も、パリ郊外の痩せた土地にジャガイモ畑を作り、あえて衛兵を配置して昼間だけ厳重に警備し、夜はわざと見回りを外すことで、周囲に「盗んででも欲しくなる価値」を演出したとされています",
            from: 921,
            to: 1435,
          },
          {
            text: "この作戦は功を奏し、1785年の北フランスの飢饉をきっかけに、ジャガイモは非常食として一気に広まっていきました",
            from: 1457,
            to: 1749,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
