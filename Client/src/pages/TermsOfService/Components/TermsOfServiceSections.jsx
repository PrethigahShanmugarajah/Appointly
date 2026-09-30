import { useAppContext } from "../../../context/appContext";

const TermsOfServiceSections = () => {
  const { PORTFOLIO_NAME, PORTFOLIO_URL, GOVERNING_LAW_COUNTRY } =
    useAppContext();

  return (
    <>
      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          1. Acceptance of Terms
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          By accessing or using Appointly, you agree to these Terms of Service
          and any applicable rules or policies referenced in them. These Terms
          form an agreement between you and Appointly regarding your use of the
          Service. If you do not accept these Terms, you must not access or use
          Appointly.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          2. Eligibility to Use the Service
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          You may use Appointly only if you are legally permitted to enter into
          an agreement under the laws applicable to you. By using the Service,
          you confirm that the information you provide is accurate and that you
          have the legal capacity to accept these Terms. If you use Appointly on
          behalf of a business or organization, you confirm that you are
          authorized to act on its behalf.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          3. Account Registration and Security
        </h2>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>
            You must provide accurate and current information when creating your
            account.
          </li>

          <li>
            You are responsible for keeping your account credentials secure and
            confidential.
          </li>

          <li>
            You are responsible for activities performed through your account
            unless they result from unauthorized access that was not caused by
            your failure to protect your account.
          </li>

          <li>
            You must notify us promptly if you believe that your account has
            been accessed without authorization.
          </li>

          <li>
            You must not create an account using another person's identity or
            information without permission.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          4. Description of Appointly
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly is an online appointment scheduling and booking platform
          that helps Providers manage services, availability, appointments,
          Clients, and related communications. The Service may also provide
          features for online payments, calendar synchronization, email
          notifications, and appointment management. The features available to
          you may depend on your account type and the configuration of the
          Service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          5. Provider Responsibilities
        </h2>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>
            Providers are responsible for ensuring that their service
            information, prices, availability, and business details are
            accurate.
          </li>

          <li>
            Providers are responsible for managing their appointments and
            maintaining accurate availability through the Service.
          </li>

          <li>
            Providers must communicate clearly with Clients regarding their
            services, appointment requirements, cancellations, and applicable
            fees.
          </li>

          <li>
            Providers are responsible for complying with laws and regulations
            applicable to their business and services.
          </li>

          <li>
            Providers must not use Appointly to provide services or conduct
            activities that are unlawful or prohibited under these Terms.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          6. Client Responsibilities
        </h2>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>
            Clients must provide accurate information when making an appointment
            or using the Service.
          </li>

          <li>
            Clients are responsible for attending appointments at the agreed
            date and time.
          </li>

          <li>
            Clients should follow the cancellation and rescheduling policies
            established by the relevant Provider.
          </li>

          <li>
            Clients must not use the Service to make fraudulent, misleading,
            abusive, or unauthorized bookings.
          </li>

          <li>
            Clients are responsible for providing valid payment information when
            payment is required for a booking.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          7. Appointments and Cancellations
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointments are made between Clients and Providers through the
          Service. Providers are responsible for defining their available
          appointment times and applicable cancellation or rescheduling
          policies. Clients should review the relevant Provider's policies
          before confirming an appointment. Appointly provides the technical
          platform for managing bookings but does not guarantee that a Provider
          will be available for an appointment or that an appointment will be
          fulfilled.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          8. Payments and Fees
        </h2>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>
            Payments made through Appointly may be processed by third-party
            payment providers such as Stripe.
          </li>

          <li>
            Providers are responsible for setting the prices and applicable
            charges for their services.
          </li>

          <li>
            Appointly may apply platform or service fees where applicable. Any
            applicable fees will be communicated through the Service.
          </li>

          <li>
            Appointly does not store complete payment card details when payment
            processing is handled by the applicable third-party payment
            provider.
          </li>

          <li>
            Refunds, cancellations, and payment disputes may be subject to the
            policies of the Provider and the applicable payment provider.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          9. Third-Party Services
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly may connect with third-party services, including Google
          Calendar, Gmail, and Stripe, to provide certain features. Your use of
          these services may also be governed by the terms and privacy policies
          of the respective third parties. Appointly is not responsible for
          changes, interruptions, failures, or policies of third-party services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          10. User Content
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          You may provide information, descriptions, images, service details,
          business information, and other content through Appointly. You retain
          ownership of content that you submit. By providing content through the
          Service, you grant Appointly the permission necessary to host, store,
          process, display, and use that content to operate and provide the
          Service. You are responsible for ensuring that your content is
          accurate, lawful, and does not infringe the rights of others.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          11. Acceptable Use
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
          You must not use Appointly to:
        </p>

        <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-600 leading-relaxed ml-2">
          <li>Break or violate applicable laws or regulations.</li>

          <li>
            Misrepresent your identity, business, services, or relationship with
            another person or organization.
          </li>

          <li>
            Attempt to gain unauthorized access to accounts, systems, or data.
          </li>

          <li>
            Introduce malware, viruses, malicious code, or other harmful
            software.
          </li>

          <li>
            Interfere with the normal operation, security, or availability of
            the Service.
          </li>

          <li>
            Use the Service for fraudulent, abusive, deceptive, or harmful
            activities.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          12. Intellectual Property
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly and its underlying software, interface, design, features,
          branding, and original materials are owned by Appointly and{" "}
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#2DD4BF] font-semibold hover:underline"
          >
            {PORTFOLIO_NAME}
          </a>
          , except for content provided by users or third parties. These
          materials are protected by applicable intellectual property laws. You
          may use Appointly only for its intended purpose and may not copy,
          modify, distribute, sell, or create derivative works from the Service
          without appropriate authorization.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          13. Privacy and Personal Data
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly may collect and process personal information required to
          provide and improve the Service. Our collection and use of personal
          data are described in our Privacy Policy. By using Appointly, you
          acknowledge that your information may be processed as described in
          that policy and as permitted by applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          14. Service Availability
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We aim to keep Appointly available and functioning reliably, but we do
          not guarantee that the Service will always be available or operate
          without interruption. The Service may occasionally be unavailable due
          to maintenance, updates, technical problems, security incidents,
          third-party service failures, or circumstances outside our reasonable
          control.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          15. Disclaimers
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          Appointly is provided on an "AS IS" and "AS AVAILABLE" basis to the
          extent permitted by applicable law. We do not guarantee the accuracy,
          completeness, reliability, or suitability of information available
          through the Service. Appointly does not guarantee the quality,
          legality, availability, or performance of services offered by
          Providers or the conduct of Clients using the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          16. Limitation of Liability
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          To the maximum extent permitted by applicable law, Appointly and its
          owners, affiliates, officers, employees, agents, and service providers
          will not be liable for indirect, incidental, special, consequential,
          or punitive losses arising from or related to your use of, or
          inability to use, the Service. This includes losses relating to
          profits, revenue, data, business opportunities, or other intangible
          losses, except where liability cannot lawfully be excluded.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          17. Indemnification
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          To the extent permitted by applicable law, you agree to be responsible
          for losses, claims, liabilities, damages, and reasonable expenses
          arising from your misuse of the Service, violation of these Terms,
          violation of applicable law, or infringement of the rights of another
          person or organization. This provision applies only to the extent
          permitted by applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          18. Suspension and Termination
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We may suspend or terminate your access to Appointly if you violate
          these Terms, misuse the Service, create a security risk, or engage in
          unlawful activity. We may also discontinue or modify parts of the
          Service where necessary. You may stop using Appointly and request
          account closure at any time. Provisions that are intended to continue
          after termination will remain effective where applicable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          19. Changes to These Terms
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          We may update these Terms when necessary to reflect changes to
          Appointly, applicable requirements, or our practices. Updated Terms
          will be published through the Service together with the applicable
          effective date. If you continue to use Appointly after the updated
          Terms become effective, your continued use will indicate your
          acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          20. Governing Law and Jurisdiction
        </h2>

        <p className="text-[15px] text-gray-600 leading-relaxed">
          These Terms will be governed by and interpreted in accordance with the
          applicable laws of {GOVERNING_LAW_COUNTRY}. Any dispute, claim, or
          matter arising from or relating to these Terms or your use of
          Appointly will be subject to the jurisdiction of the courts of{" "}
          {GOVERNING_LAW_COUNTRY}, subject to any mandatory legal requirements
          that may apply.
        </p>
      </section>
    </>
  );
};

export default TermsOfServiceSections;
