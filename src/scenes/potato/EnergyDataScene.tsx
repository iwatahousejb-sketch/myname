import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { GearIcon, BookIcon, WheatIcon } from "../../components/HistoryIcons2";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

const BARS = [
  { label: "ジャガイモ", value: 1, start: 320 },
  { label: "オート麦", value: 0.3, start: 370 },
  { label: "小麦", value: 0.34, start: 420 },
  { label: "大麦", value: 0.36, start: 470 },
];

export const EnergyDataScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1978, 2008], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleO = interpolate(frame, [258, 298], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barMaxWidth = width * 0.5;

  const gearP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const bookP = spring({ frame: frame - 820, fps, config: { damping: 200 } });
  const wheatP = spring({ frame: frame - 1400, fps, config: { damping: 200 } });
  const fieldPotatoes = [0.3, 0.4, 0.5, 0.6, 0.7];

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <SceneShot from={0} to={258}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${gearP}) rotate(${gearP * 40}deg)`, opacity: gearP }}>
            <GearIcon size={130} color={theme.gold} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={258} to={815}>
        <div
          style={{
            position: "absolute",
            top: height * 0.16,
            width: "100%",
            textAlign: "center",
            opacity: titleO,
            color: theme.gold,
            fontFamily: serifFontFamily,
            fontSize: 24,
            letterSpacing: 3,
          }}
        >
          同じ面積の土地から得られるエネルギー量(目安)
        </div>

        <div style={{ position: "absolute", left: width / 2 - barMaxWidth / 2, top: height * 0.32, width: barMaxWidth }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {BARS.map((b) => {
              const bp = spring({ frame: frame - b.start, fps, config: { damping: 200 } });
              const w = barMaxWidth * b.value * bp;
              return (
                <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ color: theme.white, fontFamily: serifFontFamily, fontSize: 24, fontWeight: 700 }}>{b.label}</span>
                  <div style={{ height: 20, width: barMaxWidth, borderRadius: 10, background: "rgba(236,228,210,0.08)", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: w,
                        borderRadius: 10,
                        background:
                          b.label === "ジャガイモ"
                            ? `linear-gradient(90deg, ${theme.goldDim}, ${theme.gold})`
                            : theme.slateDim,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SceneShot>

      <SceneShot from={815} to={1400}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, transform: `scale(${bookP})`, opacity: bookP }}>
            <BookIcon size={120} color={theme.gold} />
            <span style={{ color: theme.creamDim, fontFamily: serifFontFamily, fontSize: 20 }}>『国富論』 1776</span>
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={1400} to={1638}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${wheatP})`, opacity: wheatP * 0.6 }}>
            <WheatIcon size={110} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={1638} to={2008}>
        {fieldPotatoes.map((x, i) => {
          const s = spring({ frame: frame - 1660 - i * 20, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div key={i} style={{ position: "absolute", left: width * x, bottom: height * 0.3, transform: `scale(${s})`, opacity: s }}>
              <PotatoIcon size={44} color={theme.gold} />
            </div>
          );
        })}
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "では、なぜ為政者たちはそこまでしてジャガイモを普及させたかったのでしょうか", from: 40, to: 236 },
          {
            text: "経済学者ナサン・ナンとナンシー・チエンが2011年に発表した論文によると、同じ面積の土地で栽培した場合、ジャガイモはオート麦・小麦・大麦に比べて、およそ3倍のエネルギーを生産できるという結果が出ています",
            from: 258,
            to: 793,
          },
          {
            text: "経済学の父アダム・スミスも、1776年の『国富論』の中で、ジャガイモ畑から得られる食料は同じ広さの小麦畑をはるかに上回ると指摘し、人間の体質に適した栄養価の高さについて、これ以上の証拠はないとまで書いています",
            from: 815,
            to: 1366,
          },
          { text: "小麦が育ちにくい痩せた土地や、寒冷な気候でも比較的よく育つ点も、ジャガイモの強みでした", from: 1388, to: 1616 },
          {
            text: "つまりジャガイモは、それまで農業に不向きとされてきた土地を、一気に「食料生産地」に変えてしまったのです",
            from: 1638,
            to: 1908,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
