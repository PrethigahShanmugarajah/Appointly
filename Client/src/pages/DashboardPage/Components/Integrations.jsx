// Client / src / pages / DashboardPage / Components / Integrations.jsx
import { CheckCircle } from "lucide-react";
import { Gmail, Google_Calendar, P5 } from "../../../assets/assets";

const Integrations = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col relative h-full overflow-hidden">
      <h3 className="text-[16px] font-bold text-slate-900 mb-8 z-10">
        Integrations
      </h3>

      <div className="space-y-6 z-10">
        <div className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-slate-300 transition-colors">
            <img
              src={Google_Calendar}
              alt="Google Calendar"
              className="w-10 h-10 object-contain"
            />
          </div>

          <div>
            <p className="font-bold text-slate-900 text-[15px]">
              Google Calendar
            </p>

            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle className="w-4 h-4 text-[#16a34a]" />{" "}
              <span className="text-[13px] text-[#16a34a] font-bold">
                Connected
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-slate-300 transition-colors">
            <img src={Gmail} alt="Gmail" className="w-12 h-12 object-contain" />
          </div>

          <div>
            <p className="font-bold text-slate-900 text-[15px]">Gmail</p>

            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle className="w-3.5 h-3.5 text-[#16a34a]" />{" "}
              <span className="text-[12px] text-[#16a34a] font-bold">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[-10%] bottom-0 w-[55%] h-[90%] flex items-center justify-center pointer-events-none z-0">
        <img
          src={P5}
          alt="Integration visual"
          className="w-full h-full object-contain object-bottom drop-shadow-[-10px_10px_30px_rgba(96,91,255,0.15)]"
        />
      </div>
    </div>
  );
};

export default Integrations;
