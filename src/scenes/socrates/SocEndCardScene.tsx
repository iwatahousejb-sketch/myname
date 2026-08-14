import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../../theme";
import { OwlIcon } from "../../components/OwlIcon";

export const SocEndCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({ frame, fps, config: { damping: 200 } });
  const glowPulse = 0.85 + Math.sin(frame / 16) * 0.15;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, opacity: p }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 120,
              height: 120,
              transform: `translate(-50%, -50%) scale(${glowPulse})`,
              borderRadius: "50%",
              background: theme.glow,
              opacity: 0.14,
            }}
          />
          <OwlIcon size={74} color={theme.gold} />
        </div>
        <div style={{ color: theme.cream, fontFamily, fontSize: 52, fontWeight: 900 }}>ソクラテス</div>
        <div style={{ color: theme.creamDim, fontFamily, fontSize: 22, letterSpacing: 2, textAlign: "center" }}>
          「無知の知」から始まった哲学
        </div>
      </div>
    </AbsoluteFill>
  );
};
