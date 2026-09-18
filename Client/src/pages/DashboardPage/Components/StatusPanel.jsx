// Client / src / pages / DashboardPage / Components / StatusPanel.jsx

const StatusPanel = ({ confirmed, rescheduled, cancelled }) => {
  const trueTotal = confirmed + rescheduled + cancelled;
  const denominator = Math.max(1, trueTotal);
  const confPct = (confirmed / denominator) * 100;
  const reschPct = (rescheduled / denominator) * 100;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-52 h-52 rounded-full flex items-center justify-center shrink-0 shadow-sm"
        style={{
          background:
            trueTotal === 0
              ? "#f1f5f9"
              : `conic-gradient(#7D57F5 0% ${confPct}%, #fb923c ${confPct}% ${confPct + reschPct}%, #ef4444 ${confPct + reschPct}% 100%)`,
        }}
      >
        <div className="absolute inset-x-0 inset-y-0 m-5.5 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-4xl font-extrabold text-slate-900">
            {trueTotal}
          </span>

          <span className="text-[13px] font-semibold text-slate-500 mt-1">
            Total
          </span>
        </div>
      </div>

      <div className="w-full mt-10 space-y-4">
        {[
          {
            label: "Confirmed",
            value: confirmed,
            pct: confPct,
            color: "bg-gradient-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5]",
          },
          {
            label: "Rescheduled",
            value: rescheduled,
            pct: reschPct,
            color: "bg-[#fb923c]",
          },
          {
            label: "Cancelled",
            value: cancelled,
            pct: (cancelled / denominator) * 100,
            color: "bg-[#ef4444]",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center text-[14px]"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-3.5 h-3.5 rounded-full shadow-sm ${item.color}`}
              ></span>

              <span className="font-semibold text-slate-700">{item.label}</span>
            </div>

            <div className="flex gap-4">
              <span className="text-slate-900 font-bold">{item.value}</span>

              <span className="text-slate-400 w-12.5 text-right font-medium">
                {item.pct.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPanel;
