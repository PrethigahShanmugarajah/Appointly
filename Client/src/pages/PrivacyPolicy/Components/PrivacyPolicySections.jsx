// Client / src / pages / PrivacyPolicy / Components / PrivacyPolicySections.jsx
import PrivacyPolicyGoogleApi from "./PrivacyPolicyGoogleApi";
import PrivacyPolicyContact from "./PrivacyPolicyContact";

const PrivacyPolicySections = () => {
  return (
    <>
      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          1. Introduction
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed">
          Appointly ("we," "our," or "us") values your privacy and is committed
          to protecting your personal information. This Privacy Policy describes
          how we collect, use, share, and protect information when you access or
          use our web application and related services (collectively, the
          "Service").
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          2. Information We Collect
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
          We may collect information that you provide to us directly, such as:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-slate-600 leading-relaxed ml-2">
          <li>
            <span className="font-semibold text-slate-700">
              Account Information:
            </span>{" "}
            Your name, email address, business name, and other profile
            information provided when registering for an account.
          </li>

          <li>
            <span className="font-semibold text-slate-700">
              Booking Information:
            </span>{" "}
            Details related to appointments, including customer names, email
            addresses, scheduled dates and times, and selected services.
          </li>

          <li>
            <span className="font-semibold text-slate-700">
              Payment Information:
            </span>{" "}
            Payment transactions are securely handled by our third-party payment
            provider, Stripe. We do not retain complete payment card details on
            our servers.
          </li>

          <li>
            <span className="font-semibold text-slate-700">Calendar Data:</span>{" "}
            If you connect Google Calendar, we use relevant calendar event
            information to synchronize appointments and help prevent scheduling
            overlaps.
          </li>

          <li>
            <span className="font-semibold text-slate-700">
              Communication Data:
            </span>{" "}
            Email addresses used to deliver OTP verification codes and
            appointment-related notifications.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          3. How We Use Your Information
        </h2>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-slate-600 leading-relaxed ml-2">
          <li>To deliver, manage, and maintain our Service</li>

          <li>
            To manage appointments, process payments, and provide booking
            confirmations
          </li>

          <li>
            To deliver OTP codes for secure account and booking verification
          </li>

          <li>
            To synchronize appointment details with your connected Google
            Calendar
          </li>

          <li>
            To send appointment-related email updates to customers and service
            providers
          </li>

          <li>To enhance and personalize your experience with the Service</li>

          <li>
            To identify and help prevent unauthorized or fraudulent use of the
            Service
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          4. Third-Party Services
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
          Appointly uses the following external services to support certain
          features:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-slate-600 leading-relaxed ml-2">
          <li>
            <span className="font-semibold text-slate-700">Stripe:</span> To
            securely handle payment transactions. Payment information processed
            through Stripe is subject to Stripe's privacy policy.
          </li>

          <li>
            <span className="font-semibold text-slate-700">
              Google Calendar API:
            </span>{" "}
            To synchronize appointment events with your calendar. We request
            only the permissions necessary to create and manage relevant
            calendar events.
          </li>

          <li>
            <span className="font-semibold text-slate-700">Gmail API:</span> To
            send appointment notifications and OTP verification messages using
            your connected Gmail account.
          </li>
        </ul>
      </section>

      <PrivacyPolicyGoogleApi />

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          6. Data Security
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed">
          We use suitable technical and organizational safeguards to help
          protect your personal information, including HTTPS/TLS encryption for
          data in transit, token-based authentication, and controlled access to
          data. However, no electronic system or method of data transmission can
          be guaranteed to be completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          7. Data Retention
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed">
          We keep your personal information while your account remains active or
          for as long as necessary to deliver the Service. Appointment records
          may be maintained for legitimate business and record-keeping purposes.
          You can request the removal of your account and related information by
          contacting us.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          8. Your Rights
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
          Depending on the laws applicable to you, you may have certain rights
          regarding your personal information, including:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-slate-600 leading-relaxed ml-2">
          <li>Access your personal information and request a copy of it</li>

          <li>Ask us to correct or update inaccurate personal information</li>

          <li>
            Request the deletion of your personal information where applicable
          </li>

          <li>
            Withdraw your consent to certain data processing activities at any
            time
          </li>

          <li>
            Manage or disconnect available third-party integrations, such as
            Google Calendar and Stripe, through your account settings
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          9. Cookies
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed">
          We use necessary cookies and local storage mechanisms to keep your
          authentication session active. We do not use cookies for tracking or
          third-party advertising purposes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          10. Changes to This Policy
        </h2>

        <p className="text-[15px] text-slate-600 leading-relaxed">
          We may revise this Privacy Policy periodically to reflect changes to
          our practices or services. Any updates will be reflected by changing
          the "Last updated" date shown at the top of this page. We recommend
          reviewing this policy from time to time to stay informed about any
          changes.
        </p>
      </section>

      <PrivacyPolicyContact />
    </>
  );
};

export default PrivacyPolicySections;
