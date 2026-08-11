import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type SceneShotProps = {
  from: number;
  to: number;
  fade?: number;
  children: React.ReactNode;
};

export const SceneShot: React.FC<SceneShotProps> = ({ from, to, fade = 24, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + fade, to - fade, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < from - 2 || frame > to + 2) return null;
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};
