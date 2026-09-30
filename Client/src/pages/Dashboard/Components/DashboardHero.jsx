import { ArrowRight, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Gmail,
  Instagram,
  P1,
  WhatsApp,
} from "../../../assets/assets";
import { buildGmailShareUrl } from "../../../utils/dashboard";
import { useAppContext } from "../../../context/appContext";

const DashboardHero = ({ publicLink, copyPublicLink, copyMessage }) => {
  const { WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_SHARE_URL } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
      <div className="bg-linear-to-r from-[#F0F9FF] via-[#C7F9F1] to-[#E0E7FF] rounded-3xl p-8 md:p-10 flex justify-between items-center relative overflow-hidden shadow-sm border border-white">
        <div className="z-10 relative max-w-85">
          <h2 className="text-[32px] md:text-[38px] lg:text-[44px] tracking-tight font-extrabold text-[#164E63] leading-[1.1]">
            Grow your practice.
            <br />
            Impact more lives.
          </h2>

          {publicLink ? (
            <a
              href={publicLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white text-[#2DD4BF] text-[14px] font-bold rounded-full shadow-sm hover:shadow transition-all border border-[#CCFBF1]"
            >
              View booking page <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          ) : (
            <Link
              to="/profile"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white text-[#2DD4BF] text-[14px] font-bold rounded-full shadow-sm hover:shadow transition-all border border-[#CCFBF1]"
            >
              Setup booking page <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>

        <div className="hidden sm:block absolute right-4 bottom-0 h-full w-[45%] pointer-events-none">
          <img
            src={P1}
            alt="Hero"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_10px_35px_rgba(232,243,255,0.25)]"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)]">
        <h3 className="font-bold text-gray-900 text-[15px]">
          Public booking link
        </h3>

        <div className="mt-4 p-2 bg-[#FAFAFA] rounded-[14px] flex items-center gap-2 border border-gray-100 focus-within:ring-2 focus-within:ring-[#E8F3FF] transition-shadow">
          <span className="flex-1 text-[13px] text-gray-800 font-bold truncate pl-3">
            {publicLink || "Save profile to generate..."}
          </span>

          {publicLink && (
            <button
              onClick={copyPublicLink}
              className="p-2.5 bg-white border border-gray-200 rounded-[10px] shadow-sm hover:bg-gray-50 text-gray-600 transition-colors shrink-0"
              aria-label={copyMessage || "Copy booking link"}
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="mt-4 text-[13px] text-gray-500 font-medium leading-relaxed">
          Share your link and start getting
          <br />
          bookings instantly.
        </p>

        <h4 className="mt-6 text-[13px] font-bold text-gray-900">
          Share your link
        </h4>

        <div className="mt-3 flex flex-wrap gap-3 md:gap-4">
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Book a session with me: " + publicLink)}`}
            target="_blank"
            rel="noreferrer"
            className="w-11.5 h-11.5 md:w-12.5 md:h-12.5 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors hover:scale-105"
          >
            <img
              src={WhatsApp}
              alt="WhatsApp"
              className="w-9 h-9 object-contain drop-shadow-sm"
            />
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => copyPublicLink()}
            title="Link copied to clipboard for Instagram bio"
            className="w-12.5 h-12.5 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors hover:scale-105"
          >
            <img
              src={Instagram}
              alt="Instagram"
              className="w-6.5 h-6.5 object-contain drop-shadow-sm scale-[1.1]"
            />
          </a>

          <a
            href={`${FACEBOOK_SHARE_URL}?u=${encodeURIComponent(publicLink)}`}
            target="_blank"
            rel="noreferrer"
            className="w-12.5 h-12.5 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors hover:scale-105"
          >
            <img
              src={Facebook}
              alt="Facebook"
              className="w-7.5 h-7.5 object-contain drop-shadow-sm"
            />
          </a>

          <a
            href={buildGmailShareUrl(publicLink)}
            target="_blank"
            rel="noreferrer"
            className="w-12.5 h-12.5 rounded-full flex items-center justify-center bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors hover:scale-105"
          >
            <img
              src={Gmail}
              alt="Gmail"
              className="w-9 h-9 object-contain drop-shadow-sm"
            />
          </a>

          <button
            onClick={copyPublicLink}
            className="w-11.5 h-11.5 md:w-12.5 md:h-12.5 bg-[#F0FDFA] text-[#2DD4BF] rounded-full flex items-center justify-center transition-colors hover:bg-[#CCFBF1] shrink-0 hover:scale-105"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
