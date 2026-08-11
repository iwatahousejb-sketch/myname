import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { LineChart } from "../../components/LineChart";
import { BlightIcon } from "../../components/HistoryIcons";
import { CaptionSequence } from "../../components/CaptionSequence";

export const FamineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1410, 1440], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const darken = interpolate(frame, [0, 1440], [0, 0.22]);
  const blightP = spring({ frame: frame - 340, fps, config: { damping: 12, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <AbsoluteFill style={{ background: `rgba(0,0,0,${darken})` }} />

      <div
        style={{
          position: "absolute",
          top: height * 0.1,
          width: "100%",
          textAlign: "center",
          color: theme.cream,
          fontFamily,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        アイルランド大飢饉 (1845 - )
      </div>

      <div style={{ position: "absolute", right: width * 0.14, top: height * 0.14, opacity: blightP, transform: `scale(${blightP})` }}>
        <BlightIcon size={60} color="#c96a4a" />
      </div>

      <div style={{ position: "absolute", left: width * 0.2, top: height * 0.28, width: width * 0.6, height: height * 0.4 }}>
        <LineChart
          points={[
            { label: "1841年", value: 8.2 },
            { label: "1845年", value: 8.4 },
            { label: "1851年", value: 6.55 },
          ]}
          width={width * 0.6}
          height={height * 0.4}
          startFrame={380}
          dangerFromIndex={1}
          unit="百万人"
        />
      </div>

      <CaptionSequence
        items={[
          { text: "多くの人が、単一品種「ランパー」に依存していた", from: 40, to: 320 },
          { text: "1845年、疫病菌が全土の畑を襲った", from: 400, to: 660 },
          { text: "およそ100万人が、餓死や関連する病気で亡くなった", from: 780, to: 1080 },
          { text: "さらに100万人以上が、主にアメリカへ移住したとされる", from: 1140, to: 1400 },
        ]}
      />
    </AbsoluteFill>
  );
};
