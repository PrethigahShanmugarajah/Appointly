// Client / src / pages / DashboardPage / Components / BarChart.jsx
import { useState } from "react";
import { useAppContext } from "../../../context/appContext";

const BarChart = ({ data, accent = "#7c3aed" }) => {
  const { CURRENCY } = useAppContext();

  const [tooltip, setTooltip] = useState(null);
  const width = 760;
  const height = 240;
  const padding = { top: 20, right: 10, bottom: 30, left: 40 };
  const values = data.map((item) => item.value);
  const maxValueOrig = Math.max(1, ...values);
  const maxValue = maxValueOrig * 1.2 || 1;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const barWidth = (plotWidth / data.length) * 0.55;
  const spacing = (plotWidth / data.length) * 0.45;

  const ticks = [0, 0.33, 0.66, 1].map((ratio) => ({
    y: padding.top + ratio * plotHeight,
    value: Math.round(maxValue - ratio * maxValue),
  }));

  return (
    <div className="w-full relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-60"
      >
        {ticks.map((tick) => (
          <g key={tick.y}>
            <text
              x={padding.left - 10}
              y={tick.y + 4}
              textAnchor="end"
              className="fill-slate-400 text-[10px] font-semibold"
            >
              {CURRENCY}{" "}
              {tick.value >= 1000000
                ? `${(tick.value / 1000000).toFixed(1).replace(/\.0$/, "")}M`
                : tick.value >= 1000
                  ? `${(tick.value / 1000).toFixed(1).replace(/\.0$/, "")}K`
                  : tick.value}
            </text>
          </g>
        ))}

        {data.map((item, index) => {
          const barH = (item.value / maxValue) * plotHeight;
          const x = padding.left + index * (barWidth + spacing) + spacing / 2;
          const y = padding.top + plotHeight - barH;
          const showLabel =
            index % Math.ceil(data.length / 6) === 0 ||
            index === data.length - 1;
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={0}
                width={barWidth}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() =>
                  setTooltip({
                    x: x + barWidth / 2,
                    y: Math.max(y, padding.top),
                    text: `${CURRENCY} ${item.value} earnings on ${item.label}`,
                  })
                }
                onMouseLeave={() => setTooltip(null)}
              />

              <rect
                x={x}
                y={Math.max(y, padding.top)}
                width={barWidth}
                height={Math.max(barH, 4)}
                fill="url(#barGradient)"
                rx="4"
                className={`transition-all duration-300 pointer-events-none ${tooltip?.x === x + barWidth / 2 ? "opacity-100" : "opacity-80"}`}
              />

              {showLabel && (
                <text
                  x={x + barWidth / 2}
                  y={height - 5}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-semibold"
                >
                  {item.short}
                </text>
              )}
            </g>
          );
        })}

        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {tooltip && (
        <div
          className="absolute bg-slate-900 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-50 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: `calc(${(tooltip.y / height) * 100}% - 4px)`,
          }}
        >
          {tooltip.text}

          <div className="absolute -bottom-0.75 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
