// Client / src / pages / Admin / AdminDashboardPage / Components  / AdminDashboardHeader.jsx
import { Link } from "react-router-dom";
import { Logo } from "../../../../assets/assets";

const AdminDashboardHeader = ({ logout }) => {
  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <img src={Logo} alt="Appointly" className="h-8 md:h-10 w-auto" />

          <Link
            to="/admin/dashboard"
            className="text-[22px] md:text-[26px] font-extrabold text-[#0D0E2A] mt-1 md:mt-2 custom-brand-font tracking-tight"
          >
            Appointly
            <span className="text-[#FF5C9D]">Admin</span>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center md:w-auto md:justify-end">
          <Link
            to="/"
            className="w-full rounded-full bg-white border border-slate-200 px-5 py-2 text-center text-[13px] font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all sm:w-auto"
          >
            Client App
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full rounded-full bg-slate-900 px-5 py-2 text-[13px] font-bold text-white hover:bg-slate-800 shadow-sm transition-all sm:w-auto"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
