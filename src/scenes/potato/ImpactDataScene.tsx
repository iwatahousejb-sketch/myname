import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { MagnifyingIcon, CityIcon } from "../../components/HistoryIcons2";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const ImpactDataScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1629, 1659], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringP = spring({ frame: frame - 736, fps, config: { damping: 200 } });
  const pct = interpolate(ringP, [0, 1], [0, 25]);
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * (pct / 100);

  const magP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const dots = [
    { x: 0.36, y: 0.4 },
    { x: 0.5, y: 0.32 },
    { x: 0.64, y: 0.44 },
    { x: 0.44, y: 0.52 },
    { x: 0.58, y: 0.56 },
  ];
  const cityP = spring({ frame: frame - 1220, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <SceneShot from={0} to={242}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${magP})`, opacity: magP }}>
            <MagnifyingIcon size={130} color={theme.gold} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={242} to={736}>
        {dots.map((d, i) => {
          const s = spring({ frame: frame - 280 - i * 30, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div key={i} style={{ position: "absolute", left: width * d.x, top: height * d.y, opacity: s, transform: `scale(${s})` }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${theme.gold}`, background: "rgba(201,164,104,0.1)" }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: width * 0.5 - 30, top: height * 0.42, opacity: 0.4 }}>
          <MagnifyingIcon size={70} color={theme.creamDim} />
        </div>
      </SceneShot>

      <SceneShot from={736} to={1193}>
        <div style={{ position: "absolute", top: height * 0.14, width: "100%", textAlign: "center" }}>
          <span style={{ color: theme.gold, fontFamily: serifFontFamily, fontSize: 24, letterSpacing: 3 }}>
            1700年 - 1900年 旧世界の人口増加・都市化
          </span>
        </div>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <svg width={260} height={260}>
            <circle cx="130" cy="130" r={r} stroke={theme.bgHigh} strokeWidth={16} fill="none" />
            <circle
              cx="130"
              cy="130"
              r={r}
              stroke={theme.gold}
              strokeWidth={16}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform="rotate(-90 130 130)"
            />
            <text x="130" y="122" textAnchor="middle" fill={theme.cream} fontFamily={serifFontFamily} fontSize={54} fontWeight={900}>
              {Math.round(pct)}%
            </text>
            <text x="130" y="156" textAnchor="middle" fill={theme.creamDim} fontFamily={serifFontFamily} fontSize={18}>
              を説明できる
            </text>
          </svg>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={1193} to={1659}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${cityP})`, opacity: cityP }}>
            <CityIcon size={150} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "このインパクトを定量的に検証したのが、先ほどのナンとチエンの研究です", from: 40, to: 220 },
          {
            text: "二人はヨーロッパやアジアの各地域について、気候や土壌のデータから、もともとジャガイモ栽培にどれだけ適した土地だったかを算出し、導入前後の人口増加率を比較するという手法をとりました",
            from: 242,
            to: 714,
          },
          {
            text: "その結果、最も控えめな推計でも、1700年から1900年の旧世界における人口増加と都市化の、およそ4分の1がジャガイモの普及によって説明できるという結果が出ています",
            from: 736,
            to: 1171,
          },
          {
            text: "「世界の人口を2倍にした」というのはやや大げさな見出しですが、一つの作物の伝来がこれほどの影響を人口統計に残したこと自体、驚くべき事実です",
            from: 1193,
            to: 1559,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
