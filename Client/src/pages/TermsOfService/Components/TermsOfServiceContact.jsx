// Client / src / pages / TermsOfService / Components / TermsOfServiceContact.jsx
import { useAppContext } from "../../../context/appContext";

const TermsOfServiceContact = () => {
  const { SUPPORT_EMAIL } = useAppContext();

  return (
    <section>
      <h2 className="text-xl font-extrabold text-slate-900 mb-3">
        21. Contact Us
      </h2>

      <p className="text-[15px] text-slate-600 leading-relaxed">
        If you have any questions, concerns, or requests regarding these Terms
        of Service, please contact us at:{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-[#7D57F5] font-semibold hover:underline"
        >
          {SUPPORT_EMAIL}
        </a>
      </p>
    </section>
  );
};

export default TermsOfServiceContact;
