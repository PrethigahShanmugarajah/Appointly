// Client / src / pages / DashboardPage / Components / EarningsOverview.jsx
import { ArrowRight } from "lucide-react";
import { useAppContext } from "../../../context/appContext";
import { formatMoney } from "../../../utils/money";
import BarChart from "./BarChart";
import { SelectInput } from "../../../components/FormField/SelectInput";

const EarningsOverview = ({
  wallet,
  monthlyEarningsTrend,
  earningTrend,
  graphFilter,
  setGraphFilter,
}) => {
  const { CURRENCY } = useAppContext();

  const graphFilterOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col relative h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center z-10 gap-4 mb-4">
        <h3 className="text-[16px] font-bold text-slate-900">
          Earnings Overview
        </h3>

        <div className="ml-auto">
          <SelectInput
            options={graphFilterOptions}
            value={graphFilter}
            onChange={setGraphFilter}
            isClearable={false}
            selectClassName="w-28"
          />
        </div>
      </div>

      <div className="mt-2 sm:mt-6 z-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <h2 className="text-[28px] sm:text-[34px] leading-tight font-extrabold text-slate-900 tracking-tight">
          {formatMoney(wallet?.available || 0, CURRENCY)}
        </h2>

        <div className="flex items-center gap-1.5 mt-0 sm:mt-2">
          <span
            className={
              monthlyEarningsTrend >= 0
                ? "text-[#16a34a] font-bold text-[12px] flex items-center"
                : "text-[#ef4444] font-bold text-[12px] flex items-center"
            }
          >
            <ArrowRight
              className={`w-3.5 h-3.5 ${monthlyEarningsTrend >= 0 ? "-rotate-45" : "rotate-45"} mr-1`}
            />
            {Math.abs(monthlyEarningsTrend).toFixed(1)}%
          </span>

          <span className="text-slate-500 text-[12px] font-medium">
            from last month
          </span>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden md:overflow-visible">
        <div className="min-w-150 md:min-w-0">
          <BarChart data={earningTrend} accent="#7c3aed" />
        </div>
      </div>
    </div>
  );
};

export default EarningsOverview;
