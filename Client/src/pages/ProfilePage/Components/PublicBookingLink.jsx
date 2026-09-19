// Client / src / pages / ProfilePage / Components / PublicBookingLink.jsx
import { BadgeCheck, Copy, Wand2 } from "lucide-react";

const PublicBookingLink = ({ publicLink, copyPublicLink, copyMessage }) => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm">
      <h4 className="text-[13px] font-semibold text-slate-700 mb-3">
        Public booking link
      </h4>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex flex-1 items-center justify-between border border-slate-200 bg-[#fafafa] rounded-xl px-4 py-3.5 overflow-hidden">
          <span className="text-[13px] sm:text-[14px] font-medium text-slate-800 break-all line-clamp-1">
            {publicLink}
          </span>

          <button
            onClick={copyPublicLink}
            className="text-slate-400 hover:text-slate-700 focus:outline-none ml-2 transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={copyPublicLink}
          className="flex items-center gap-2 bg-[#09090b] hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shadow-sm"
        >
          <Wand2 className="h-4 w-4" />
          {copyMessage || "Copy link"}
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4 text-[13px] font-medium text-emerald-600">
        <BadgeCheck className="h-4 w-4" />
        <span>Your link is live and ready to share!</span>
      </div>
    </div>
  );
};

export default PublicBookingLink;
