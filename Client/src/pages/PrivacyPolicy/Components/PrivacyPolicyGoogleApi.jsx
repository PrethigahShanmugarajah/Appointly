// Client / src / pages / PrivacyPolicy / Components / PrivacyPolicyGoogleApi.jsx
import { useAppContext } from "../../../context/appContext";

const PrivacyPolicyGoogleApi = () => {
  const { GOOGLE_API_SERVICES_POLICY_URL } = useAppContext();

  return (
    <section>
      <h2 className="text-xl font-extrabold text-slate-900 mb-3">
        5. Google API Services — Limited Use Disclosure
      </h2>

      <p className="text-[15px] text-slate-600 leading-relaxed">
        Appointly handles and transfers data obtained through Google APIs in
        accordance with the{" "}
        <a
          href={GOOGLE_API_SERVICES_POLICY_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#7D57F5] font-semibold hover:underline"
        >
          Google API Services User Data Policy
        </a>
        . We access Google data only when necessary to support calendar
        synchronization and email notification features and use it in line with
        the Limited Use requirements.
      </p>
    </section>
  );
};

export default PrivacyPolicyGoogleApi;
