// Client / src / pages / PrivacyPolicy / View / PrivacyPolicy.jsx
import PrivacyPolicyHeader from "../Components/PrivacyPolicyHeader";
import PrivacyPolicySections from "../Components/PrivacyPolicySections";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <PrivacyPolicyHeader />

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
