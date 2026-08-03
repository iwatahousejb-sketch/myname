import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/Background";
import { SocTitleScene } from "./scenes/socrates/SocTitleScene";
import { AgoraScene } from "./scenes/socrates/AgoraScene";
import { QuestioningScene } from "./scenes/socrates/QuestioningScene";
import { ChallengeScene } from "./scenes/socrates/ChallengeScene";
import { WisdomScene } from "./scenes/socrates/WisdomScene";
import { TrialScene } from "./scenes/socrates/TrialScene";
import { LegacyScene } from "./scenes/socrates/LegacyScene";
import { SocEndCardScene } from "./scenes/socrates/SocEndCardScene";

export const SOC_SCENES = {
  title: { from: 0, duration: 90 },
  agora: { from: 90, duration: 240 },
  questioning: { from: 330, duration: 240 },
  challenge: { from: 570, duration: 240 },
  wisdom: { from: 810, duration: 240 },
  trial: { from: 1050, duration: 330 },
  legacy: { from: 1380, duration: 240 },
  end: { from: 1620, duration: 180 },
};

export const SOC_TOTAL_DURATION = 1800;
export const SOC_FPS = 30;
export const SOC_WIDTH = 1920;
export const SOC_HEIGHT = 1080;

export const SocratesVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e14" }}>
      <Background variant="minimal" />
      <Sequence from={SOC_SCENES.title.from} durationInFrames={SOC_SCENES.title.duration}>
        <SocTitleScene />
      </Sequence>
      <Sequence from={SOC_SCENES.agora.from} durationInFrames={SOC_SCENES.agora.duration}>
        <AgoraScene />
      </Sequence>
      <Sequence from={SOC_SCENES.questioning.from} durationInFrames={SOC_SCENES.questioning.duration}>
        <QuestioningScene />
      </Sequence>
      <Sequence from={SOC_SCENES.challenge.from} durationInFrames={SOC_SCENES.challenge.duration}>
        <ChallengeScene />
      </Sequence>
      <Sequence from={SOC_SCENES.wisdom.from} durationInFrames={SOC_SCENES.wisdom.duration}>
        <WisdomScene />
      </Sequence>
      <Sequence from={SOC_SCENES.trial.from} durationInFrames={SOC_SCENES.trial.duration}>
        <TrialScene />
      </Sequence>
      <Sequence from={SOC_SCENES.legacy.from} durationInFrames={SOC_SCENES.legacy.duration}>
        <LegacyScene />
      </Sequence>
      <Sequence from={SOC_SCENES.end.from} durationInFrames={SOC_SCENES.end.duration}>
        <SocEndCardScene />
      </Sequence>
    </AbsoluteFill>
  );
};
