import React from "react";
import LegalLayout, { LegalSection, LegalList } from "@/components/layout/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout eyebrow="Your Privacy Matters" title="Privacy Policy" updated="June 2026">
      <LegalSection heading="Overview">
        <p>
          This privacy policy will help you understand how your personal information is collected,
          used and protected by True Valley Travels. By personal information we mean any information
          you provide to us — including your name, age, address, contact number, email address,
          card / payment information and, where relevant, the date of birth of children travelling
          with you, or any other such detail you choose to share.
        </p>
        <p>
          We assure you that we follow appropriate security standards to protect your privacy when
          you use our website and book with us.
        </p>
      </LegalSection>

      <LegalSection heading="Use & Disclosure of Information">
        <p>
          <strong>True Valley Travels does not sell or rent the personal information of our clients
          and users to any third party without the consent of the customer or user involved.</strong>
        </p>
        <LegalList
          items={[
            "We use your information only with your consent, to deliver the products and services you have requested from us.",
            "Financial information such as credit card, net-banking and debit card details is collected directly by the secure payment gateways and not stored by True Valley Travels.",
            "We may share necessary information with our trusted service partners and agents to respond to your queries and resolve issues, with restrictions placed on how they may use that data.",
            "Your basic information — such as name, age, phone number and address — is shared with the relevant service providers (such as airlines or hotel / accommodation providers) only as required to confirm your bookings.",
            "We may disclose information when required by Indian or foreign government agencies for security, immigration or customs purposes, or as otherwise required by law.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Security Measures">
        <p>
          True Valley Travels applies standard regulations and the best administrative and technical
          security measures available to us to protect your personal data from unauthorised access,
          alteration or disclosure.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies & Technology">
        <p>
          Our website uses cookies to enhance your experience and to present customised information.
          Third parties such as Google may use cookies to serve advertisements based on your browsing
          history. You can control or disable cookies at any time through your browser settings,
          though some features of the site may then not function as intended.
        </p>
      </LegalSection>

      <LegalSection heading="External Links">
        <p>
          Our website may contain links that connect you to entirely different websites. True Valley
          Travels bears no responsibility for the content or practices of those external sites, and we
          advise you to review their own terms and conditions and privacy policies before sharing any
          information with them.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          If you have any questions about this privacy policy or how your information is handled, please
          reach out to us at{" "}
          <a href="mailto:truevalleytours@gmail.com" className="text-secondary font-semibold hover:underline">truevalleytours@gmail.com</a>{" "}
          or call / WhatsApp{" "}
          <a href="tel:+918899177826" className="text-secondary font-semibold hover:underline">+91 88991 77826</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
