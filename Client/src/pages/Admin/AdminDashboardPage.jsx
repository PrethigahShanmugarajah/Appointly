// Client / src / pages / Admin / AdminDashboardPage.jsx
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import {
  CheckCircle,
  CircleDollarSign,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  XOctagon,
} from "lucide-react";
import { formatMoney } from "../../utils/money";
import {
  formatStatusLabel,
  isTerminalWithdrawalStatus,
} from "../../utils/adminDashboard";
import { updateWithdrawalStatus } from "../../services/admin/mutation";
import { getAdminDashboard } from "../../services/admin/fetch";
import AdminDashboardHeader from "../../components/Admin/AdminDashboardHeader";
import AdminDashboardStats from "../../components/Admin/AdminDashboardStats";
import AdminRegisteredUsers from "../../components/Admin/AdminRegisteredUsers";
import AdminWithdrawalRequests from "../../components/Admin/AdminWithdrawalRequests";
import AdminRecentBookings from "../../components/Admin/AdminRecentBookings";

const AdminDashboardPage = () => {
  const { navigate, CURRENCY } = useAppContext();

  const [dashboard, setDashboard] = useState(null);
  const [updatingWithdrawalId, setUpdatingWithdrawalId] = useState("");
  const [pendingWithdrawalAction, setPendingWithdrawalAction] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return undefined;
    }

    let isActive = true;

    getAdminDashboard()
      .then(({ data }) => {
        if (isActive) {
          setDashboard(data);
        }
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [navigate]);

  const requestWithdrawalStatusChange = (withdrawal, status) => {
    if (
      withdrawal.status === status ||
      isTerminalWithdrawalStatus(withdrawal.status)
    ) {
      return;
    }

    setPendingWithdrawalAction({ withdrawal, status });
  };

  const closeWithdrawalConfirm = () => {
    if (updatingWithdrawalId) return;
    setPendingWithdrawalAction(null);
  };

  const changeWithdrawalStatus = async () => {
    if (!pendingWithdrawalAction) return;

    const { withdrawal, status } = pendingWithdrawalAction;
    setUpdatingWithdrawalId(withdrawal._id);

    try {
      const { data } = await updateWithdrawalStatus(withdrawal._id, { status });
      setDashboard((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          summary: data.summary || prev.summary,
          withdrawals: prev.withdrawals.map((withdrawal) =>
            withdrawal._id === data.withdrawal._id
              ? data.withdrawal
              : withdrawal,
          ),
        };
      });
    } finally {
      setUpdatingWithdrawalId("");
      setPendingWithdrawalAction(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const summary = dashboard?.summary || {};
  const pendingWithdrawal = pendingWithdrawalAction?.withdrawal;
  const WithdrawalConfirmIcon =
    pendingWithdrawalAction?.status === "rejected" ? XOctagon : ShieldCheck;
  const isConfirmingWithdrawal =
    pendingWithdrawal && updatingWithdrawalId === pendingWithdrawal._id;

  /* -------- Helpers for dynamic classes from styles -------- */
  const getPayoutStatusClass = (isComplete) =>
    isComplete ? "bg-[#eafbef] text-[#16a34a]" : "bg-[#fff1f2] text-[#e11d48]";

  const getWithdrawalStatusClass = (status) =>
    status === "processing"
      ? "bg-[#ffedd5] text-[#ea580c]"
      : status === "paid"
        ? "bg-[#eafbef] text-[#16a34a]"
        : status === "rejected"
          ? "bg-[#fff1f2] text-[#e11d48]"
          : "bg-slate-100 text-slate-600";

  const statCards = [
    {
      label: "Total Users",
      value: summary.users || 0,
      icon: Users,
      bg: "bg-[#F4F0FF]",
      c: "text-[#7D57F5]",
    },
    {
      label: "Paid Bookings",
      value: summary.paidBookings || 0,
      icon: CheckCircle,
      bg: "bg-[#eafbef]",
      c: "text-[#16a34a]",
    },
    {
      label: "Gross Revenue",
      value: formatMoney(summary.grossRevenue, CURRENCY),
      icon: TrendingUp,
      bg: "bg-[#f3e8ff]",
      c: "text-[#8b5cf6]",
    },
    {
      label: "Platform Fees",
      value: formatMoney(summary.platformFees, CURRENCY),
      icon: CircleDollarSign,
      bg: "bg-[#eff6ff]",
      c: "text-[#2563eb]",
    },
    {
      label: "Provider Payouts",
      value: formatMoney(summary.providerPayouts, CURRENCY),
      icon: Wallet,
      bg: "bg-[#d1fae5]",
      c: "text-[#059669]",
    },
    {
      label: "Withdrawal Hold",
      value: formatMoney(summary.withdrawalHolds, CURRENCY),
      icon: Landmark,
      bg: "bg-[#ffedd5]",
      c: "text-[#ea580c]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 tracking-tight font-sans">
      <AdminDashboardHeader logout={logout} />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 space-y-6 sm:px-5 sm:py-8 lg:py-10 lg:space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[28px] sm:text-[32px] md:text-[38px] font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Platform
              <span className="bg-linear-to-b from-[#FFA1CF] via-[#FF5C9D] to-[#E11D48] bg-clip-text text-transparent custom-brand-font text-[34px] sm:text-[36px] md:text-[44px] relative top-1 ml-1 md:ml-2">
                Overview
              </span>
            </h1>

            <p className="mt-1.5 text-[15px] font-medium text-slate-500">
              Users, bookings, revenue, and active withdrawals.
            </p>
          </div>
        </section>

        <AdminDashboardStats statCards={statCards} />

        <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5 lg:gap-6 mt-6 lg:mt-8">
          <AdminRegisteredUsers
            users={dashboard?.users || []}
            getPayoutStatusClass={getPayoutStatusClass}
          />

          <AdminWithdrawalRequests
            withdrawals={dashboard?.withdrawals || []}
            CURRENCY={CURRENCY}
            getWithdrawalStatusClass={getWithdrawalStatusClass}
            updatingWithdrawalId={updatingWithdrawalId}
            requestWithdrawalStatusChange={requestWithdrawalStatusChange}
          />
        </section>

        {/* -------- Recent bookings table -------- */}
        <AdminRecentBookings
          recentBookings={dashboard?.recentBookings || []}
          CURRENCY={CURRENCY}
        />
      </main>

      {pendingWithdrawalAction && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.45)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="withdrawal-confirm-title"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#F4F0FF] text-[#7D57F5]">
                <WithdrawalConfirmIcon className="h-5 w-5" />
              </span>

              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getWithdrawalStatusClass(pendingWithdrawalAction.status)}`}
              >
                {pendingWithdrawalAction.status}
              </span>
            </div>

            <h3
              id="withdrawal-confirm-title"
              className="mt-5 text-[20px] font-extrabold text-slate-900"
            >
              Confirm withdrawal status
            </h3>

            <p className="mt-2 text-[14px] font-medium leading-6 text-slate-500">
              Are you sure you want to mark this withdrawal as{" "}
              {formatStatusLabel(pendingWithdrawalAction.status)}?
            </p>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-[14px] border border-slate-100 bg-slate-50 px-4 py-3 text-[13px] font-bold text-slate-600">
              <span>
                {pendingWithdrawal?.userId?.businessName ||
                  pendingWithdrawal?.userId?.name ||
                  "Provider"}
              </span>

              <strong>
                {formatMoney(pendingWithdrawal?.amount, CURRENCY)}
              </strong>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeWithdrawalConfirm}
                disabled={isConfirmingWithdrawal}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={changeWithdrawalStatus}
                disabled={isConfirmingWithdrawal}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isConfirmingWithdrawal
                  ? "Confirming..."
                  : `Confirm ${formatStatusLabel(pendingWithdrawalAction.status)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
