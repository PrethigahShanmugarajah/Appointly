import { Logo } from "../../../assets/assets";
import FeatureCards from "./FeatureCards";

const AuthBranding = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Appointly" className="h-10 w-auto" />

        <span className="text-[22px] md:text-[26px] tracking-tight text-gray-800 custom-brand-font mt-1 md:mt-2">
          Appointly
        </span>
      </div>

      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-5xl">
        A calm booking desk for{" "}
        <span className="bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] bg-clip-text text-transparent custom-brand-font text-[38px] md:text-[46px] ml-2">
          small business.
        </span>
      </h1>

      <p className="max-w-lg text-lg text-gray-500">
        Create your business profile, add services, set availability, and share
        one clean booking link.
      </p>

      <FeatureCards />
    </section>
  );
};

export default AuthBranding;
