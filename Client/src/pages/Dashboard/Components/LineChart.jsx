import { useState } from "react";
import { buildPath } from "../../../utils/dashboard";

const LineChart = ({ data, accent = "#2DD4BF" }) => {
  const [tooltip, setTooltip] = useState(null);
  const width = 760;
  const height = 300;
  const padding = { top: 28, right: 26, bottom: 42, left: 42 };
  const values = data.map((item) => item.value);
  const maxValue = Math.max(1, ...values);
  const minValue = Math.min(0, ...values);
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const range = Math.max(1, maxValue - minValue);
  const points = data.map((item, index) => {
    const x = padding.left + (index / Math.max(1, data.length - 1)) * plotWidth;
    const y = padding.top + ((maxValue - item.value) / range) * plotHeight;
    return { ...item, x, y };
  });
  const linePath = buildPath(points);
  const areaPath = `${linePath} L ${padding.left + plotWidth} ${padding.top + plotHeight} L ${padding.left} ${padding.top + plotHeight} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: padding.top + ratio * plotHeight,
    value: Math.round(maxValue - ratio * range),
  }));

  return (
    <div className="w-full relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-80 w-full"
        role="img"
        aria-label="Bookings line graph"
      >
        <defs>
          <linearGradient id="bookingLineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="8"
              floodColor={accent}
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {ticks.map((tick) => (
          <g key={tick.y}>
            <line
              x1={padding.left}
              x2={padding.left + plotWidth}
              y1={tick.y}
              y2={tick.y}
              stroke="#F3F4F6"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 12}
              y={tick.y + 4}
              textAnchor="end"
              className="fill-gray-400 text-[11px] font-semibold"
            >
              {tick.value >= 1000000
                ? `${(tick.value / 1000000).toFixed(1).replace(/\.0$/, "")}M`
                : tick.value >= 1000
                  ? `${(tick.value / 1000).toFixed(1).replace(/\.0$/, "")}K`
                  : tick.value}
            </text>
          </g>
        ))}

        <path d={areaPath} fill="url(#bookingLineFill)" />

        <path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#softShadow)"
        />

        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="18"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() =>
                setTooltip({
                  x: point.x,
                  y: point.y,
                  text: `${point.value} bookings on ${point.label}`,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            />

            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="white"
              stroke={accent}
              strokeWidth="3.5"
              className="pointer-events-none"
            />

            <text
              x={point.x}
              y={height - 14}
              textAnchor="middle"
              className="fill-gray-400 text-[11px] font-semibold"
            >
              {point.short}
            </text>
          </g>
        ))}
      </svg>

      {tooltip && (
        <div
          className="absolute bg-gray-900 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-50 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: `calc(${(tooltip.y / height) * 100}% - 8px)`,
          }}
        >
          {tooltip.text}
          <div className="absolute -bottom-0.75 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default LineChart;
