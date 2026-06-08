import React from "react";
import LegalLayout, { LegalSection, LegalList } from "@/components/layout/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout eyebrow="Booking & Cancellation" title="Terms & Conditions" updated="June 2026">
      <LegalSection heading="Bookings & Payments">
        <LegalList
          items={[
            "True Valley Travels requires only 20% of the total tour cost to confirm and secure your booking. This percentage may vary depending on the itinerary, trip category and duration.",
            "The advance amount will be adjusted as per the recommendation of your personal travel consultant.",
            "Online payments are accepted through our secure payment gateway.",
            "A 3% additional charge will be levied on credit-card payments over the total amount.",
            "All bank charges and payment-gateway fees on remittances must be borne by the passenger.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Cancellation & Refunds">
        <LegalList
          items={[
            "Any cancellation must be notified to True Valley Travels in writing.",
            "Cancellation charges will be effective from the date on which we receive your cancellation in writing.",
            "Cancellation of transportation tickets follows the rules of the respective authority.",
            "Air tickets issued at special / promotional fares are non-refundable, and the applicable cancellation charges are borne by the guest.",
            "Bookings made during peak tourist season may attract no refund on cancellation, regardless of the reason.",
            "Peak-season policies vary by region and by hotel. Hotels may apply their own cancellation policies, which we are obliged to follow. Any excess charges arising from such cancellations are the responsibility of the client and not of the travel agent.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Tour & Itinerary Changes">
        <p>
          Itineraries are planned in advance, but mountain travel in Kashmir can be affected by weather,
          road conditions, landslides or other circumstances beyond our control. In such cases True Valley
          Travels reserves the right to amend, reschedule or substitute parts of the itinerary in the
          interest of your safety and comfort. We will always do our best to offer a suitable alternative
          of equal value.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptance">
        <p>
          By confirming a booking with True Valley Travels, you acknowledge that you have read, understood
          and agreed to these terms and conditions. For any clarification, please contact us at{" "}
          <a href="mailto:truevalleytours@gmail.com" className="text-secondary font-semibold hover:underline">truevalleytours@gmail.com</a>{" "}
          or call / WhatsApp{" "}
          <a href="tel:+918899177826" className="text-secondary font-semibold hover:underline">+91 88991 77826</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
