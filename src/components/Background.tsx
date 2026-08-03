import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { MeshRibbon } from "./MeshRibbon";
import { PlexusNetwork } from "./PlexusNetwork";
import { FloatingCircles } from "./FloatingCircles";
import { PlusGrid } from "./PlusGrid";

type BackgroundProps = {
  variant?: "full" | "minimal";
};

export const Background: React.FC<BackgroundProps> = ({ variant = "full" }) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${theme.bgMid} 0%, ${theme.bgDark} 32%, ${theme.bgDark} 55%, #082b26 78%, ${theme.bgDeep} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(140% 90% at 50% 12%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.22) 100%)`,
        }}
      />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
          </filter>
        </defs>
        <rect x={0} y={0} width={width} height={height} filter="url(#grain)" />
        <PlexusNetwork
          width={width}
          height={height}
          count={variant === "full" ? 22 : 14}
          color={theme.green}
          maxDist={220}
          seedOffset={3}
          opacity={0.4}
          dotOpacity={0.7}
        />
        <FloatingCircles
          width={width}
          height={height}
          count={variant === "full" ? 10 : 6}
          colors={[theme.cream, theme.greenDim]}
          seedOffset={7}
        />
        <MeshRibbon
          color={theme.cream}
          yOffset={height * 0.22}
          amplitude={110}
          freq={1.4}
          phase={0.6}
          xStart={-80}
          xEnd={width + 80}
          rows={7}
          rowSpacing={11}
          opacity={0.35}
          strokeWidth={1}
          speed={0.35}
        />
        <MeshRibbon
          color={theme.green}
          yOffset={height * 0.74}
          amplitude={95}
          freq={1.1}
          phase={2.4}
          xStart={-80}
          xEnd={width + 80}
          rows={7}
          rowSpacing={10}
          opacity={0.32}
          strokeWidth={1}
          speed={-0.3}
        />
        <PlusGrid x={width * 0.14} y={height * 0.13} color={theme.cream} delay={0} />
        <PlusGrid x={width * 0.68} y={height * 0.86} color={theme.green} delay={6} />
      </svg>
    </AbsoluteFill>
  );
};
