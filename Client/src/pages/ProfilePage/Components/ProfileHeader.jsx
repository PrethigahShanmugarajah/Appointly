// Client / src / pages / ProfilePage / Components / ProfileHeader.jsx
import { P2 } from "../../../assets/assets";

const ProfileHeader = () => {
  return (
    <div className="flex items-start justify-between">
      <div className="pt-2">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6] mb-4">
          Profile
        </h3>

        <h1 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tight text-[#0D0E2A]">
          Shape your{" "}
          <span className="bg-linear-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5] bg-clip-text text-transparent custom-brand-font">
            public
          </span>
          <br />
          <span className="bg-linear-to-r from-[#11122F] via-[#261E66] to-[#171A3E] bg-clip-text text-transparent custom-brand-font">
            booking{" "}
            <span className="bg-linear-to-r from-[#191A44] via-[#3B2E95] to-[#0F172A] bg-clip-text text-transparent custom-brand-font">
              experience
            </span>
          </span>
        </h1>

        <p className="mt-4 text-slate-500 text-[15px] font-medium max-w-sm leading-relaxed">
          Personalize your booking page, connect your tools, and share your link
          with confidence.
        </p>
      </div>

      <div className="w-50 h-36 rounded-3xl flex items-center justify-center self-end -mr-4 lg:mr-0 relative overflow-hidden">
        <img
          src={P2}
          alt="Profile illustration"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
