import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { CaptionSequence } from "../../components/CaptionSequence";

export const ImpactDataScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1230, 1260], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringP = spring({ frame: frame - 780, fps, config: { damping: 200 } });
  const pct = interpolate(ringP, [0, 1], [0, 25]);
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * (pct / 100);

  return (
    <AbsoluteFill style={{ opacity: exit, alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: height * 0.14, width: "100%", textAlign: "center" }}>
        <span style={{ color: theme.gold, fontFamily, fontSize: 24, letterSpacing: 3 }}>
          1700年 - 1900年 旧世界の人口増加・都市化
        </span>
      </div>

      <svg width={260} height={260} style={{ marginTop: -20 }}>
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
        <text x="130" y="122" textAnchor="middle" fill={theme.cream} fontFamily={fontFamily} fontSize={54} fontWeight={900}>
          {Math.round(pct)}%
        </text>
        <text x="130" y="156" textAnchor="middle" fill={theme.creamDim} fontFamily={fontFamily} fontSize={18}>
          を説明できる
        </text>
      </svg>

      <CaptionSequence
        items={[
          { text: "気候や土壌のデータから、地域ごとの適性を算出した", from: 40, to: 340 },
          { text: "導入前後の人口増加率を、比較する手法をとった", from: 400, to: 720 },
          { text: "最も控えめな推計でも、およそ4分の1を説明できるという結果に", from: 850, to: 1200 },
        ]}
      />
    </AbsoluteFill>
  );
};
