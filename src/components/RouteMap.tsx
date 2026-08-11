import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme, fontFamily } from "../theme";
import { ShipIcon } from "./HistoryIcons";

type RouteMapProps = {
  width: number;
  height: number;
  startFrame: number;
  fromLabel: string;
  toLabel: string;
};

export const RouteMap: React.FC<RouteMapProps> = ({ width, height, startFrame, fromLabel, toLabel }) => {
  const frame = useCurrentFrame();
  const cy = height * 0.52;
  const x1 = width * 0.14;
  const x2 = width * 0.86;
  const midX = width * 0.5;
  const midY = cy - height * 0.18;

  const pathD = `M${x1},${cy} Q${midX},${midY} ${x2},${cy}`;

  const landO = interpolate(frame - startFrame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pathProgress = interpolate(frame - startFrame, [40, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const t = pathProgress;
  const shipX = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
  const shipY = (1 - t) * (1 - t) * cy + 2 * (1 - t) * t * midY + t * t * cy;

  return (
    <svg width={width} height={height}>
      <ellipse cx={x1} cy={cy + 30} rx={130} ry={70} fill={theme.bgHigh} opacity={landO * 0.7} />
      <ellipse cx={x2} cy={cy + 30} rx={150} ry={70} fill={theme.bgHigh} opacity={landO * 0.7} />

      <path d={pathD} stroke={theme.slate} strokeWidth={2} strokeDasharray="2 10" fill="none" opacity={0.7} />

      {pathProgress > 0.02 && pathProgress < 1 && (
        <g transform={`translate(${shipX} ${shipY - 22})`}>
          <ShipIcon size={40} color={theme.gold} />
        </g>
      )}

      <g opacity={landO}>
        <text x={x1} y={cy + 70} textAnchor="middle" fill={theme.cream} fontFamily={fontFamily} fontSize={22} fontWeight={700}>
          {fromLabel}
        </text>
      </g>
      <g opacity={interpolate(frame - startFrame, [240, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
        <text x={x2} y={cy + 70} textAnchor="middle" fill={theme.cream} fontFamily={fontFamily} fontSize={22} fontWeight={700}>
          {toLabel}
        </text>
      </g>
    </svg>
  );
};
