import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, serifFontFamily } from "../../theme";
import { LineChart } from "../../components/LineChart";
import { BlightIcon, PotatoIcon, GraveMarker, ShipIcon } from "../../components/HistoryIcons";
import { SilhouetteFigure } from "../../components/SilhouetteFigure";
import { CaptionSequence } from "../../components/CaptionSequence";
import { SceneShot } from "../../components/SceneShot";

export const FamineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const exit = interpolate(frame, [1946, 1976], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const darken = interpolate(frame, [0, 1976], [0, 0.22]);
  const lumperP = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const blightP = spring({ frame: frame - 390, fps, config: { damping: 12, mass: 0.6 } });
  const graveMarkers = [0.32, 0.44, 0.56, 0.68];
  const shipP = spring({ frame: frame - 1100, fps, config: { damping: 200 } });

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
          fontFamily: serifFontFamily,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        アイルランド大飢饉 (1845 - )
      </div>

      <SceneShot from={0} to={390}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, transform: `scale(${lumperP})`, opacity: lumperP }}>
            <PotatoIcon size={110} color={theme.creamDim} />
            <span style={{ color: theme.creamDim, fontFamily: serifFontFamily, fontSize: 20 }}>単一品種「ランパー」</span>
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={390} to={730}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${blightP})`, opacity: blightP }}>
            <BlightIcon size={140} color="#c96a4a" />
          </div>
        </AbsoluteFill>
      </SceneShot>

      <SceneShot from={730} to={1080}>
        {graveMarkers.map((x, i) => {
          const s = spring({ frame: frame - 760 - i * 26, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div key={i} style={{ position: "absolute", left: width * x, bottom: height * 0.14, transform: `scale(${s})`, opacity: s }}>
              <GraveMarker size={70} color={theme.creamDim} />
            </div>
          );
        })}
      </SceneShot>

      <SceneShot from={1080} to={1490}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${shipP})`, opacity: shipP }}>
            <ShipIcon size={130} color={theme.creamDim} />
          </div>
        </AbsoluteFill>
        {[0.34, 0.62].map((x, i) => {
          const s = spring({ frame: frame - 1180 - i * 24, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ position: "absolute", left: width * x, bottom: height * 0.18, opacity: s }}>
              <SilhouetteFigure size={70} color={theme.slate} />
            </div>
          );
        })}
      </SceneShot>

      <SceneShot from={1490} to={1976}>
        <div style={{ position: "absolute", left: width * 0.2, top: height * 0.28, width: width * 0.6, height: height * 0.4 }}>
          <LineChart
            points={[
              { label: "1841年", value: 8.2 },
              { label: "1845年", value: 8.4 },
              { label: "1851年", value: 6.55 },
            ]}
            width={width * 0.6}
            height={height * 0.4}
            startFrame={1490}
            dangerFromIndex={1}
            unit="百万人"
          />
        </div>
      </SceneShot>

      <CaptionSequence
        fontFamily={serifFontFamily}
        items={[
          {
            text: "しかし多くの人々が「ランパー」という単一品種のジャガイモに主食を依存するようになっていたことが、のちの悲劇につながります",
            from: 40,
            to: 358,
          },
          {
            text: "1845年、疫病菌フィトフトラ・インフェスタンスがアイルランド全土のジャガイモ畑を襲い、主食を失った結果として大飢饉が起こりました",
            from: 380,
            to: 724,
          },
          {
            text: "この飢饉により、およそ100万人が餓死や関連する病気で亡くなり、さらに100万人以上が主にアメリカへ移住したとされています",
            from: 746,
            to: 1069,
          },
          {
            text: "アイルランドの人口は、1841年の約820万人から、1851年にはおよそ655万人にまで、わずか10年で20パーセント以上も落ち込んだことになります",
            from: 1091,
            to: 1483,
          },
          {
            text: "一つの作物への依存が爆発的な人口増加をもたらすと同時に、その反動として壊滅的な飢饉をも引き起こしうることを、アイルランドの事例は示しています",
            from: 1505,
            to: 1876,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
