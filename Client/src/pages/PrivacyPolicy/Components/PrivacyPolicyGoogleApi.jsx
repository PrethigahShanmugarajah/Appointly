import { useAppContext } from "../../../context/appContext";

const PrivacyPolicyGoogleApi = () => {
  const { GOOGLE_API_SERVICES_POLICY_URL } = useAppContext();

  return (
    <section>
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">
        9. Google API Services — Limited Use Disclosure
      </h2>

      <p className="text-[15px] text-gray-600 leading-relaxed">
        When you connect a Google service to Appointly, we may access and
        process the Google data required to provide the features you have
        enabled, such as calendar synchronization and appointment-related
        functionality. We limit access to the information necessary for these
        features and do not use Google user data for advertising, sell Google
        user data, or use it for purposes unrelated to the requested
        functionality. Appointly handles Google user data in accordance with
        applicable Google API requirements and the{" "}
        <a
          href={GOOGLE_API_SERVICES_POLICY_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#2DD4BF] font-semibold hover:underline"
        >
          Google API Services User Data Policy
        </a>
        . You may disconnect supported Google services from your Appointly
        account at any time.
      </p>
    </section>
  );
};

export default PrivacyPolicyGoogleApi;
