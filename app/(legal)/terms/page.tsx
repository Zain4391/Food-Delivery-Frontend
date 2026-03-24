import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | QuickBite",
};

export default function TermsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p className="lead text-muted-foreground">Last updated: March 2026</p>

      <p>
        Welcome to QuickBite. By accessing or using our platform — including our website, mobile
        applications, and related services — you agree to be bound by these Terms of Service. Please
        read them carefully before placing an order or registering an account.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By creating an account or using QuickBite in any way, you confirm that you are at least 18
        years of age (or the age of majority in your jurisdiction), that you have read and understood
        these Terms, and that you agree to be legally bound by them. If you do not agree, please do
        not use our services.
      </p>

      <h2>2. Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms at any time. When we do, we will revise the
        &quot;Last updated&quot; date above and, where appropriate, notify you by email or in-app
        notification. Continued use of the platform after changes are posted constitutes your
        acceptance of the revised Terms.
      </p>

      <h2>3. Account Registration</h2>
      <p>
        To place orders or access role-specific features, you must register an account. You are
        responsible for maintaining the confidentiality of your login credentials and for all
        activities that occur under your account. Notify us immediately at{" "}
        <a href="mailto:support@quickbite.com">support@quickbite.com</a> if you suspect unauthorised
        access.
      </p>

      <h2>4. Orders and Payments</h2>
      <ul>
        <li>All prices are displayed inclusive of applicable taxes unless stated otherwise.</li>
        <li>Orders are confirmed once payment is successfully processed.</li>
        <li>
          You may cancel an order only while its status is <strong>Pending</strong> or{" "}
          <strong>Confirmed</strong>. Once preparation begins, cancellations are at the restaurant&apos;s
          discretion.
        </li>
        <li>
          Refunds, where applicable, are processed within 5–10 business days to the original
          payment method.
        </li>
      </ul>

      <h2>5. Delivery</h2>
      <p>
        Estimated delivery times are indicative only and may vary due to traffic, weather, or
        restaurant preparation times. QuickBite is not liable for delays outside its reasonable
        control. Drivers are independent contractors and not employees of QuickBite.
      </p>

      <h2>6. Driver Terms</h2>
      <p>
        If you register as a driver, you confirm that you hold a valid driving licence appropriate
        for your vehicle, that your vehicle is roadworthy and adequately insured, and that you will
        comply with all applicable traffic and food-safety regulations. QuickBite reserves the right
        to suspend or terminate driver accounts for policy violations.
      </p>

      <h2>7. Prohibited Conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the platform for any unlawful purpose or in violation of any regulations.</li>
        <li>Submit false, misleading, or fraudulent orders or account information.</li>
        <li>Attempt to reverse-engineer, scrape, or interfere with the platform&apos;s infrastructure.</li>
        <li>Harass, threaten, or abuse restaurant staff, drivers, or other users.</li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <p>
        All content on this platform — including logos, text, graphics, and software — is the
        property of QuickBite or its licensors and is protected by applicable intellectual property
        laws. You may not reproduce or distribute any content without our prior written consent.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, QuickBite and its affiliates shall not be liable for
        any indirect, incidental, special, or consequential damages arising from your use of — or
        inability to use — the platform. Our total liability to you for any claim shall not exceed
        the amount you paid for the order giving rise to the claim.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the jurisdiction in
        which QuickBite is registered, without regard to its conflict-of-law provisions.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:legal@quickbite.com">legal@quickbite.com</a>.
      </p>
    </article>
  );
}
