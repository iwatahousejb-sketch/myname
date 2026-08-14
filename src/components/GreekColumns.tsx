import React from "react";
import { theme } from "../theme";

type GreekColumnsProps = {
  width: number;
  height: number;
  count?: number;
  color?: string;
  opacity?: number;
};

export const GreekColumns: React.FC<GreekColumnsProps> = ({
  width,
  height,
  count = 6,
  color = theme.bgHigh,
  opacity = 1,
}) => {
  const colW = width / count;
  const shaftW = colW * 0.34;

  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }} opacity={opacity}>
      {Array.from({ length: count }).map((_, i) => {
        const cx = colW * i + colW / 2;
        const top = height * 0.1;
        return (
          <g key={i}>
            <rect x={cx - shaftW / 2 - 8} y={top} width={shaftW + 16} height={14} fill={color} />
            <rect x={cx - shaftW / 2} y={top + 14} width={shaftW} height={height - top - 14} fill={color} />
            {Array.from({ length: 5 }).map((__, f) => (
              <line
                key={f}
                x1={cx - shaftW / 2 + ((f + 1) * shaftW) / 6}
                y1={top + 20}
                x2={cx - shaftW / 2 + ((f + 1) * shaftW) / 6}
                y2={height}
                stroke={theme.bgDeep}
                strokeWidth={2}
                opacity={0.3}
              />
            ))}
            <rect
              x={cx - shaftW / 2 - 4}
              y={top + 14}
              width={4}
              height={height - top - 14}
              fill={theme.gold}
              opacity={0.14}
            />
          </g>
        );
      })}
    </svg>
  );
};
