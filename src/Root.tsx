import "./index.css";
import "./loadFonts";
import { Composition } from "remotion";
import { PcVideo, TOTAL_DURATION, FPS, WIDTH, HEIGHT } from "./PcVideo";

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
    </>
  );
};
