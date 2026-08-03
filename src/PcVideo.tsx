import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/Background";
import { TitleScene } from "./scenes/TitleScene";
import { IOScene } from "./scenes/IOScene";
import { PartsScene } from "./scenes/PartsScene";
import { ClosingScene } from "./scenes/ClosingScene";
import { EndCardScene } from "./scenes/EndCardScene";

export const SCENES = {
  title: { from: 0, duration: 60 },
  io: { from: 60, duration: 180 },
  parts: { from: 240, duration: 180 },
  closing: { from: 420, duration: 120 },
  end: { from: 540, duration: 60 },
};

export const TOTAL_DURATION = 600;
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const PcVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e14" }}>
      <Background />
      <Sequence from={SCENES.title.from} durationInFrames={SCENES.title.duration}>
        <TitleScene />
      </Sequence>
      <Sequence from={SCENES.io.from} durationInFrames={SCENES.io.duration}>
        <IOScene />
      </Sequence>
      <Sequence from={SCENES.parts.from} durationInFrames={SCENES.parts.duration}>
        <PartsScene />
      </Sequence>
      <Sequence from={SCENES.closing.from} durationInFrames={SCENES.closing.duration}>
        <ClosingScene />
      </Sequence>
      <Sequence from={SCENES.end.from} durationInFrames={SCENES.end.duration}>
        <EndCardScene />
      </Sequence>
    </AbsoluteFill>
  );
};
