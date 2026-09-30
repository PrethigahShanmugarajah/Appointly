import { Clock, TrendingUp, Wallet } from "lucide-react";
import { useAppContext } from "../../../context/appContext";
import { formatMoney } from "../../../utils/money";

const WalletCards = ({ wallet }) => {
  const { CURRENCY, VITE_LOCALE } = useAppContext();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
            <Wallet className="h-4 w-4 text-green-600" />
          </div>

          <span className="text-xs font-medium text-gray-500">Available</span>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {formatMoney(wallet.available, CURRENCY, VITE_LOCALE)}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1]">
            <TrendingUp className="h-4 w-4 text-[#2DD4BF]" />
          </div>

          <span className="text-xs font-medium text-gray-500">
            Total earned
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {formatMoney(wallet.earned, CURRENCY, VITE_LOCALE)}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100">
            <Clock className="h-4 w-4 text-orange-600" />
          </div>

          <span className="text-xs font-medium text-gray-500">
            Pending payouts
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {formatMoney(wallet.paidWithdrawals, CURRENCY, VITE_LOCALE)}
        </h2>

        <p className="mt-1.5 text-xs text-gray-400">
          Paid out: {formatMoney(wallet.paidWithdrawals, CURRENCY, VITE_LOCALE)}
        </p>
      </div>
    </div>
  );
};

export default WalletCards;
