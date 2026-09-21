// Client / src / pages / TermsOfService / View / TermsOfService.jsx
import { useAppContext } from "../../../context/appContext";
import LegalHeader from "../../../components/LegalHeader";
import { FileText } from "lucide-react";
import TermsOfServiceSections from "../Components/TermsOfServiceSections";
import TermsOfServiceContact from "../Components/TermsOfServiceContact";

const TermsOfService = () => {
  const { TERMS_OF_SERVICE_LAST_UPDATED } = useAppContext();

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <LegalHeader
        title="Terms of Service"
        icon={FileText}
        lastUpdated={TERMS_OF_SERVICE_LAST_UPDATED}
      />

      {/* -------- Content -------- */}
      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <TermsOfServiceSections />

          <TermsOfServiceContact />
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
