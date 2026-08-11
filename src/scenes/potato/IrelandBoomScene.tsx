import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { LineChart } from "../../components/LineChart";
import { HouseIcon } from "../../components/HistoryIcons2";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const IrelandBoomScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [976, 1006], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const houseP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const titleO = interpolate(frame, [220, 250], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <SceneShot from={0} to={220}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, transform: `scale(${houseP})`, opacity: houseP }}>
            <HouseIcon size={110} color={theme.cream} />
            <span style={{ color: theme.creamDim, fontFamily: serifFontFamily, fontSize: 22, letterSpacing: 3 }}>アイルランド</span>
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={220} to={1006}>
        <div
          style={{
            position: "absolute",
            top: height * 0.12,
            width: "100%",
            textAlign: "center",
            opacity: titleO,
            color: theme.cream,
            fontFamily: serifFontFamily,
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          アイルランドの人口
        </div>

        <div style={{ position: "absolute", left: width * 0.2, top: height * 0.3, width: width * 0.6, height: height * 0.42 }}>
          <LineChart
            points={[
              { label: "1700年", value: 3 },
              { label: "1750年", value: 4.2 },
              { label: "1800年", value: 6 },
              { label: "1841年", value: 8.2 },
            ]}
            width={width * 0.6}
            height={height * 0.42}
            startFrame={220}
            unit="百万人"
          />
        </div>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          { text: "この効果が最も劇的に、そして最も悲劇的に表れたのがアイルランドです", from: 40, to: 215 },
          {
            text: "1700年頃には300万人に満たなかったアイルランドの人口は、ジャガイモ栽培の普及とともに急増し、1841年の国勢調査ではおよそ820万人にまで達していました",
            from: 237,
            to: 656,
          },
          { text: "狭い農地しか持たない小作農にとって、ジャガイモは家族を養える数少ない選択肢だったのです", from: 678, to: 906 },
        ]}
      />
    </AbsoluteFill>
  );
};
