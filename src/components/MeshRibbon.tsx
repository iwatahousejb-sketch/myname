import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

type MeshRibbonProps = {
  color: string;
  yOffset: number;
  amplitude: number;
  freq: number;
  phase: number;
  xStart: number;
  xEnd: number;
  rows: number;
  rowSpacing: number;
  opacity: number;
  strokeWidth: number;
  speed: number;
  crossEvery?: number;
};

const STEPS = 48;

export const MeshRibbon: React.FC<MeshRibbonProps> = ({
  color,
  yOffset,
  amplitude,
  freq,
  phase,
  xStart,
  xEnd,
  rows,
  rowSpacing,
  opacity,
  strokeWidth,
  speed,
  crossEvery = 4,
}) => {
  const frame = useCurrentFrame();
  const t = frame * speed;

  const lines = useMemo(() => {
    const result: { d: string; points: { x: number; y: number }[] }[] = [];
    for (let r = 0; r < rows; r++) {
      const rowOffset = (r - (rows - 1) / 2) * rowSpacing;
      const points: { x: number; y: number }[] = [];
      for (let s = 0; s <= STEPS; s++) {
        const x = xStart + ((xEnd - xStart) * s) / STEPS;
        const localAmp = amplitude * (1 - Math.abs(rowOffset) / (rowSpacing * rows));
        const y =
          yOffset +
          rowOffset +
          localAmp * Math.sin(freq * (x / 300) + phase + t / 40) +
          6 * Math.sin(freq * 2.3 * (x / 300) + phase * 1.7 + t / 25 + r);
        points.push({ x, y });
      }
      const d = points
        .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join(" ");
      result.push({ d, points });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, rowSpacing, amplitude, freq, phase, xStart, xEnd, yOffset, t]);

  const crossLines = useMemo(() => {
    const result: string[] = [];
    if (lines.length < 2) return result;
    for (let s = 0; s <= STEPS; s += crossEvery) {
      const top = lines[0].points[s];
      const bottom = lines[lines.length - 1].points[s];
      if (top && bottom) {
        result.push(`M${top.x.toFixed(1)},${top.y.toFixed(1)} L${bottom.x.toFixed(1)},${bottom.y.toFixed(1)}`);
      }
    }
    return result;
  }, [lines, crossEvery]);

  return (
    <g opacity={opacity}>
      {crossLines.map((d, i) => (
        <path key={`c${i}`} d={d} stroke={color} strokeWidth={strokeWidth * 0.7} fill="none" />
      ))}
      {lines.map((l, i) => (
        <path key={`r${i}`} d={l.d} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
};
