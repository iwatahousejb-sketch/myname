import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { PotatoIcon } from "../../components/HistoryIcons";
import { WheatIcon, RiceIcon, CornIcon } from "../../components/HistoryIcons2";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

const CROPS = [
  { Icon: WheatIcon, label: "小麦" },
  { Icon: RiceIcon, label: "米" },
  { Icon: CornIcon, label: "トウモロコシ" },
  { Icon: PotatoIcon, label: "ジャガイモ", highlight: true },
];

export const ClosingPotatoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const finalExit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markStart = 828;
  const markP = spring({ frame: frame - markStart, fps, config: { damping: 200 } });
  const glowPulse = 0.85 + Math.sin(frame / 16) * 0.15;

  return (
    <AbsoluteFill style={{ opacity: finalExit }}>
      <SceneShot from={552} to={828}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: 50, alignItems: "flex-end" }}>
            {CROPS.map((c, i) => {
              const p = spring({ frame: frame - 580 - i * 26, fps, config: { damping: 200 } });
              return (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    transform: `scale(${p})`,
                    opacity: p,
                  }}
                >
                  <c.Icon size={64} color={c.highlight ? theme.gold : theme.creamDim} />
                  <span style={{ color: c.highlight ? theme.gold : theme.creamDim, fontFamily: serifFontFamily, fontSize: 16 }}>
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        y={130}
        baseSize={34}
        items={[
          { text: "冒頭の問いに戻ります", from: 40, to: 115 },
          { text: "「なぜジャガイモは世界の人口を2倍にしたのか」", from: 137, to: 259 },
          {
            text: "正確には2倍という数字は誇張ですが、旧世界の人口増加のおよそ4分の1を後押しした計算になります",
            from: 281,
            to: 530,
          },
          {
            text: "現在、ジャガイモは小麦・米・トウモロコシに次いで、世界で4番目に多く生産される作物になっています",
            from: 552,
            to: 806,
          },
        ]}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: markP }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, padding: "0 6%" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 110,
                height: 110,
                transform: `translate(-50%, -50%) scale(${glowPulse})`,
                borderRadius: "50%",
                background: theme.glow,
                opacity: 0.14,
              }}
            />
            <PotatoIcon size={64} color={theme.gold} />
          </div>
          <div
            style={{
              color: theme.cream,
              fontFamily: serifFontFamily,
              fontSize: 36,
              fontWeight: 900,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            スーパーの野菜売り場にある地味な塊茎が、かつて国家の運命さえ左右していたのです。
          </div>
        </div>
      </AbsoluteFill>

      <CaptionSequence
        fontFamily={serifFontFamily}
        y={1140}
        baseSize={30}
        items={[
          {
            text: "そう考えると、次にジャガイモを手に取るときの見え方が、少し変わってくるのではないでしょうか",
            from: 1062,
            to: 1370,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
