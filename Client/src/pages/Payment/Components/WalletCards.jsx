// Client / src / pages / Payment / Components / WalletCards.jsx
import { Clock, TrendingUp, Wallet } from "lucide-react";
import { useAppContext } from "../../../context/appContext";
import { formatMoney } from "../../../utils/money";

const WalletCards = ({ wallet }) => {
  const { CURRENCY, VITE_LOCALE } = useAppContext();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
            <Wallet className="h-4 w-4 text-emerald-600" />
          </div>

          <span className="text-xs font-medium text-slate-500">Available</span>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          {formatMoney(wallet.available, CURRENCY, VITE_LOCALE)}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EBE4FF]">
            <TrendingUp className="h-4 w-4 text-[#7D57F5]" />
          </div>

          <span className="text-xs font-medium text-slate-500">
            Total earned
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          {formatMoney(wallet.earned, CURRENCY, VITE_LOCALE)}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
            <Clock className="h-4 w-4 text-amber-600" />
          </div>

          <span className="text-xs font-medium text-slate-500">
            Pending payouts
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          {formatMoney(wallet.paidWithdrawals, CURRENCY, VITE_LOCALE)}
        </h2>

        <p className="mt-1.5 text-xs text-slate-400">
          Paid out: {formatMoney(wallet.paidWithdrawals, CURRENCY, VITE_LOCALE)}
        </p>
      </div>
    </div>
  );
};

export default WalletCards;
