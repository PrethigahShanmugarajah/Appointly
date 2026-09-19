// Client / src / pages / ProfilePage / Components / CustomerView.jsx
import { Clock, Wand2 } from "lucide-react";
import { useAppContext } from "../../../context/appContext";

const CustomerView = ({ form, dynamicThemeUI }) => {
  const { CURRENCY } = useAppContext();

  return (
    <div className="flex flex-col">
      <div className="self-start px-3 py-1 bg-[#f5f3ff] text-[#7c3aed] text-[11px] font-extrabold tracking-wide rounded-full mb-3 ml-2">
        Customer view
      </div>

      <div
        className={`border text-center border-slate-200 rounded-3xl p-0 overflow-hidden shadow-sm flex flex-col h-full bg-slate-900 relative ${dynamicThemeUI.bg}`}
      >
        <div
          className={`absolute top-0 right-0 w-full h-full bg-linear-to-br pointer-events-none ${dynamicThemeUI.gradient}`}
        />
        <div className="p-7 relative z-10 flex flex-col items-center grow">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl custom-brand-font mb-4 mt-2 shadow-sm"
            style={{ backgroundColor: form.brandAccent }}
          >
            {(form.businessName || "M").slice(0, 1).toUpperCase()}
          </div>

          <h3 className="text-[26px] custom-brand-font text-white mb-1.5 tracking-tight">
            {form.businessName || "Mental Clinic"}
          </h3>

          <div className="flex justify-center gap-4 text-[11px] text-white/80 mb-7 font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 60 min
            </span>

            <span className="flex items-center gap-1.5">
              {CURRENCY} {form.duration || 900}
            </span>
          </div>

          <div className="w-full flex flex-col gap-2.5 mt-auto mb-2">
            <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest text-left ml-1 mb-1">
              Select Time
            </div>

            <button
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-sm transition opacity-100"
              style={{ backgroundColor: form.brandAccent }}
            >
              10:00 AM
            </button>

            <button className="w-full py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition">
              11:30 AM
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 mt-4 text-[12px] font-medium text-slate-500 px-2 leading-relaxed">
        <Wand2 className="w-4.5 h-4.5 shrink-0 mt-0.5 text-slate-400" />
        <span>
          Preview your public booking page.
          <br />
          Accent color applies to buttons.
        </span>
      </div>
    </div>
  );
};

export default CustomerView;
