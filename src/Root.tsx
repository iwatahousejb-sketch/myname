import "./index.css";
import "./loadFonts";
import { Composition } from "remotion";
import { PcVideo, TOTAL_DURATION, FPS, WIDTH, HEIGHT } from "./PcVideo";
import { SocratesVideo, SOC_TOTAL_DURATION, SOC_FPS, SOC_WIDTH, SOC_HEIGHT } from "./SocratesVideo";
import { PotatoVideo, POTATO_TOTAL_DURATION, POTATO_FPS, POTATO_WIDTH, POTATO_HEIGHT } from "./PotatoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PcVideo"
        component={PcVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SocratesVideo"
        component={SocratesVideo}
        durationInFrames={SOC_TOTAL_DURATION}
        fps={SOC_FPS}
        width={SOC_WIDTH}
        height={SOC_HEIGHT}
      />
      <Composition
        id="PotatoVideo"
        component={PotatoVideo}
        durationInFrames={POTATO_TOTAL_DURATION}
        fps={POTATO_FPS}
        width={POTATO_WIDTH}
        height={POTATO_HEIGHT}
      />
    </>
  );
};
