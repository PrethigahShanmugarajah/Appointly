// Client / src / pages / ProfilePage / Components / PublicPreview.jsx
import { BellRing, CalendarDays, Shield, Zap } from "lucide-react";

const PublicPreview = ({ form, previewBannerImage, brandStyleVars }) => {
  return (
    <div
      className="flex flex-col relative w-full h-full"
      style={brandStyleVars}
    >
      <div className="bg-(--brand-panel) rounded-3xl overflow-hidden flex flex-col shadow-lg relative pb-28 transition-colors">
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0">
          <img
            src={previewBannerImage}
            alt="3D Illustration"
            className="w-full h-full object-cover object-right opacity-60 mix-blend-screen mask-image-gradient"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 80%)",
              maskImage: "linear-gradient(to right, transparent, black 80%)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-(--brand-panel) via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-10 grow relative z-10 w-full mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5 mt-2">
            <div className="w-16 h-16 rounded-[18px] bg-(--brand-accent) flex items-center justify-center text-white text-3xl custom-brand-font shadow-sm shrink-0 transition-colors">
              {String(form.businessName || "M")
                .slice(0, 1)
                .toUpperCase()}
            </div>

            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-(--brand-accent) mb-1.5 opacity-90 transition-colors">
                Public preview
              </div>

              <h2 className="text-[36px] custom-brand-font text-white tracking-tight">
                {form.businessName || "Mental Clinic"}
              </h2>
            </div>
          </div>

          {form.businessDescription && (
            <p className="text-white/80 text-[15px] font-medium max-w-sm leading-relaxed">
              {form.businessDescription}
            </p>
          )}
        </div>
      </div>

      {/* -------- Overlapping White feature card -------- */}
      <div className="bg-white rounded-[20px] mx-4 sm:mx-6 -mt-21.25 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-20 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] border border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[#f5f3ff] flex items-center justify-center shrink-0">
            <CalendarDays className="w-4.5 h-4.5 text-[#7c3aed]" />
          </div>

          <div>
            <h5 className="text-[12px] font-extrabold text-slate-800">
              Easy Booking
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium pr-1">
              Book your session in just a few clicks.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[#f5f3ff] flex items-center justify-center shrink-0">
            <Shield className="w-4.5 h-4.5 text-[#7c3aed]" />
          </div>

          <div>
            <h5 className="text-[12px] font-extrabold text-slate-800">
              Secure Payments
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium pr-1">
              Powered by Stripe for safe transactions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[#f5f3ff] flex items-center justify-center shrink-0">
            <BellRing className="w-4.5 h-4.5 text-[#7c3aed]" />
          </div>

          <div>
            <h5 className="text-[12px] font-extrabold text-slate-800">
              Instant Updates
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium pr-1">
              Get email & calendar reminders.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[#f5f3ff] flex items-center justify-center shrink-0">
            <Zap className="w-4.5 h-4.5 text-[#7c3aed]" />
          </div>

          <div>
            <h5 className="text-[12px] font-extrabold text-slate-800">
              Hassle-free
            </h5>

            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium pr-1">
              Manage bookings anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPreview;
