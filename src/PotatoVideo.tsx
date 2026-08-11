import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/Background";
import { PotatoTitleScene } from "./scenes/potato/PotatoTitleScene";
import { AndesScene } from "./scenes/potato/AndesScene";
import { ExchangeScene } from "./scenes/potato/ExchangeScene";
import { RejectionScene } from "./scenes/potato/RejectionScene";
import { FrederickScene } from "./scenes/potato/FrederickScene";
import { FranceScene } from "./scenes/potato/FranceScene";
import { RussiaScene } from "./scenes/potato/RussiaScene";
import { EnergyDataScene } from "./scenes/potato/EnergyDataScene";
import { ImpactDataScene } from "./scenes/potato/ImpactDataScene";
import { IrelandBoomScene } from "./scenes/potato/IrelandBoomScene";
import { FamineScene } from "./scenes/potato/FamineScene";
import { IndustrialScene } from "./scenes/potato/IndustrialScene";
import { CaveatScene } from "./scenes/potato/CaveatScene";
import { ClosingPotatoScene } from "./scenes/potato/ClosingPotatoScene";

export const POTATO_SCENES = {
  title: { from: 0, duration: 1050 },
  andes: { from: 1050, duration: 1350 },
  exchange: { from: 2400, duration: 1350 },
  rejection: { from: 3750, duration: 1350 },
  frederick: { from: 5100, duration: 1350 },
  france: { from: 6450, duration: 1620 },
  russia: { from: 8070, duration: 1260 },
  energy: { from: 9330, duration: 1260 },
  impact: { from: 10590, duration: 1260 },
  irelandBoom: { from: 11850, duration: 1260 },
  famine: { from: 13110, duration: 1440 },
  industrial: { from: 14550, duration: 1260 },
  caveat: { from: 15810, duration: 1080 },
  closing: { from: 16890, duration: 1440 },
};

export const POTATO_TOTAL_DURATION = 18330;
export const POTATO_FPS = 30;
export const POTATO_WIDTH = 1920;
export const POTATO_HEIGHT = 1080;

export const PotatoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e14" }}>
      <Background variant="minimal" />
      <Sequence from={POTATO_SCENES.title.from} durationInFrames={POTATO_SCENES.title.duration}>
        <PotatoTitleScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.andes.from} durationInFrames={POTATO_SCENES.andes.duration}>
        <AndesScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.exchange.from} durationInFrames={POTATO_SCENES.exchange.duration}>
        <ExchangeScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.rejection.from} durationInFrames={POTATO_SCENES.rejection.duration}>
        <RejectionScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.frederick.from} durationInFrames={POTATO_SCENES.frederick.duration}>
        <FrederickScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.france.from} durationInFrames={POTATO_SCENES.france.duration}>
        <FranceScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.russia.from} durationInFrames={POTATO_SCENES.russia.duration}>
        <RussiaScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.energy.from} durationInFrames={POTATO_SCENES.energy.duration}>
        <EnergyDataScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.impact.from} durationInFrames={POTATO_SCENES.impact.duration}>
        <ImpactDataScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.irelandBoom.from} durationInFrames={POTATO_SCENES.irelandBoom.duration}>
        <IrelandBoomScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.famine.from} durationInFrames={POTATO_SCENES.famine.duration}>
        <FamineScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.industrial.from} durationInFrames={POTATO_SCENES.industrial.duration}>
        <IndustrialScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.caveat.from} durationInFrames={POTATO_SCENES.caveat.duration}>
        <CaveatScene />
      </Sequence>
      <Sequence from={POTATO_SCENES.closing.from} durationInFrames={POTATO_SCENES.closing.duration}>
        <ClosingPotatoScene />
      </Sequence>
    </AbsoluteFill>
  );
};
