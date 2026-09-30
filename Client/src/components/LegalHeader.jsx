import { Link } from "react-router-dom";
import { Logo } from "../assets/assets";
import { ArrowLeft } from "lucide-react";

const LegalHeader = ({ title, icon: Icon, lastUpdated }) => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={Logo} alt="Appointly" className="h-8 w-auto" />

            <span className="custom-brand-font text-[22px] text-gray-900 tracking-tight">
              Appointly
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 mt-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#F0FDFA] flex items-center justify-center">
            <Icon className="w-7 h-7 text-[#2DD4BF]" />
          </div>

          <div>
            <h1 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-gray-900 leading-tight">
              {title}
            </h1>

            <p className="text-sm font-medium text-gray-500 mt-1">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalHeader;
