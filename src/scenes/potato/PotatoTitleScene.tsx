import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { CaptionSequence } from "../../components/CaptionSequence";

export const PotatoTitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const iconP = spring({ frame: frame - 4, fps, config: { damping: 12, mass: 0.6 } });
  const exit = interpolate(frame, [durationInFrames - 14, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ transform: `scale(${iconP})`, opacity: iconP, marginBottom: 4 }}>
            <PotatoIcon size={58} color={theme.gold} />
          </div>
          <div
            style={{
              color: theme.cream,
              fontFamily: serifFontFamily,
              fontWeight: 900,
              fontSize: 68,
              letterSpacing: 1,
              textAlign: "center",
              lineHeight: 1.4,
              transform: `scale(${0.9 + enter * 0.1})`,
              opacity: enter,
              textShadow: `0 0 46px rgba(242,229,200,0.2)`,
            }}
          >
            なぜジャガイモは
            <br />
            世界の人口を変えたのか
          </div>
        </div>
      </AbsoluteFill>
      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "もしも、たった一つの野菜が、ヨーロッパの人口を大きく変えたと聞いたらどう思うでしょうか", from: 40, to: 268 },
          { text: "実はジャガイモの伝来は、旧世界の人口増加のかなりの部分を説明できるという研究結果があります", from: 290, to: 528 },
          { text: "一説には「ジャガイモがなければヨーロッパの人口は今の姿になっていなかった」とさえ言われています", from: 550, to: 799 },
          { text: "なぜたった一つの作物に、それほどの力があったのでしょうか", from: 821, to: 969 },
        ]}
      />
    </AbsoluteFill>
  );
};
