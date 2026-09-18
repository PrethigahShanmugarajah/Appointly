// Client / src / pages / DashboardPage / Components / DashboardHeader.jsx
import { Link } from "react-router-dom";
import { getGreeting } from "../../../utils/dashboard";

const DashboardHeader = ({ user }) => {
  return (
    <header>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
        {user ? (
          <>
            Welcome Back,{" "}
            <span className="bg-linear-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5] bg-clip-text text-transparent custom-brand-font text-[28px] md:text-[36px] ml-2">
              {user.businessName || user.name}
            </span>{" "}
            <span className="ml-2">👋</span>
          </>
        ) : (
          getGreeting()
        )}
      </h1>

      <p className="mt-1.5 text-[15px] font-medium text-slate-500">
        Here's what's happening with your business today.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/services"
          className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold rounded-full shadow-sm hover:bg-slate-50 transition-colors"
        >
          Add services
        </Link>

        <Link
          to="/availability"
          className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold rounded-full shadow-sm hover:bg-slate-50 transition-colors"
        >
          Set availability
        </Link>

        <Link
          to="/payments"
          className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold rounded-full shadow-sm hover:bg-slate-50 transition-colors"
        >
          Payment details
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
