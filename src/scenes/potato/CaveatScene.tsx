import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { GearIcon, MedicalIcon, WheatIcon, BookIcon, MagnifyingIcon } from "../../components/HistoryIcons2";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

const CautionIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 12 L92 84 L8 84 Z" stroke={color} strokeWidth={4} strokeLinejoin="round" />
    <line x1="50" y1="38" x2="50" y2="62" stroke={color} strokeWidth={4.5} strokeLinecap="round" />
    <circle cx="50" cy="72" r="3.2" fill={color} />
  </svg>
);

export const CaveatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cautionP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const gearP = spring({ frame: frame - 170, fps, config: { damping: 200 } });
  const medP = spring({ frame: frame - 210, fps, config: { damping: 200 } });
  const wheatP = spring({ frame: frame - 250, fps, config: { damping: 200 } });
  const bookP = spring({ frame: frame - 650, fps, config: { damping: 200 } });
  const magP = spring({ frame: frame - 1020, fps, config: { damping: 200 } });
  const potatoP = spring({ frame: frame - 1485, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <SceneShot from={0} to={147}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${cautionP})`, opacity: cautionP }}>
            <CautionIcon size={110} color={theme.gold} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={147} to={626}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: 50 }}>
            <div style={{ transform: `scale(${gearP}) rotate(${gearP * 30}deg)`, opacity: gearP }}>
              <GearIcon size={80} color={theme.creamDim} />
            </div>
            <div style={{ transform: `scale(${medP})`, opacity: medP }}>
              <MedicalIcon size={80} color={theme.creamDim} />
            </div>
            <div style={{ transform: `scale(${wheatP})`, opacity: wheatP }}>
              <WheatIcon size={80} color={theme.creamDim} />
            </div>
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={626} to={998}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${bookP})`, opacity: bookP }}>
            <BookIcon size={110} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={998} to={1465}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${magP})`, opacity: magP }}>
            <MagnifyingIcon size={110} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={1465} to={durationInFrames}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${potatoP})`, opacity: potatoP }}>
            <PotatoIcon size={90} color={theme.gold} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        y={height * 0.82}
        items={[
          { text: "ただし、ここで一つ注意が必要です", from: 40, to: 125 },
          { text: "人口増加や産業革命の要因は、ジャガイモだけで説明できるものではありません", from: 147, to: 338 },
          { text: "農業技術の進歩、医療や公衆衛生の改善、農地の大規模化など、複数の要因が同時に絡み合っています", from: 360, to: 604 },
          {
            text: "ナンとチエンの研究自体も「ジャガイモが唯一の原因である」とは主張しておらず、あくまで統計的に「説明できる部分の目安」を示したものです",
            from: 626,
            to: 976,
          },
          {
            text: "一部の経済史家からは、地域ごとの人口統計の精度そのものに限界があるという指摘もあり、一つの野菜がすべてを変えたという単純化されたストーリーには、慎重である必要があります",
            from: 998,
            to: 1443,
          },
          {
            text: "それでもなお、ジャガイモという一つの作物が、ヨーロッパの人口動態、覇権国家の形成、そして大量移民という歴史の転換点に、これほど深く関わっていたという事実は変わりません",
            from: 1465,
            to: 1905,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
