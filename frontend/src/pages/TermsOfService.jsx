import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl mb-2">Terms of Service</h1>
      <p className="text-stone-400 text-sm mb-2">Effective Date: May 23, 2026  |  Version 2.1</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-8 text-xs text-amber-800 leading-relaxed">
        PLEASE READ THESE TERMS CAREFULLY. BY CREATING AN ACCOUNT, LISTING AN ITEM, PURCHASING AN ITEM,
        OR OTHERWISE USING THE PLATFORM, YOU AGREE TO BE LEGALLY BOUND BY THESE TERMS.
        IF YOU DO NOT AGREE, DO NOT USE THE PLATFORM.
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-stone-700">

        <p>These Terms of Service ("Terms") are a binding agreement between you and TradeDiecast LLC,
        a Wyoming limited liability company ("TradeDiecast," "we," "us," or "our"), governing your
        use of the TradeDiecast website (tradediecast.com) and all related services (the "Platform").
        Your electronic acceptance — including by creating an account, checking a box, or continued
        use — constitutes your valid, binding agreement.</p>

        <Section title="1. Definitions">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>"Platform"</strong> — the TradeDiecast website, applications, APIs, and related services.</li>
            <li><strong>"User"</strong> — any individual or entity accessing or using the Platform.</li>
            <li><strong>"Buyer"</strong> — a User who purchases or attempts to purchase any item.</li>
            <li><strong>"Seller"</strong> — a User who lists or attempts to list items for sale.</li>
            <li><strong>"Transaction"</strong> — any completed sale between a Buyer and Seller through the Platform.</li>
            <li><strong>"Listing"</strong> — any item posted for sale on the Platform.</li>
            <li><strong>"Final Value Fee"</strong> — the commission charged on each completed Transaction.</li>
            <li><strong>"Dispute"</strong> — any disagreement between a Buyer and Seller regarding a Transaction.</li>
          </ul>
        </Section>

        <Section title="2. Eligibility and Acceptance">
          <Sub title="2.1 Age and Capacity">
            You must be at least 18 years of age and have the legal capacity to enter into binding
            contracts. By using the Platform, you represent and warrant that you meet these requirements.
          </Sub>
          <Sub title="2.2 Electronic Acceptance">
            Your electronic acceptance of these Terms constitutes a valid and legally binding agreement.
            TradeDiecast records the date, time, and version of these Terms at the time of acceptance.
          </Sub>
          <Sub title="2.3 Updates to Terms">
            TradeDiecast reserves the right to modify these Terms at any time. Updated Terms will be
            posted on the Platform with a revised effective date. Your continued use after posting
            constitutes acceptance. We encourage you to review these Terms periodically.
          </Sub>
        </Section>

        <Section title="3. Marketplace — TradeDiecast as Venue Only">
          <Sub title="3.1 Not a Party to Transactions">
            TradeDiecast is a marketplace venue only and is NOT a buyer or seller in any Transaction.
            TradeDiecast does not take title to or responsibility for any item listed. All Transactions
            are solely between Buyers and Sellers.
          </Sub>
          <Sub title="3.2 No Warranty on Items or Users">
            TradeDiecast makes no warranty regarding the quality, authenticity, condition, safety, or
            legality of any item, or the identity or conduct of any User. Buyers purchase at their own
            risk and are responsible for evaluating listings before purchasing.
          </Sub>
          <Sub title="3.3 Platform Availability">
            TradeDiecast may modify, suspend, or discontinue the Platform or any feature at any time,
            with or without notice, without liability.
          </Sub>
        </Section>

        <Section title="4. Accounts">
          <Sub title="4.1 Registration">
            You agree to provide accurate, complete, and current information when creating an account
            and to keep it updated. Providing false information is grounds for termination.
          </Sub>
          <Sub title="4.2 Account Security">
            You are responsible for maintaining the confidentiality of your credentials and for all
            activity under your account. Notify us at <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a> of
            any unauthorized use.
          </Sub>
          <Sub title="4.3 One Account Per User">
            Each User may maintain only one active account unless expressly authorized in writing.
            Operating multiple accounts to circumvent restrictions is prohibited.
          </Sub>
          <Sub title="4.4 Account Termination">
            TradeDiecast may suspend or terminate any account at any time for any reason, including
            Terms violations, fraudulent activity, or harmful conduct. Provisions that should survive
            termination — including indemnification and liability limitations — will survive.
          </Sub>
        </Section>

        <Section title="5. Fees and Payments">
          <Sub title="5.1 Final Value Fee — Subject to Change">
            TradeDiecast charges a Final Value Fee on each completed Transaction, currently
            <strong> 9.99%</strong> of the item sale price (excluding shipping). TradeDiecast reserves
            the right to change fees at any time. Fee changes will be posted on the Platform. Continued
            use as a Seller following a fee change constitutes acceptance.
          </Sub>
          <Sub title="5.2 No Listing Fees">
            There are currently no fees to list items. TradeDiecast may introduce listing fees in
            the future with reasonable notice.
          </Sub>
          <Sub title="5.3 Payment Processing">
            Payments are processed by Stripe, Inc. By using the Platform, you agree to Stripe's Terms
            of Service. TradeDiecast does not store card information and is not responsible for Stripe errors.
          </Sub>
          <Sub title="5.4 Seller Payouts">
            Seller payouts are generally processed within 2–14 business days following Transaction
            confirmation. TradeDiecast may withhold payouts for open Disputes, suspected fraud, account
            violations, negative balances, legal holds, or any circumstance where withholding is necessary
            to protect the Platform. Funds in a suspended account may be held for up to 180 days.
          </Sub>
          <Sub title="5.5 Chargebacks">
            If a Buyer initiates a chargeback, TradeDiecast may withhold the Seller's payout and
            recover disbursed amounts by offsetting future payouts. Sellers are responsible for
            chargebacks arising from their Transactions.
          </Sub>
          <Sub title="5.6 Negative Balances">
            Negative balances constitute a debt immediately due. TradeDiecast may offset against
            future payouts and pursue other lawful collection methods.
          </Sub>
          <Sub title="5.7 Non-Refundable Fees">
            Fees paid to TradeDiecast are generally non-refundable, except as required by applicable law.
          </Sub>
          <Sub title="5.8 Taxes">
            Sellers are solely responsible for all taxes on their sales. TradeDiecast will issue IRS
            Form 1099-K to Sellers meeting applicable thresholds. TradeDiecast may collect and remit
            sales tax as required by marketplace facilitator laws.
          </Sub>
        </Section>

        <Section title="6. Seller Obligations">
          <Sub title="6.1 Listing Accuracy">
            All Listings must be accurate, complete, and not misleading. Photos must be original images
            of the actual item. Condition must be accurately represented. All defects must be disclosed.
          </Sub>
          <Sub title="6.2 Prohibited Items">
            <p className="mb-2">The following may not be listed:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Counterfeit, replica, or fraudulently represented items</li>
              <li>Stolen goods or items obtained by illegal means</li>
              <li>Items infringing third-party intellectual property rights</li>
              <li>Items illegal under applicable law</li>
              <li>Any item TradeDiecast determines inappropriate in its sole discretion</li>
            </ul>
          </Sub>
          <Sub title="6.3 Listing Removal">
            TradeDiecast may remove or modify any Listing at any time for any reason without notice
            or compensation.
          </Sub>
          <Sub title="6.4 Shipping">
            Sellers must ship within their stated handling time (maximum 5 business days), provide
            tracking within 24 hours, and package items securely. Sellers bear responsibility for
            transit damage caused by inadequate packaging.
          </Sub>
          <Sub title="6.5 Fee Avoidance">
            Completing Transactions outside the Platform to avoid fees is a material breach, grounds
            for immediate termination, and may result in legal action to recover lost fees plus damages.
          </Sub>
        </Section>

        <Section title="7. Buyer Obligations">
          <Sub title="7.1 Purchase Commitment">
            Completing a purchase is a binding commitment to pay. Buyers may not cancel completed
            Transactions except as permitted by TradeDiecast policy.
          </Sub>
          <Sub title="7.2 Accurate Information">
            Buyers must provide accurate shipping and payment information. TradeDiecast and Sellers
            are not responsible for non-delivery due to an incorrect address.
          </Sub>
        </Section>

        <Section title="8. Prohibited Conduct">
          <p>All Users agree not to: use the Platform unlawfully; harass or threaten other Users;
          post false or deceptive content; manipulate ratings or reviews; use bots or scrapers without
          permission; attempt unauthorized system access; introduce malicious code; collect User data
          without consent; or engage in conduct TradeDiecast determines harmful to the Platform or its Users.</p>
        </Section>

        <Section title="9. Purchase Assurance Program">
          <Sub title="9.1 Voluntary Discretionary Program">
            TradeDiecast's Purchase Assurance Program is a voluntary, discretionary goodwill benefit.
            It is <strong>not</strong> a contract, guarantee, warranty, or insurance product, and does not
            create any legally binding obligation on TradeDiecast. TradeDiecast may modify, suspend,
            or discontinue the Program at any time without notice.
          </Sub>
          <Sub title="9.2 Eligibility">
            Claims must be submitted within 5 calendar days of delivery (or 12 days for non-arrivals),
            through the Platform's dispute interface, with supporting photographic evidence. The Buyer
            must not have initiated a chargeback for the same Transaction.
          </Sub>
          <Sub title="9.3 Covered Circumstances">
            TradeDiecast may consider claims where: (a) the item was not delivered and the carrier
            confirms non-delivery; (b) the item is materially different from its description; or
            (c) the item arrived with severe damage caused by inadequate packaging.
          </Sub>
          <Sub title="9.4 Exclusions">
            The Program does not cover: buyer's remorse; post-receipt damage; late submissions;
            off-Platform Transactions; accurately described items; carrier delays; or circumstances
            TradeDiecast determines ineligible. Filing a chargeback automatically voids a Program claim.
          </Sub>
          <Sub title="9.5 TradeDiecast's Final Authority">
            TradeDiecast's determination is final and binding. Available remedies may include a full
            or partial refund, Platform credit, or denial. By accepting any Program benefit, you
            release TradeDiecast from further claims arising from the same Transaction.
          </Sub>
          <Sub title="9.6 Chargeback Interaction">
            Initiating a chargeback while a Program claim is pending, or after receiving a Program
            benefit, violates these Terms. By submitting a Program claim you agree not to simultaneously
            pursue a chargeback for the same Transaction.
          </Sub>
          <Sub title="9.7 Fraud">
            Filing false claims is a Terms violation and grounds for account termination. TradeDiecast
            may share information about fraudulent claims with law enforcement and payment processors.
          </Sub>
          <Sub title="9.8 Liability Cap">
            <span className="uppercase text-xs tracking-wide text-stone-500">
              TradeDiecast's maximum liability in connection with the Program shall not exceed the
              lesser of the actual purchase price of the item or $250 per Transaction.
            </span>
          </Sub>
        </Section>

        <Section title="10. Content">
          <Sub title="10.1 License to TradeDiecast">
            By submitting content, you grant TradeDiecast an irrevocable, perpetual, worldwide,
            royalty-free license to use, reproduce, modify, distribute, and display that content
            for operating and promoting the Platform.
          </Sub>
          <Sub title="10.2 Content Standards">
            All content must be accurate, lawful, and non-infringing. TradeDiecast may remove any
            content at any time without notice.
          </Sub>
        </Section>

        <Section title="11. Intellectual Property">
          <p>The TradeDiecast name, logo, and Platform content are owned by TradeDiecast LLC and
          protected by intellectual property laws. No rights are granted by implication. For copyright
          claims, contact <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a>.</p>
        </Section>

        <Section title="12. Privacy">
          <p>Your use of the Platform is subject to TradeDiecast's{' '}
          <Link to="/privacy" className="text-brand-500 hover:underline">Privacy Policy</Link>,
          incorporated herein by reference.</p>
        </Section>

        <Section title="13. Disclaimer of Warranties">
          <p className="uppercase text-xs tracking-wide text-stone-500">
            The Platform is provided "as is" and "as available" without warranties of any kind,
            express or implied, including warranties of merchantability, fitness for a particular
            purpose, or non-infringement. TradeDiecast does not warrant that the Platform will be
            uninterrupted, error-free, or secure.
          </p>
        </Section>

        <Section title="14. Limitation of Liability">
          <Sub title="14.1 Exclusion of Damages">
            <p className="uppercase text-xs tracking-wide text-stone-500">
              To the maximum extent permitted by applicable law, TradeDiecast shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages, including
              loss of profits, data, or business opportunity, even if advised of the possibility
              of such damages.
            </p>
          </Sub>
          <Sub title="14.2 Liability Cap">
            <p className="uppercase text-xs tracking-wide text-stone-500">
              TradeDiecast's total aggregate liability for all claims shall not exceed the greater
              of: (a) the total fees paid by you in the six (6) months preceding the claim; or
              (b) one hundred dollars ($100.00).
            </p>
          </Sub>
          <Sub title="14.3 Transaction Liability">
            <p className="uppercase text-xs tracking-wide text-stone-500">
              TradeDiecast is not liable for any claim arising from a Transaction between a Buyer
              and Seller, including claims related to item quality, condition, non-delivery, or
              misrepresentation. All such claims are solely between Buyer and Seller.
            </p>
          </Sub>
        </Section>

        <Section title="15. Indemnification">
          <p>You agree to indemnify, defend, and hold harmless TradeDiecast LLC and its members,
          officers, employees, and agents from all claims, liabilities, damages, costs, and expenses
          (including attorneys' fees) arising from: your use of the Platform; your content or Listings;
          any Transaction you participate in; your violation of these Terms or applicable law; or your
          violation of any third-party right.</p>
        </Section>

        <Section title="16. Dispute Resolution">
          <Sub title="16.1 Informal Resolution">
            Before filing any legal proceeding, contact TradeDiecast at{' '}
            <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a>{' '}
            and attempt to resolve the dispute informally for at least 30 days.
          </Sub>
          <Sub title="16.2 Binding Arbitration">
            If informal resolution fails, disputes shall be resolved by binding individual arbitration
            under the American Arbitration Association Consumer Arbitration Rules. The award is final
            and binding. Either party may seek emergency injunctive relief in court to protect
            intellectual property or prevent irreparable harm.
          </Sub>
          <Sub title="16.3 Class Action Waiver">
            <p className="uppercase text-xs tracking-wide text-stone-500">
              All claims must be brought in your individual capacity and not as a plaintiff or class
              member in any class action, collective action, or representative proceeding. The
              arbitrator may not consolidate more than one person's claims.
            </p>
          </Sub>
          <Sub title="16.4 Governing Law">
            These Terms are governed by the laws of Wyoming. For disputes not subject to arbitration,
            you consent to jurisdiction in Wyoming state or federal courts.
          </Sub>
          <Sub title="16.5 Time Limit for Claims">
            Claims must be brought within one (1) year after the cause of action accrues, to the
            maximum extent permitted by applicable law.
          </Sub>
          <Sub title="16.6 Opt-Out Right">
            You may opt out of the arbitration agreement within 30 days of first accepting these Terms
            by emailing <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a>{' '}
            with subject "Arbitration Opt-Out."
          </Sub>
        </Section>

        <Section title="17. General Provisions">
          <Sub title="17.1 Entire Agreement">These Terms, the Privacy Policy, and Seller Agreement constitute the entire agreement between you and TradeDiecast.</Sub>
          <Sub title="17.2 Severability">If any provision is invalid, it will be modified minimally, and all others remain in force.</Sub>
          <Sub title="17.3 No Waiver">TradeDiecast's failure to enforce any provision is not a waiver.</Sub>
          <Sub title="17.4 Assignment">You may not assign rights without TradeDiecast's written consent. TradeDiecast may assign freely.</Sub>
          <Sub title="17.5 Communications">By creating an account, you consent to receive transactional, administrative, and promotional communications from TradeDiecast.</Sub>
        </Section>

        <Section title="18. Contact">
          <p>TradeDiecast LLC<br />
          Email: <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a><br />
          Website: <a href="https://tradediecast.com" className="text-brand-500 hover:underline">www.tradediecast.com</a><br />
          For legal notices mark communications: "LEGAL NOTICE — TERMS OF SERVICE"</p>
        </Section>

        <div className="border-t border-stone-100 pt-6 text-xs text-stone-400">
          Last Updated: May 23, 2026  |  Version 2.1  |  © {new Date().getFullYear()} TradeDiecast LLC. All rights reserved.
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-stone-900 mb-4 pb-2 border-b border-stone-100">{title}</h2>
      <div className="space-y-4 text-stone-600">{children}</div>
    </div>
  )
}

function Sub({ title, children }) {
  return (
    <div className="mt-3">
      <h3 className="font-semibold text-stone-800 text-sm mb-1.5">{title}</h3>
      <div className="space-y-1 text-stone-600">{children}</div>
    </div>
  )
}
