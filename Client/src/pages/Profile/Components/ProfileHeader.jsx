import { P2 } from "../../../assets/assets";

const ProfileHeader = () => {
  return (
    <div className="flex items-start justify-between">
      <div className="pt-2">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#14B8A6] mb-4">
          Profile
        </h3>

        <h1 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-tight text-[#164E63]">
          Shape your{" "}
          <span className="bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] bg-clip-text text-transparent custom-brand-font">
            public
          </span>
          <br />
          <span className="bg-linear-to-r from-[#3730A3] via-[#1E40AF] to-[#172554] bg-clip-text text-transparent custom-brand-font">
            booking{" "}
            <span className="bg-linear-to-r from-[#0C4A6E] via-[#60A5FA] to-[#111827] bg-clip-text text-transparent custom-brand-font">
              experience
            </span>
          </span>
        </h1>

        <p className="mt-4 text-gray-500 text-[15px] font-medium max-w-sm leading-relaxed">
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
