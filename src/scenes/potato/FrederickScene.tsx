import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { CrownIcon, GraveMarker, PotatoIcon } from "../../components/HistoryIcons";
import { ScrollIcon } from "../../components/HistoryIcons2";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const FrederickScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1516, 1546], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kingP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const scrollP = spring({ frame: frame - 230, fps, config: { damping: 200 } });
  const guardP = spring({ frame: frame - 580, fps, config: { damping: 200 } });
  const graveP = spring({ frame: frame - 1180, fps, config: { damping: 12, mass: 0.6 } });
  const graveGroupO = interpolate(frame, [1150, 1240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const fieldPotatoes = [0.4, 0.48, 0.56, 0.64];

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
        プロイセン王国 ── フリードリヒ2世
      </div>

      <SceneShot from={0} to={230}>
        <div
          style={{
            position: "absolute",
            left: width * 0.5 - 65,
            top: height * 0.3,
            opacity: kingP,
            transform: `translateY(${(1 - kingP) * 20}px)`,
          }}
        >
          <SilhouetteFigure size={130} color={theme.gold} />
          <div style={{ position: "absolute", top: -34, left: 34 }}>
            <CrownIcon size={40} color={theme.gold} />
          </div>
        </div>
      </SceneShot>

      <SceneShot from={230} to={580}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${scrollP})`, opacity: scrollP }}>
            <ScrollIcon size={140} color={theme.gold} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={580} to={1150}>
        <div style={{ position: "absolute", left: width * 0.24, bottom: height * 0.18, opacity: guardP }}>
          <SilhouetteFigure size={110} color={theme.creamDim} />
        </div>
        {fieldPotatoes.map((x, i) => {
          const s = spring({ frame: frame - 620 - i * 20, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: width * x,
                bottom: height * 0.15,
                transform: `scale(${s})`,
                opacity: s,
              }}
            >
              <PotatoIcon size={34} color={theme.gold} />
            </div>
          );
        })}
      </SceneShot>

      <SceneShot from={1150} to={1546}>
        <div style={{ position: "absolute", left: width * 0.5 - 70, top: height * 0.4, opacity: graveGroupO }}>
          <GraveMarker size={140} color={theme.creamDim} />
          <div style={{ position: "absolute", top: 42, left: 48, transform: `scale(${graveP})`, opacity: graveP }}>
            <PotatoIcon size={42} color={theme.gold} />
          </div>
        </div>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "この状況を変えようとしたのが、18世紀の為政者たちでした", from: 40, to: 188 },
          {
            text: "プロイセン国王フリードリヒ2世は、1756年を中心に、少なくとも15回にわたってジャガイモ栽培を奨励する布告を出しています",
            from: 210,
            to: 533,
          },
          {
            text: "「王室の畑にわざと見張りを置き、農民に盗ませて価値があるものだと錯覚させた」という有名なエピソードがありますが、フリードリヒ自身の布告は当時、農民にほとんど無視されており、即効性はなかったというのが歴史家の見方です",
            from: 555,
            to: 1122,
          },
          {
            text: "それでも後世、フリードリヒは「ジャガイモ王」として記憶され、彼の墓には今も参拝者がジャガイモを供えていくといいます",
            from: 1144,
            to: 1446,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
