// Client / src / pages / Admin / AdminLoginPage / Components / AdminLoginBrand.jsx
import { Logo } from "../../assets/assets";

const AdminLoginBrand = () => {
  return (
    <div className="lg:w-5/12 bg-linear-to-br from-[#f5eeff] via-[#f7f0fe] to-[#eff4ff] p-6 sm:p-8 lg:p-10 flex flex-col relative overflow-hidden">
      <div className="z-10 relative flex-1 flex flex-col justify-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#7D57F5] mb-3">
          System Access
        </p>

        <div className="flex items-center gap-2 mb-4">
          <img src={Logo} alt="Appointly" className="h-10 w-auto" />
        </div>

        <h1 className="text-[30px] sm:text-[38px] leading-[1.1] font-extrabold text-[#0D0E2A] mb-4">
          Appointly <br />{" "}
          <span className="text-[#FF5C9D] custom-brand-font text-[36px] sm:text-[44px]">
            Admin
          </span>{" "}
        </h1>

        <p className="text-[14px] font-medium text-slate-500 leading-relaxed max-w-full lg:max-w-70 text-justify">
          Manage your appointments, services, customers, and business activities
          from one secure and centralized admin dashboard. Keep track of
          bookings, organize your services, monitor daily activities, and manage
          your business operations efficiently with Appointly.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginBrand;
