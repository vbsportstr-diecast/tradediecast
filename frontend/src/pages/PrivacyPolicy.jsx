import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl mb-2">Privacy Policy</h1>
      <p className="text-stone-400 text-sm mb-2">Effective Date: May 23, 2026  |  Version 2.0</p>
      <p className="text-stone-500 text-sm mb-8 leading-relaxed">
        PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY CREATING AN ACCOUNT, MAKING A PURCHASE,
        OR OTHERWISE USING THE TRADEDIECAST PLATFORM IN ANY WAY, YOU EXPRESSLY CONSENT TO THE
        COLLECTION, USE, STORAGE, PROCESSING, SHARING, AND DISCLOSURE OF YOUR INFORMATION AS
        DESCRIBED IN THIS POLICY IN ITS ENTIRETY, INCLUDING ALL FUTURE AMENDMENTS.
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-stone-700">

        <p>TradeDiecast LLC ("TradeDiecast," "we," "us," or "our") operates the TradeDiecast
        marketplace platform at tradediecast.com and all associated applications and services
        (the "Platform"). This Privacy Policy describes what information we collect about you,
        how we use, store, and share it, your rights, and how we protect it. This Policy is
        incorporated into and forms part of our Terms of Service.</p>

        {/* 1 */}
        <Section title="1. Information We Collect">
          <p>TradeDiecast collects the broadest range of information necessary to operate,
          improve, and grow the Platform and our business. We collect information in three ways:
          information you provide directly, information collected automatically, and information
          received from third parties.</p>

          <Sub title="1.1 Information You Provide Directly">
            <Sub title="1.1(a) Account and Identity Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Full legal name</li>
                <li>Email address</li>
                <li>Username and password</li>
                <li>Date of birth and age</li>
                <li>Gender (if voluntarily provided)</li>
                <li>Profile photograph or avatar</li>
                <li>Personal biography or description</li>
                <li>Government-issued identification information, where required for identity
                verification or tax compliance</li>
              </ul>
            </Sub>
            <Sub title="1.1(b) Contact and Location Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Home address, mailing address, and shipping address (including street, city,
                state, ZIP code, and country)</li>
                <li>Phone number (mobile, home, or business)</li>
                <li>Precise geolocation, where you grant permission</li>
                <li>Approximate location derived from IP address</li>
                <li>Time zone</li>
              </ul>
            </Sub>
            <Sub title="1.1(c) Financial and Payment Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Bank account details (routing and account number) for Seller payouts,
                processed through Stripe</li>
                <li>Payment card information for purchases, processed and tokenized by Stripe
                (TradeDiecast does not store raw card numbers or CVV codes)</li>
                <li>Transaction history including purchase amounts, dates, and items</li>
                <li>Payout history and amounts received</li>
                <li>Tax identification number (TIN), EIN, or Social Security Number (SSN)
                where required for IRS reporting</li>
                <li>Financial institution name and account type</li>
              </ul>
            </Sub>
            <Sub title="1.1(d) Listing and Transaction Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Item descriptions, photographs, condition assessments, and pricing</li>
                <li>Purchase history and items bought or sold</li>
                <li>Shipping addresses provided for Transactions</li>
                <li>Tracking numbers and shipping carrier information</li>
                <li>Offers made or received</li>
                <li>Dispute submissions and supporting documentation</li>
              </ul>
            </Sub>
            <Sub title="1.1(e) Communications and Preferences">
              <ul className="list-disc pl-5 space-y-1">
                <li>Messages sent through the Platform's messaging system</li>
                <li>Reviews and ratings submitted</li>
                <li>Customer support communications</li>
                <li>Survey responses and feedback</li>
                <li>Communication preferences and notification settings</li>
                <li>Wishlist and saved/watched Listings</li>
              </ul>
            </Sub>
            <Sub title="1.1(f) Legal and Compliance Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Records of your acceptance of our Terms of Service, Privacy Policy, and
                Seller Agreement, including timestamps and version numbers</li>
                <li>Pre-purchase acknowledgment records</li>
                <li>Refund release records</li>
                <li>Any information provided in connection with Disputes or legal proceedings</li>
              </ul>
            </Sub>
          </Sub>

          <Sub title="1.2 Information Collected Automatically">
            <Sub title="1.2(a) Device and Technical Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address (used to infer approximate geographic location)</li>
                <li>Device type, model, and manufacturer</li>
                <li>Operating system and version</li>
                <li>Browser type and version</li>
                <li>Screen resolution and display settings</li>
                <li>Unique device identifiers (UDID, IDFA, GAID, or similar)</li>
                <li>Mobile network information and carrier</li>
              </ul>
            </Sub>
            <Sub title="1.2(b) Usage and Behavioral Data">
              <ul className="list-disc pl-5 space-y-1">
                <li>Pages and features accessed, including timestamps and duration</li>
                <li>Search queries entered on the Platform</li>
                <li>Listings viewed, clicked, saved, or purchased</li>
                <li>Browsing patterns and navigation paths</li>
                <li>Interactions with emails and push notifications</li>
                <li>Referral source and exit behavior</li>
                <li>Time spent on pages</li>
              </ul>
            </Sub>
            <Sub title="1.2(c) Cookies, Pixels, and Tracking Technologies">
              <p className="mb-2">We use cookies, web beacons, pixel tags, local storage, SDKs,
              and other tracking technologies. We use these for:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Keeping you logged in and maintaining your session</li>
                <li>Remembering your preferences and saved items</li>
                <li>Understanding how you use the Platform</li>
                <li>Measuring effectiveness of communications and marketing</li>
                <li>Detecting and preventing fraud</li>
                <li>Delivering targeted advertising on and off the Platform</li>
                <li>Building profiles for targeted advertising and personalization</li>
              </ul>
              <p>Cookie categories: <strong>Strictly necessary</strong> (cannot be disabled),
              <strong> Analytics</strong> (usage patterns), <strong>Functionality</strong>
              (preferences), <strong>Advertising</strong> (targeted ads), <strong>Social
              media</strong> (sharing). Your continued use of the Platform constitutes consent
              to our use of cookies as described.</p>
            </Sub>
          </Sub>

          <Sub title="1.3 Information from Third Parties">
            <ul className="list-disc pl-5 space-y-1">
              <li>Stripe — transaction data, payment status, identity verification, fraud signals</li>
              <li>Cloudinary — image metadata including EXIF data (which may contain location data
              embedded in uploaded photos)</li>
              <li>Shipping carriers — delivery confirmation and tracking</li>
              <li>Data brokers and enrichment services — we may purchase data about you from
              third-party providers to supplement our understanding of our users</li>
              <li>Social media platforms — if you interact with our accounts or use social
              login features</li>
              <li>Publicly available sources — public social media profiles, public records,
              and other publicly accessible sources</li>
              <li>Other Users — reviews, ratings, and reports that reference you</li>
            </ul>
          </Sub>

          <Sub title="1.4 Inferred and Derived Information">
            <p className="mb-2">We may generate and infer additional information about you, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Interests and collecting habits inferred from browsing and purchase behavior</li>
              <li>Estimated demographics including age range and gender</li>
              <li>Creditworthiness and risk indicators from transaction patterns</li>
              <li>Fraud risk scores and trust indicators</li>
              <li>Seller performance scores and reliability indicators</li>
              <li>Predicted future purchase behavior and product interests</li>
            </ul>
          </Sub>
        </Section>

        {/* 2 */}
        <Section title="2. How We Use Your Information">
          <p className="mb-4">TradeDiecast uses the information we collect for a broad range of
          purposes. By using the Platform, you consent to all uses described in this Section.</p>

          <Sub title="2.1 Operating the Platform">
            <ul className="list-disc pl-5 space-y-1">
              <li>Creating and maintaining your account</li>
              <li>Processing Transactions and distributing Seller payouts</li>
              <li>Displaying your public profile, Listings, and reviews</li>
              <li>Sharing your shipping address with Sellers for order fulfillment</li>
              <li>Processing Disputes and Purchase Assurance Program claims</li>
              <li>Enforcing our Terms of Service and policies</li>
            </ul>
          </Sub>
          <Sub title="2.2 Personalizing Your Experience">
            <ul className="list-disc pl-5 space-y-1">
              <li>Personalizing content, Listings, and features based on your interests and history</li>
              <li>Recommending Listings, brands, and sellers</li>
              <li>Customizing pricing, offers, and promotions displayed to you</li>
            </ul>
          </Sub>
          <Sub title="2.3 Communications">
            <ul className="list-disc pl-5 space-y-1">
              <li>Transactional communications: order confirmations, shipping updates, payment
              receipts, Dispute notifications</li>
              <li>Administrative communications: account notices, security alerts, policy updates</li>
              <li>Promotional and marketing communications (subject to opt-out rights in Section 6)</li>
              <li>SMS or text message communications where you have provided required consent</li>
              <li>Push notifications where you have enabled them</li>
              <li>Market research and user feedback surveys</li>
            </ul>
          </Sub>
          <Sub title="2.4 Analytics and Product Development">
            <ul className="list-disc pl-5 space-y-1">
              <li>Analyzing usage patterns to improve the Platform</li>
              <li>Developing new features, products, and services</li>
              <li>Testing and evaluating new features and algorithms</li>
              <li>Generating aggregated and de-identified data for business reporting</li>
            </ul>
          </Sub>
          <Sub title="2.5 Safety, Security, and Fraud Prevention">
            <ul className="list-disc pl-5 space-y-1">
              <li>Detecting and preventing fraudulent, illegal, or abusive activity</li>
              <li>Verifying User and Seller identity</li>
              <li>Monitoring for and addressing security threats</li>
              <li>Enforcing our policies and investigating violations</li>
            </ul>
          </Sub>
          <Sub title="2.6 Advertising and Marketing">
            <ul className="list-disc pl-5 space-y-1">
              <li>Delivering targeted advertising on the Platform based on your interests and behavior</li>
              <li>Delivering targeted advertising on third-party websites through advertising networks</li>
              <li>Building advertising audiences and profiles for use on third-party platforms</li>
              <li>Measuring advertising campaign effectiveness</li>
              <li>Sharing your information with advertising partners to enable targeted advertising
              — this may constitute a "sale" or "sharing" under applicable state privacy laws.
              See Section 6 for opt-out rights.</li>
            </ul>
          </Sub>
          <Sub title="2.7 Legal and Compliance">
            <ul className="list-disc pl-5 space-y-1">
              <li>Complying with applicable laws and legal process</li>
              <li>Issuing IRS Form 1099-K and other required tax documents</li>
              <li>Responding to lawful government and law enforcement requests</li>
              <li>Establishing, exercising, or defending legal claims</li>
              <li>Maintaining records required by applicable law</li>
            </ul>
          </Sub>
          <Sub title="2.8 Future Uses">
            <p>WE RESERVE THE RIGHT TO USE ALL INFORMATION WE COLLECT FOR ANY LAWFUL BUSINESS
            PURPOSE, INCLUDING PURPOSES WE HAVE NOT SPECIFICALLY IDENTIFIED AT THE TIME OF
            COLLECTION, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW. By using the Platform,
            you consent to such future uses to the maximum extent permitted.</p>
          </Sub>
        </Section>

        {/* 3 */}
        <Section title="3. How We Share Your Information">
          <Sub title="3.1 We Do Not Sell Contact Information to Marketers">
            <p>TradeDiecast does not sell your name, email address, or contact information to
            third-party direct marketers for their own independent marketing. We do share
            information broadly for the other purposes described below.</p>
          </Sub>
          <Sub title="3.2 With Other Users">
            <ul className="list-disc pl-5 space-y-1">
              <li>Your public profile (username, rating, sales history, member since date) is
              visible to all Platform users and may be indexed by search engines</li>
              <li>Your Listings are publicly visible</li>
              <li>Your shipping address is shared with Sellers solely to fulfill your orders</li>
              <li>Reviews and ratings you submit are publicly displayed</li>
            </ul>
          </Sub>
          <Sub title="3.3 With Service Providers">
            <ul className="list-disc pl-5 space-y-1">
              <li>Stripe — payment processing, identity verification, fraud prevention</li>
              <li>Cloudinary — image storage and delivery</li>
              <li>Supabase — database infrastructure and authentication</li>
              <li>Email, SMS, and push notification providers</li>
              <li>Analytics providers</li>
              <li>Fraud prevention and identity verification services</li>
              <li>Customer support platforms</li>
              <li>Cloud hosting and infrastructure providers</li>
              <li>Legal, accounting, and professional services firms</li>
              <li>Any other vendors engaged to provide services in connection with the Platform</li>
            </ul>
          </Sub>
          <Sub title="3.4 With Advertising and Analytics Partners">
            <p>We may share or make available your information — including behavioral data,
            inferred interests, and device identifiers — with advertising networks and marketing
            platforms for targeted advertising. This may constitute a "sale" or "sharing" under
            applicable state privacy laws. See Section 6 for opt-out rights.</p>
          </Sub>
          <Sub title="3.5 For Legal and Safety Purposes">
            <p>We may disclose your information to comply with applicable law, enforce our Terms,
            detect or prevent fraud, protect the rights or safety of TradeDiecast or Users,
            or respond to emergencies.</p>
          </Sub>
          <Sub title="3.6 In Business Transactions">
            <p>In a merger, acquisition, financing, or sale of assets, your information may be
            transferred to the acquiring party. You acknowledge and agree that such transfers may
            occur and any acquirer may continue to use your information as described in this Policy.</p>
          </Sub>
          <Sub title="3.7 Aggregated and De-Identified Data">
            <p>We may share aggregated or de-identified information — which cannot reasonably be
            used to identify you — with third parties for any purpose without restriction.</p>
          </Sub>
        </Section>

        {/* 4 */}
        <Section title="4. Data Retention">
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Account information: life of account plus up to 7 years following closure</li>
            <li>Transaction records: up to 7 years for tax and legal compliance</li>
            <li>Legal acknowledgment records (ToS, checkout acknowledgments, refund releases):
            <strong> indefinitely</strong>, as legal evidence of your agreements</li>
            <li>Dispute and Purchase Assurance Program records: up to 7 years</li>
            <li>Communications: up to 3 years, or longer if relevant to legal proceedings</li>
            <li>Fraud prevention data: indefinitely</li>
            <li>Automatically collected data: up to 26 months in identifiable form</li>
          </ul>
          <p className="uppercase text-xs tracking-wide text-stone-500">
            TradeDiecast reserves the right to retain any information for longer periods where
            we determine retention is necessary for any lawful business purpose, including legal
            defense, fraud prevention, or compliance. De-identified or aggregated information
            may be retained indefinitely without restriction.
          </p>
        </Section>

        {/* 5 */}
        <Section title="5. Data Security">
          <p className="mb-3">We implement reasonable technical, administrative, and physical
          security measures including TLS/SSL encryption in transit, encryption at rest,
          access controls, and PCI-DSS compliant payment processing through Stripe.</p>
          <p className="uppercase text-xs tracking-wide text-stone-500">
            No security measures are perfect or impenetrable. TradeDiecast cannot guarantee
            the security of your information. Any information you transmit is done at your own
            risk. TradeDiecast's liability for any data breach is limited as set forth in the
            Terms of Service.
          </p>
        </Section>

        {/* 6 */}
        <Section title="6. Your Rights and Choices">
          <Sub title="6.1 Access, Correction, and Deletion">
            <p>You may request access to, correction of, or deletion of your personal information
            by contacting <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a>.
            We will respond within 30–45 days. We may decline requests that are manifestly
            unfounded, require deletion of legally required records, would impair fraud detection,
            or conflict with our legitimate business interests.</p>
          </Sub>
          <Sub title="6.2 Marketing Opt-Out">
            <p>Opt out of promotional emails by clicking "Unsubscribe" in any marketing email
            or contacting us. Opt out of SMS by replying STOP. You will continue to receive
            transactional and administrative communications necessary to operate your account.</p>
          </Sub>
          <Sub title="6.3 Cookies and Advertising Opt-Out">
            <p>Control non-essential cookies through your browser settings. Opt out of
            interest-based advertising through the Digital Advertising Alliance
            (<a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">optout.aboutads.info</a>)
            or Network Advertising Initiative
            (<a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">optout.networkadvertising.org</a>).
            Opting out of interest-based advertising does not mean you will stop seeing ads.</p>
          </Sub>
          <Sub title="6.4 California Residents — CCPA/CPRA Rights">
            <p className="mb-2">California residents have the following rights:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Right to Know</strong> — categories and specific pieces of personal
              information collected, sources, purposes, and third parties with whom we share</li>
              <li><strong>Right to Delete</strong> — subject to exceptions</li>
              <li><strong>Right to Correct</strong> — inaccurate personal information</li>
              <li><strong>Right to Opt-Out of Sale/Sharing</strong> — for cross-context
              behavioral advertising. Contact <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a> with
              subject "California Privacy — Do Not Sell or Share"</li>
              <li><strong>Right to Limit Sensitive Data Use</strong> — precise geolocation,
              financial information, and other sensitive categories</li>
              <li><strong>Right to Non-Discrimination</strong> — we will not discriminate
              for exercising your rights</li>
            </ul>
          </Sub>
          <Sub title="6.5 Other State Privacy Rights">
            <p>Residents of Virginia, Colorado, Connecticut, Utah, Texas, and other states
            with comprehensive privacy laws may have similar rights. Contact
            <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline ml-1">hello@tradediecast.com</a> with
            your state of residence and the right you wish to exercise.</p>
          </Sub>
          <Sub title="6.6 Limitations on Rights">
            <p className="uppercase text-xs tracking-wide text-stone-500">
              All rights are subject to: applicable law limitations; legal retention requirements;
              fraud prevention and Terms enforcement needs; and TradeDiecast's reasonable
              interpretation of applicable law, which is made in our sole judgment.
            </p>
          </Sub>
        </Section>

        {/* 7 */}
        <Section title="7. Sensitive Information">
          <p>By voluntarily providing sensitive information — including date of birth, gender,
          precise geolocation, government ID numbers, financial account details, and tax
          identification numbers — you explicitly consent to our collection and use of such
          information for the purposes described in this Policy. We collect sensitive information
          only where necessary to provide the Platform or where you choose to provide it.</p>
        </Section>

        {/* 8 */}
        <Section title="8. Children's Privacy">
          <p>The Platform is strictly intended for individuals 18 years of age or older. We do
          not knowingly collect personal information from anyone under 18. If you are under 18,
          you may not use the Platform. Contact <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a> if
          you believe we have collected information from a minor.</p>
        </Section>

        {/* 9 */}
        <Section title="9. International Users and Data Transfers">
          <p className="uppercase text-xs tracking-wide text-stone-500">
            TradeDiecast is operated from the United States. By using the Platform from outside
            the United States, you explicitly consent to the transfer, storage, and processing
            of your information in the United States and any other country in which we or our
            service providers operate, and you agree that such transfers comply with this Policy.
          </p>
        </Section>

        {/* 10 */}
        <Section title="10. Third-Party Links and Services">
          <p>The Platform may contain links to third-party websites and services. This Policy
          does not apply to those third parties. TradeDiecast is not responsible for the privacy
          practices of any third party. We encourage you to review third-party privacy policies
          before providing any information.</p>
        </Section>

        {/* 11 */}
        <Section title="11. Cookies — Detailed Information">
          <p>We use session cookies (expire when you close your browser) and persistent cookies
          (remain until deleted). We also use web beacons, pixel tags, local storage objects,
          and similar technologies for session maintenance, preference storage, behavioral
          tracking, performance measurement, advertising targeting, fraud detection, and A/B
          testing. Third-party analytics and advertising partners may also set cookies on your
          device when you visit the Platform. Your continued use of the Platform constitutes
          consent to our use of cookies.</p>
        </Section>

        {/* 12 */}
        <Section title="12. Do Not Track and Global Privacy Control">
          <p>The Platform does not change its data collection practices in response to browser
          "Do Not Track" signals, as no industry standard exists. We honor Global Privacy Control
          (GPC) signals from California residents as a request to opt out of the sale or sharing
          of personal information, as required by California law. We may not honor GPC signals
          from residents of other states where not legally required.</p>
        </Section>

        {/* 13 */}
        <Section title="13. Changes to This Privacy Policy">
          <p className="uppercase text-xs tracking-wide text-stone-500">
            TradeDiecast reserves the absolute and unconditional right to modify, amend, replace,
            or restate this Privacy Policy at any time, for any reason, in its sole discretion.
            Changes are effective immediately upon posting. Your continued use of the Platform
            after any change constitutes your irrevocable acceptance of the revised Policy and
            consent to collection and use of your information as described therein. It is your
            sole responsibility to review this Policy periodically. TradeDiecast has no obligation
            to individually notify you of any changes.
          </p>
        </Section>

        {/* 14 */}
        <Section title="14. Contact Information">
          <p className="mb-3">For questions, requests, or concerns regarding this Privacy Policy:</p>
          <p className="mb-1"><strong>TradeDiecast LLC — Privacy Officer</strong></p>
          <p className="mb-1">Email: <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a></p>
          <p className="mb-4">Website: <a href="https://tradediecast.com" className="text-brand-500 hover:underline">www.tradediecast.com</a></p>
          <ul className="list-disc pl-5 space-y-1 text-stone-500">
            <li>California privacy requests: subject line "California Privacy Request"</li>
            <li>Other state requests: subject line "Privacy Rights Request — [Your State]"</li>
            <li>Data security concerns: subject line "Data Security Concern"</li>
          </ul>
        </Section>

        <div className="border-t border-stone-100 pt-6 text-xs text-stone-400">
          Last Updated: May 23, 2026  |  Version 2.0  |  © {new Date().getFullYear()} TradeDiecast LLC. All rights reserved.
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-stone-900 mb-4 pb-2 border-b border-stone-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Sub({ title, children }) {
  return (
    <div className="mt-3">
      <h3 className="font-semibold text-stone-800 text-sm mb-2">{title}</h3>
      <div className="space-y-2 text-stone-600">{children}</div>
    </div>
  )
}
