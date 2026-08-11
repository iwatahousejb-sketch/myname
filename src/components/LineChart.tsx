import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme, fontFamily } from "../theme";

export type LineChartPoint = { label: string; value: number };

type LineChartProps = {
  points: LineChartPoint[];
  width: number;
  height: number;
  startFrame: number;
  color?: string;
  dangerFromIndex?: number;
  dangerColor?: string;
  unit?: string;
};

export const LineChart: React.FC<LineChartProps> = ({
  points,
  width,
  height,
  startFrame,
  color = theme.gold,
  dangerFromIndex,
  dangerColor = "#c96a4a",
  unit = "",
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const maxV = Math.max(...points.map((p) => p.value));
  const minV = 0;
  const padX = 20;
  const padTop = 30;
  const padBottom = 34;
  const plotW = width - padX * 2;
  const plotH = height - padTop - padBottom;

  const coords = useMemo(
    () =>
      points.map((p, i) => ({
        x: padX + (plotW * i) / (points.length - 1),
        y: padTop + plotH * (1 - (p.value - minV) / (maxV - minV)),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points, width, height],
  );

  const dPath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${dPath} L${coords[coords.length - 1].x},${padTop + plotH} L${coords[0].x},${padTop + plotH} Z`;

  const revealW = plotW * progress + padX;

  return (
    <svg width={width} height={height}>
      <defs>
        <clipPath id="lc-reveal">
          <rect x={0} y={0} width={revealW} height={height} />
        </clipPath>
        <linearGradient id="lc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <line
        x1={padX}
        y1={padTop + plotH}
        x2={width - padX}
        y2={padTop + plotH}
        stroke={theme.slateDim}
        strokeWidth={1.5}
      />
      <g clipPath="url(#lc-reveal)">
        <path d={areaPath} fill="url(#lc-area)" />
        <path d={dPath} stroke={color} strokeWidth={3.4} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        {dangerFromIndex !== undefined && (
          <path
            d={coords
              .slice(dangerFromIndex)
              .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
              .join(" ")}
            stroke={dangerColor}
            strokeWidth={3.8}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {coords.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={5}
            fill={dangerFromIndex !== undefined && i >= dangerFromIndex ? dangerColor : color}
          />
        ))}
      </g>
      {points.map((p, i) => {
        const c = coords[i];
        const o = interpolate(revealW, [c.x - 20, c.x + 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const anchor = i === 0 ? "start" : i === points.length - 1 ? "end" : "middle";
        const labelX = i === 0 ? c.x + 4 : i === points.length - 1 ? c.x - 4 : c.x;
        return (
          <g key={i} opacity={o}>
            <text x={labelX} y={height - 6} textAnchor={anchor} fill={theme.creamDim} fontFamily={fontFamily} fontSize={16}>
              {p.label}
            </text>
            <text
              x={labelX}
              y={c.y - 14}
              textAnchor={anchor}
              fill={theme.white}
              fontFamily={fontFamily}
              fontSize={17}
              fontWeight={700}
            >
              {p.value.toLocaleString()}
              {unit}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
