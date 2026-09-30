import PrivacyPolicyGoogleApi from "./PrivacyPolicyGoogleApi";
import PrivacyPolicyContact from "./PrivacyPolicyContact";

const PrivacyPolicySections = () => {
  return (
    <>
      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          1. Introduction
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly respects your privacy and is committed to handling personal
          information responsibly. This Privacy Policy explains how we collect,
          use, store, protect, and disclose information when you use Appointly,
          including its website, appointment scheduling features, booking
          services, and related functionality.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          2. Scope of This Privacy Policy
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          This Privacy Policy applies to information collected through Appointly
          and its related services. It explains how personal information is
          handled when you create an account, manage services, make
          appointments, communicate through the platform, or use connected
          integrations. Third-party services that you access through Appointly
          may have their own privacy policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          3. Information We Collect
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
          Depending on how you use Appointly, we may collect the following
          categories of information:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>
            <span className="font-semibold text-gray-700">
              Account Information:
            </span>{" "}
            Your name, email address, password-related information, business
            name, profile details, and other information required to create and
            manage your account.
          </li>

          <li>
            <span className="font-semibold text-gray-700">
              Appointment Information:
            </span>{" "}
            Booking dates, appointment times, selected services, customer
            details, and other information necessary to manage appointments.
          </li>

          <li>
            <span className="font-semibold text-gray-700">
              Business Information:
            </span>{" "}
            Information about services, descriptions, availability, pricing,
            business details, and other information entered by Providers.
          </li>

          <li>
            <span className="font-semibold text-gray-700">
              Communication Information:
            </span>{" "}
            Email addresses and information required to send OTP codes,
            confirmations, reminders, cancellations, and other service-related
            messages.
          </li>

          <li>
            <span className="font-semibold text-gray-700">
              Calendar Information:
            </span>{" "}
            Relevant Google Calendar information when you choose to connect your
            calendar to Appointly.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          4. How We Collect Information
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
          We may obtain information through several sources, including:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>
            Information you provide when registering or updating your account.
          </li>

          <li>
            Information entered when creating services or making appointments.
          </li>

          <li>
            Information generated when you use Appointly's features and
            functionality.
          </li>

          <li>
            Information received from third-party integrations that you
            intentionally connect to your account.
          </li>

          <li>
            Information collected through necessary cookies, local storage, and
            similar technologies used to operate the Service.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          5. How We Use Personal Information
        </h2>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>To create and manage user accounts.</li>

          <li>
            To provide appointment scheduling, booking, and service management
            features.
          </li>

          <li>
            To process and manage appointment-related communications and
            notifications.
          </li>

          <li>
            To send OTP verification codes and other account security messages.
          </li>

          <li>
            To synchronize information with connected third-party services when
            you enable an integration.
          </li>

          <li>To maintain, operate, troubleshoot, and improve Appointly.</li>

          <li>
            To detect unauthorized access, fraud, misuse, or security threats.
          </li>

          <li>
            To comply with applicable legal requirements and protect our
            legitimate business interests.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          6. Appointment and Booking Information
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          When you create or manage an appointment through Appointly, we may
          process information necessary to complete the booking. This can
          include the Client's name, email address, selected service,
          appointment date and time, and related booking information. Providers
          are responsible for ensuring that information they enter into the
          platform is collected and used appropriately.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          7. Payment Information
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Payments made through Appointly may be processed by Stripe or another
          applicable payment provider. Payment card information is handled by
          the relevant payment provider according to its security and privacy
          practices. Appointly does not intentionally store complete payment
          card details on its own servers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          8. Google Services and Calendar Data
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          If you choose to connect a Google account or Google Calendar,
          Appointly may access information required to provide calendar
          synchronization and related features. We use the requested Google data
          only for the purposes necessary to provide the enabled functionality
          and handle it in accordance with applicable Google API requirements.
        </p>
      </section>

      <PrivacyPolicyGoogleApi />

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          10. Email and Communication Services
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly may use email and communication services to send account
          verification codes, appointment confirmations, cancellation
          notifications, and other messages related to the Service. We use
          contact information necessary to deliver these communications and do
          not use these service messages as a substitute for unrelated marketing
          communications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          11. How We Share Information
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We may share personal information when necessary to operate Appointly,
          provide requested functionality, process transactions, support
          integrations, comply with legal obligations, or protect the rights and
          security of Appointly and its users. We do not sell your personal
          information as a business practice.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          12. Data Security
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We apply reasonable technical and organizational measures designed to
          protect personal information against unauthorized access, alteration,
          disclosure, or destruction. These measures may include encrypted
          connections, authentication mechanisms, access controls, and secure
          handling of application data. However, no online system or method of
          transmission can be guaranteed to be completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          13. Data Retention
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We retain personal information for as long as reasonably necessary to
          provide Appointly, maintain account and appointment records, meet
          operational requirements, resolve disputes, enforce agreements, or
          comply with applicable legal obligations. When information is no
          longer required, we may delete or securely dispose of it in accordance
          with our practices and applicable requirements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          14. Your Privacy Rights
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
          Depending on applicable law, you may have rights relating to your
          personal information, which may include:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>Requesting access to personal information we hold about you.</li>

          <li>
            Requesting correction of inaccurate or incomplete information.
          </li>

          <li>
            Requesting deletion of personal information where legally
            applicable.
          </li>

          <li>
            Requesting information about how your personal information is
            processed.
          </li>

          <li>
            Disconnecting supported third-party integrations from your account.
          </li>
        </ul>

        <p className="text-[15px] text-gray-600 leading-relaxed mt-3">
          Requests relating to your personal information can be submitted using
          the contact details provided in this Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          15. Cookies and Local Storage
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly may use necessary cookies and browser local storage to
          support authentication, maintain sessions, remember required
          application settings, and provide core functionality. These
          technologies are intended to support the operation of the Service
          rather than to provide third-party advertising.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          16. Third-Party Services and Links
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly may contain integrations or links to third-party services.
          These services may collect and process information according to their
          own terms and privacy policies. We are not responsible for the privacy
          practices, security, availability, or content of third-party services.
          We recommend reviewing their privacy policies before using those
          services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          17. Children's Privacy
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly is not intended to be used by children who are not legally
          permitted to use online services under the laws applicable to them. We
          do not knowingly seek to collect personal information from children
          without appropriate authorization. If you believe that a child has
          provided personal information to us improperly, please contact us so
          that we can review the matter.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          18. International Data Transfers
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly may use infrastructure, service providers, or integrations
          located in countries other than the country where you live. As a
          result, personal information may be processed or stored outside your
          country. Where required, we will take appropriate measures for such
          processing in accordance with applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          19. Changes to This Privacy Policy
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes
          in Appointly, our information practices, third-party integrations, or
          applicable requirements. When changes are made, the updated version
          will be published on this page and the "Last updated" date will be
          revised. We encourage you to review this Privacy Policy periodically.
        </p>
      </section>

      <PrivacyPolicyContact />
    </>
  );
};

export default PrivacyPolicySections;
