// Client / src / pages / PrivacyPolicy / View / PrivacyPolicy.jsx
import { useAppContext } from "../../../context/appContext";
import LegalHeader from "../../../components/LegalHeader";
import { Shield } from "lucide-react";
import PrivacyPolicySections from "../Components/PrivacyPolicySections";

const PrivacyPolicy = () => {
  const { PRIVACY_POLICY_LAST_UPDATED } = useAppContext();

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <LegalHeader
        title="Privacy Policy"
        icon={Shield}
        lastUpdated={PRIVACY_POLICY_LAST_UPDATED}
      />

      {/* -------- Content -------- */}
      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <PrivacyPolicySections />
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
