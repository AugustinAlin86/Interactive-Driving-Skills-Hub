// src/app/privacy/page.js
export const metadata = {
  title: "Privacy Policy | Bogdan’s Driving School",
  description:
    "How Bogdan’s Driving School collects, uses, and protects your personal data in compliance with UK GDPR.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Bogdan’s Driving School",
    description:
      "How Bogdan’s Driving School collects, uses, and protects your personal data in compliance with UK GDPR.",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-red-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-700 mt-2">Last updated: <strong>20 September 2025</strong></p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 prose prose-lg prose-red">
          <p>
            At <strong>Bogdan’s Driving School</strong> (“we”, “us”, “our”), we are committed to
            protecting your privacy and handling your personal information responsibly. This Privacy
            Policy explains how we collect, use, store, and protect your data when you use our
            website or contact us for driving lessons. We comply with the UK General Data Protection
            Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <h2 id="summary">Quick Summary</h2>
          <ul>
            <li>We collect contact details and booking info to provide lessons.</li>
            <li>We don’t sell your data. We only share it when necessary to deliver services (e.g., payments).</li>
            <li>You can access, correct, or delete your data by emailing <a href="mailto:bogdancirsan23@gmail.com">bogdancirsan23@gmail.com</a>.</li>
          </ul>

          <h2 id="collect">1. Information We Collect</h2>
          <ul>
            <li><strong>Contact details:</strong> name, email, phone number.</li>
            <li><strong>Lesson information:</strong> preferred dates/times, pickup area, course type.</li>
            <li><strong>Payment info (if applicable):</strong> processed securely by third-party providers; we do not store full card details.</li>
            <li><strong>Website usage data:</strong> basic analytics/cookies (see Cookies section).</li>
          </ul>

          <h2 id="use">2. How We Use Your Information</h2>
          <ul>
            <li>To respond to enquiries and manage lesson bookings/schedules.</li>
            <li>To send essential updates about lessons or services.</li>
            <li>To process payments securely (if used).</li>
            <li>To improve our website and services (legitimate interests).</li>
          </ul>

          <h2 id="legal-basis">3. Legal Bases (UK GDPR)</h2>
          <ul>
            <li><strong>Consent</strong> (e.g., when you submit a form).</li>
            <li><strong>Contract</strong> (to deliver lessons you book).</li>
            <li><strong>Legitimate interests</strong> (service improvement, record-keeping).</li>
          </ul>

          <h2 id="sharing">4. Sharing Your Information</h2>
          <p>
            We do not sell or rent your data. We may share limited data with trusted service
            providers solely to operate our services (e.g., payment processors, email providers,
            scheduling tools, website hosting/analytics). These providers are bound by contracts and
            their own privacy policies to protect your data.
          </p>

          <h2 id="storage">5. Data Storage, Security & Retention</h2>
          <p>
            We take reasonable technical and organisational measures to protect your information
            against unauthorised access, alteration, disclosure, or destruction. We keep personal
            data only as long as necessary for the purposes described above and to meet legal or
            accounting obligations. When no longer needed, we securely delete or anonymise it.
          </p>

          <h2 id="rights">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> the personal data we hold about you.</li>
            <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
            <li><strong>Erase</strong> your data (where applicable).</li>
            <li><strong>Restrict</strong> or <strong>object</strong> to certain processing.</li>
            <li><strong>Data portability</strong> (receive your data in a machine-readable format).</li>
            <li><strong>Withdraw consent</strong> where processing is based on consent.</li>
          </ul>
          <p>
            To exercise your rights, email <a href="mailto:bogdancirsan23@gmail.com">bogdancirsan23@gmail.com</a>.
            You also have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).
            See <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
          </p>

          <h2 id="cookies">7. Cookies & Analytics</h2>
          <p>
            Our website may use cookies or similar technologies to enhance functionality and measure
            performance. Where legally required, we show a cookie notice and obtain your consent. You
            can manage cookies via your browser settings. If we use analytics (e.g., privacy-friendly
            analytics or Google Analytics), they may collect anonymised usage data to help improve the
            site.
          </p>

          <h2 id="children">8. Children’s Data</h2>
          <p>
            Our services may be used by learners under 18 with consent from a parent/guardian. We do
            not knowingly collect more information than necessary to provide lessons, and we handle
            any such data with additional care.
          </p>

          <h2 id="transfers">9. International Data Transfers</h2>
          <p>
            If data is processed or stored outside the UK, we ensure appropriate safeguards are in
            place (e.g., UK-approved standard contractual clauses) to protect your information.
          </p>

          <h2 id="changes">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the new version here
            with an updated “Last updated” date. Significant changes may be notified via the website
            or by email if appropriate.
          </p>

          <h2 id="contact">11. Contact Us</h2>
          <p className="not-prose">
            <span className="block">Bogdan’s Driving School</span>
            <a className="block text-red-600 hover:text-red-800" href="mailto:bogdancirsan23@gmail.com">
              bogdancirsan23@gmail.com
            </a>
            <a className="block text-red-600 hover:text-red-800" href="tel:+447747531404">
              +44 7747 531404
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
