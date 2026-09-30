import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { useAppContext } from "../../../context/appContext";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../utils/money";
import { transactionAmount, transactionLabel } from "../../../utils/payment";

const RecentActivity = ({ transactions }) => {
  const { CURRENCY, VITE_LOCALE } = useAppContext();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <CreditCard className="h-5 w-5 text-[#2DD4BF]" />
          Recent activity
        </h2>

        <Link
          to="/bookings"
          className="flex items-center gap-1 text-sm font-semibold text-[#2DD4BF] hover:text-[#0891B2]"
        >
          Bookings
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {(transactions || []).map((transaction) => {
          const amount = transactionAmount(transaction);
          const isNegative = amount < 0;
          return (
            <div
              key={transaction._id}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={
                    isNegative
                      ? "flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600"
                      : "flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600"
                  }
                >
                  {isNegative ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4" />
                  )}
                </div>

                <span className="text-sm text-gray-700">
                  {transactionLabel(transaction)}
                </span>
              </div>
              <strong
                className={
                  isNegative
                    ? "text-sm font-semibold text-red-600"
                    : "text-sm font-semibold text-green-600"
                }
              >
                {formatMoney(amount, CURRENCY, VITE_LOCALE)}
              </strong>
            </div>
          );
        })}
        {transactions && transactions.length === 0 && (
          <p className="text-sm text-gray-500">No wallet activity yet.</p>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
