// Client / src / pages / PrivacyPolicy / Components / PrivacyPolicyContact.jsx
import { useAppContext } from "../../../context/appContext";

const PrivacyPolicyContact = () => {
  const { SUPPORT_EMAIL } = useAppContext();

  return (
    <section>
      <h2 className="text-xl font-extrabold text-slate-900 mb-3">
        20. Contact Us
      </h2>

      <p className="text-[15px] text-slate-600 leading-relaxed">
        If you have questions about this Privacy Policy or would like to make a
        privacy-related request, please contact the Appointly support team at{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-[#7D57F5] font-semibold hover:underline"
        >
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </section>
  );
};

export default PrivacyPolicyContact;
