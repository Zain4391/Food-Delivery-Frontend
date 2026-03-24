import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | QuickBite",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="lead text-muted-foreground">Last updated: March 2026</p>

      <p>
        QuickBite (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal
        information. This Privacy Policy explains what data we collect, how we use it, and the
        choices you have regarding your information.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>Information you provide directly</h3>
      <ul>
        <li><strong>Account data:</strong> name, email address, phone number, delivery address.</li>
        <li><strong>Driver data:</strong> vehicle type, driving licence details.</li>
        <li><strong>Payment data:</strong> processed securely via our payment provider; we do not store raw card numbers.</li>
        <li><strong>Profile images:</strong> uploaded voluntarily for your account profile.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Usage data:</strong> pages visited, features used, session duration.</li>
        <li><strong>Device data:</strong> browser type, operating system, IP address.</li>
        <li><strong>Location data:</strong> approximate location inferred from IP; precise GPS only if you grant permission.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and fulfil your orders.</li>
        <li>To assign and coordinate delivery drivers.</li>
        <li>To send order confirmations, status updates, and support communications.</li>
        <li>To improve and personalise our platform.</li>
        <li>To detect and prevent fraud or policy violations.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We do not sell your personal data. We share it only:</p>
      <ul>
        <li>
          <strong>With restaurants and drivers</strong> — limited to the information needed to
          fulfil your order (e.g. delivery address, order details).
        </li>
        <li>
          <strong>With service providers</strong> — such as cloud storage (Supabase), payment
          processors, and analytics tools, under strict data-processing agreements.
        </li>
        <li>
          <strong>When required by law</strong> — in response to valid legal requests from
          authorities.
        </li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain your account data for as long as your account is active or as needed to provide
        services. Order history is retained for up to 3 years for legal and tax purposes. You may
        request deletion of your account at any time (see Section 6).
      </p>

      <h2>5. Cookies</h2>
      <p>
        We use essential cookies to maintain your session and authentication state. We do not use
        third-party advertising cookies. You can control cookie preferences through your browser
        settings, but disabling essential cookies may affect platform functionality.
      </p>

      <h2>6. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your account and associated data.</li>
        <li>Object to or restrict certain processing activities.</li>
        <li>Receive a copy of your data in a portable format.</li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href="mailto:privacy@quickbite.com">privacy@quickbite.com</a>. We will respond within 30
        days.
      </p>

      <h2>7. Security</h2>
      <p>
        We implement industry-standard security measures including HTTPS encryption, JWT-based
        authentication with role-separated secrets, and secure cloud storage via Supabase. No method
        of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        Our platform is not directed at children under 13. We do not knowingly collect personal
        information from children. If you believe a child has provided us with personal data, please
        contact us and we will delete it promptly.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant
        changes via email or a prominent notice on the platform. Your continued use after changes are
        posted constitutes acceptance.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For privacy-related queries, contact our Data Protection Officer at{" "}
        <a href="mailto:privacy@quickbite.com">privacy@quickbite.com</a>.
      </p>
    </article>
  );
}
