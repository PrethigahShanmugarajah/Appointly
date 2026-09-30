import { Logo } from "../../../../assets/assets";
import { Link } from "react-router-dom";

const AdminDashboardHeader = ({ logout }) => {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <img src={Logo} alt="Appointly" className="h-8 md:h-10 w-auto" />

          <Link
            to="/admin/dashboard"
            className="text-[22px] md:text-[26px] font-extrabold text-[#164E63] mt-1 md:mt-2 custom-brand-font tracking-tight"
          >
            Appointly
            <span className="text-[#E879F9]">Admin</span>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center md:w-auto md:justify-end">
          <Link
            to="/"
            className="w-full rounded-full bg-white border border-gray-200 px-5 py-2 text-center text-[13px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all sm:w-auto"
          >
            Client App
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full rounded-full bg-gray-900 px-5 py-2 text-[13px] font-bold text-white hover:bg-gray-800 shadow-sm transition-all sm:w-auto"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
