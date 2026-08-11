import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { FactoryIcon } from "../../components/HistoryIcons";
import { CityIcon, GearIcon } from "../../components/HistoryIcons2";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

const WORKERS = [0.08, 0.16, 0.24, 0.32];

export const IndustrialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1581, 1611], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const factoryP = spring({ frame: frame - 240, fps, config: { damping: 200 } });
  const titleO = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cityP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const gearP = spring({ frame: frame - 1200, fps, config: { damping: 200 } });

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
          fontFamily: serifFontFamily,
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        イギリス本土
      </div>

      <SceneShot from={0} to={240}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${cityP})`, opacity: cityP }}>
            <CityIcon size={130} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={240} to={773}>
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
      </SceneShot>

      <SceneShot from={773} to={1200}>
        {WORKERS.map((x, i) => {
          const p = spring({ frame: frame - 800 - i * 40, fps, config: { damping: 200 } });
          const travel = interpolate(p, [0, 1], [0, width * 0.32]);
          return (
            <div key={i} style={{ position: "absolute", left: width * x + travel, bottom: height * 0.16, opacity: p }}>
              <SilhouetteFigure size={80} color={theme.slate} />
            </div>
          );
        })}
      </SceneShot>

      <SceneShot from={1200} to={1611}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
            <div style={{ transform: `scale(${gearP}) rotate(${gearP * 30}deg)`, opacity: gearP }}>
              <GearIcon size={100} color={theme.gold} />
            </div>
            <div style={{ transform: `scale(${gearP})`, opacity: gearP }}>
              <CityIcon size={110} color={theme.creamDim} />
            </div>
          </div>
        </AbsoluteFill>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "一方、アイルランドとは対照的な結果を残したのがイギリス本土です", from: 40, to: 204 },
          {
            text: "歴史家ウィリアム・マクニールは、1999年の論文の中で、ジャガイモが急増する人口を養ったことによって、一握りのヨーロッパ諸国が1750年以降、世界の広範囲を支配下に置くことを可能にしたと論じています",
            from: 226,
            to: 751,
          },
          {
            text: "農業生産性の向上によって余った労働力が農村から都市の工場地帯へと流れ込み、産業革命を支える安価な労働力の供給源の一つになったという見方もあります",
            from: 773,
            to: 1155,
          },
          {
            text: "主食の話が、気づけば「なぜ一部のヨーロッパ諸国だけが世界的な覇権を握ったのか」という、より大きな問いにまでつながっていくのです",
            from: 1177,
            to: 1511,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
