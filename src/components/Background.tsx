import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { MeshRibbon } from "./MeshRibbon";
import { PlexusNetwork } from "./PlexusNetwork";
import { FloatingCircles } from "./FloatingCircles";

type BackgroundProps = {
  variant?: "full" | "minimal";
};

export const Background: React.FC<BackgroundProps> = ({ variant = "full" }) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const glowPulse = 0.9 + Math.sin(frame / 90) * 0.06;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${theme.bgHigh} 0%, ${theme.bgMid} 40%, ${theme.bgMid} 62%, #10131c 85%, ${theme.bgDeep} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(38% 55% at 86% 18%, rgba(242,229,200,${0.16 * glowPulse}) 0%, rgba(242,229,200,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(140% 90% at 50% 8%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)`,
        }}
      />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.045 0" />
          </filter>
        </defs>
        <rect x={0} y={0} width={width} height={height} filter="url(#grain)" />

        <circle cx={width * 0.86} cy={height * 0.18} r={54} fill={theme.glow} opacity={0.55 * glowPulse} />
        <circle cx={width * 0.86} cy={height * 0.18} r={90} fill={theme.glow} opacity={0.12 * glowPulse} />

        <PlexusNetwork
          width={width}
          height={height}
          count={variant === "full" ? 20 : 12}
          color={theme.slate}
          maxDist={230}
          seedOffset={3}
          opacity={0.4}
          dotOpacity={0.55}
        />
        <FloatingCircles
          width={width}
          height={height}
          count={variant === "full" ? 8 : 5}
          colors={[theme.slateDim, theme.goldDim]}
          seedOffset={7}
        />
        <MeshRibbon
          color={theme.slate}
          yOffset={height * 0.2}
          amplitude={70}
          freq={1.3}
          phase={0.6}
          xStart={-80}
          xEnd={width + 80}
          rows={6}
          rowSpacing={9}
          opacity={0.22}
          strokeWidth={1}
          speed={0.18}
        />
        <MeshRibbon
          color={theme.gold}
          yOffset={height * 0.85}
          amplitude={55}
          freq={1.1}
          phase={2.4}
          xStart={-80}
          xEnd={width + 80}
          rows={6}
          rowSpacing={8}
          opacity={0.16}
          strokeWidth={1}
          speed={-0.15}
        />
      </svg>
    </AbsoluteFill>
  );
};
