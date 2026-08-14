import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { ChurchIcon, ScrollIcon, TroughIcon } from "../../components/HistoryIcons2";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const RejectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1370, 1400], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleO = interpolate(frame, [1130, 1170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const figP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const potatoP = spring({ frame: frame - 250, fps, config: { damping: 12, mass: 0.6 } });
  const churchP = spring({ frame: frame - 580, fps, config: { damping: 200 } });
  const scrollP = spring({ frame: frame - 790, fps, config: { damping: 200 } });
  const troughP = spring({ frame: frame - 1160, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <SceneShot from={0} to={250}>
        <div
          style={{
            position: "absolute",
            left: width * 0.5 - 65,
            top: height * 0.3,
            opacity: figP,
            transform: `translateY(${(1 - figP) * 20}px)`,
          }}
        >
          <SilhouetteFigure size={130} color={theme.slateDim} />
        </div>
      </SceneShot>

      <SceneShot from={250} to={570}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${potatoP})`, opacity: potatoP, position: "relative" }}>
            <PotatoIcon size={130} color="#c96a4a" />
            <svg width={130} height={130} viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0 }}>
              <line x1="20" y1="20" x2="80" y2="80" stroke="#c96a4a" strokeWidth={5} strokeLinecap="round" opacity={0.85} />
              <line x1="80" y1="20" x2="20" y2="80" stroke="#c96a4a" strokeWidth={5} strokeLinecap="round" opacity={0.85} />
            </svg>
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={570} to={790}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${churchP})`, opacity: churchP }}>
            <ChurchIcon size={140} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={790} to={1160}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${scrollP})`, opacity: scrollP }}>
            <ScrollIcon size={140} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={1160} to={1400}>
        <div
          style={{
            position: "absolute",
            top: height * 0.14,
            width: "100%",
            textAlign: "center",
            opacity: titleO,
            color: theme.gold,
            fontFamily: serifFontFamily,
            fontSize: 46,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          「悪魔の植物」
        </div>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${troughP})`, opacity: troughP }}>
            <TroughIcon size={140} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "しかし持ち帰られた当初、ジャガイモはすぐには受け入れられませんでした", from: 40, to: 220 },
          { text: "理由の一つは見た目です", from: 242, to: 317 },
          { text: "ジャガイモはナス科の植物で、当時のヨーロッパ人には毒草に近い印象を持たれていました", from: 339, to: 556 },
          { text: "聖書に記載のない未知の作物への宗教的な警戒心もあったと言われています", from: 578, to: 758 },
          {
            text: "実際、フランスの一部地域では、レプラの原因になるという誤解から、ジャガイモの栽培や消費を禁止する法律まで存在しました",
            from: 780,
            to: 1087,
          },
          { text: "「悪魔の植物」と呼ばれ、家畜の餌程度の扱いを受けていた時期もあったのです", from: 1109, to: 1300 },
        ]}
      />
    </AbsoluteFill>
  );
};
