import { Link } from 'react-router-dom'

export default function SellerAgreement() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl mb-2">Seller Agreement</h1>
      <p className="text-stone-400 text-sm mb-2">Effective Date: May 23, 2026  |  Version 2.1</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-8 text-xs text-amber-800 leading-relaxed">
        PLEASE READ THIS AGREEMENT CAREFULLY BEFORE LISTING ANY ITEM. BY CREATING A LISTING OR
        CONTINUING TO USE THE PLATFORM AS A SELLER, YOU AGREE TO BE BOUND BY THIS AGREEMENT,
        THE TERMS OF SERVICE, AND THE PRIVACY POLICY.
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-stone-700">

        <p>This Seller Agreement governs your participation as a Seller on TradeDiecast. It supplements
        the <Link to="/terms" className="text-brand-500 hover:underline">Terms of Service</Link>, which
        also apply to all Sellers. In the event of conflict, the Terms of Service control.</p>

        {/* Fee highlight box */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <p className="font-semibold text-stone-800 mb-3">Fee summary</p>
          <div className="space-y-2 text-stone-600">
            <div className="flex justify-between text-sm"><span>Final Value Fee</span><strong>9.99% of item price</strong></div>
            <div className="flex justify-between text-sm"><span>Listing fee</span><strong>Free</strong></div>
            <div className="flex justify-between text-sm"><span>Purchase Assurance claim admin fee</span><strong>$25.00 per claim</strong></div>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-200 text-xs text-stone-500">
            Example: Item sold for $100 → Fee $9.99 → Stripe ~$3.20 → You receive ~$86.81
          </div>
        </div>

        <Section title="1. Seller Eligibility">
          <Sub title="1.1 Requirements">
            <ul className="list-disc pl-5 space-y-1">
              <li>At least 18 years of age</li>
              <li>Valid TradeDiecast account in good standing</li>
              <li>Valid US bank account for Stripe payouts</li>
              <li>Completion of all identity and tax verification required by TradeDiecast and Stripe</li>
              <li>Compliance with all applicable laws governing the sale of goods</li>
              <li>Not previously permanently banned from TradeDiecast</li>
            </ul>
          </Sub>
          <Sub title="1.2 Ongoing Representations">
            By maintaining a seller account, you continuously represent that all information provided
            is accurate, that you have authority to enter into this Agreement, and that your use of
            the Platform does not violate any agreement or applicable law.
          </Sub>
          <Sub title="1.3 Verification">
            TradeDiecast may verify your information and require additional documentation at any time.
            Failure to cooperate within 5 business days may result in account suspension.
          </Sub>
          <Sub title="1.4 Stripe Connect">
            Sellers must connect a valid Stripe account and complete Stripe's identity verification.
            TradeDiecast is not responsible for Stripe's actions or decisions regarding your account.
          </Sub>
        </Section>

        <Section title="2. Listing Requirements">
          <Sub title="2.1 Seller's Responsibility">
            Sellers bear sole responsibility for every aspect of their Listings. TradeDiecast does
            not review or guarantee any Listing.
          </Sub>
          <Sub title="2.2 Accuracy Standards">
            <ul className="list-disc pl-5 space-y-1">
              <li>Title must accurately identify brand, model, scale, year, and condition</li>
              <li>Description must be truthful and disclose all defects, damage, missing parts, repairs, or reproduction components</li>
              <li>All photographs must be original images of the actual item — stock photos are prohibited</li>
              <li>Photo editing that materially alters the item's appearance is prohibited</li>
              <li>Listings may not contain external links, contact information, or off-platform solicitations</li>
            </ul>
          </Sub>
          <Sub title="2.3 Condition Categories">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Mint in Box (MIB):</strong> Perfect condition, complete original packaging with all inserts and accessories</li>
              <li><strong>Mint Loose:</strong> Perfect condition, no packaging, zero defects of any kind</li>
              <li><strong>Used — Excellent:</strong> Minimal wear, very minor surface scratches only, no paint loss</li>
              <li><strong>Used — Good:</strong> Visible wear, scratches or light paint loss, all major components intact</li>
              <li><strong>Used — Fair:</strong> Significant wear, notable damage, or missing components — must be fully described</li>
            </ul>
            <p className="mt-2 text-stone-500">When in doubt, assign the lower grade. TradeDiecast may reclassify any Listing's condition at any time.</p>
          </Sub>
          <Sub title="2.4 Prohibited Listings">
            <ul className="list-disc pl-5 space-y-1">
              <li>Counterfeit, replica, or fraudulently represented items</li>
              <li>Stolen goods or items obtained by illegal means</li>
              <li>Items infringing third-party intellectual property rights</li>
              <li>Items whose sale is prohibited by applicable law</li>
              <li>Items without clear legal title</li>
              <li>Any item TradeDiecast determines inappropriate in its sole discretion</li>
            </ul>
          </Sub>
          <Sub title="2.5 TradeDiecast's Rights Over Listings">
            TradeDiecast may remove, modify, reclassify, or decline to display any Listing at any
            time, for any reason, without notice, liability, or compensation. TradeDiecast may also
            limit active Listings per account and adjust search visibility.
          </Sub>
          <Sub title="2.6 Additional Restrictions">
            <ul className="list-disc pl-5 space-y-1">
              <li>No duplicate Listings for the same item simultaneously</li>
              <li>No listing items you do not currently own — drop-shipping prohibited without written approval</li>
              <li>No misleading keywords or irrelevant search tags</li>
              <li>No consignment selling without prior written approval</li>
            </ul>
          </Sub>
        </Section>

        <Section title="3. Fees and Financial Terms">
          <Sub title="3.1 Final Value Fee — Subject to Change">
            TradeDiecast charges a Final Value Fee of <strong>9.99%</strong> of the item sale price
            (excluding shipping) on each completed Transaction. TradeDiecast may change this fee
            at any time. Changes will be posted on the Platform. Continued use as a Seller after
            a fee change constitutes acceptance.
          </Sub>
          <Sub title="3.2 Additional Fees">
            <ul className="list-disc pl-5 space-y-1">
              <li>$25.00 administrative fee per Purchase Assurance Program claim processed against the Seller</li>
              <li>Chargeback fees and payment processor fees on disputed Transactions</li>
              <li>Listing fees, if introduced in the future</li>
            </ul>
          </Sub>
          <Sub title="3.3 Non-Refundable Fees">
            All fees paid to TradeDiecast are non-refundable, except as required by applicable law.
          </Sub>
          <Sub title="3.4 Payout Schedule and Withholding">
            Payouts are generally processed within 2–14 business days. TradeDiecast may withhold,
            delay, or offset payouts for open Disputes, suspected fraud, account violations, negative
            balances, or legal holds. Funds in suspended accounts may be held up to 180 days.
          </Sub>
          <Sub title="3.5 Negative Balances">
            Negative balances constitute a debt immediately due. TradeDiecast may offset against
            future payouts, charge payment methods on file, refer to collections, and report to
            credit agencies. You agree to pay reasonable collection costs.
          </Sub>
          <Sub title="3.6 Chargeback Liability">
            Sellers bear full financial responsibility for chargebacks. TradeDiecast may withhold
            payouts and reverse disbursements. TradeDiecast has no obligation to contest chargebacks.
            Chargeback rates exceeding 1% in any 60-day period may result in suspension.
          </Sub>
          <Sub title="3.7 Taxes">
            Sellers are solely responsible for all taxes on sales. TradeDiecast will issue IRS
            Form 1099-K to Sellers meeting applicable thresholds. Sellers without valid TINs may
            be subject to backup withholding. TradeDiecast has no liability for Seller tax obligations.
          </Sub>
          <Sub title="3.8 Marketplace Facilitator Tax">
            Where legally required, TradeDiecast will collect and remit sales tax on Sellers' behalf,
            relieving Sellers of that obligation for those Transactions.
          </Sub>
        </Section>

        <Section title="4. Transaction Obligations">
          <Sub title="4.1 Binding Sale">
            A completed purchase creates a binding contract between Buyer and Seller. Cancellations
            exceeding 2% of Transactions in any 90-day period may result in account action.
          </Sub>
          <Sub title="4.2 Shipping Requirements">
            <ul className="list-disc pl-5 space-y-1">
              <li>Ship within stated handling time (maximum 5 business days)</li>
              <li>Use a tracking-enabled carrier; signature confirmation recommended for items over $50</li>
              <li>Upload tracking information within 24 hours of shipment</li>
              <li>Ship only to the address provided through the Platform</li>
              <li>Bear responsibility for transit damage from inadequate packaging</li>
            </ul>
          </Sub>
          <Sub title="4.3 Packaging Standards">
            <ul className="list-disc pl-5 space-y-1">
              <li>Wrap every item individually in bubble wrap (minimum 3/16" bubble)</li>
              <li>Use a rigid cardboard box — poly mailers are prohibited</li>
              <li>Use void fill to prevent any item movement</li>
              <li>Double-box all items over $100 in value</li>
            </ul>
            <p className="mt-2 text-stone-500">Sellers who ship with inadequate packaging accept full financial responsibility for resulting refunds.</p>
          </Sub>
          <Sub title="4.4 Communication">
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to Buyer messages within 48 hours</li>
              <li>Respond to TradeDiecast communications within 24 hours</li>
              <li>All communications must use the Platform's messaging system</li>
              <li>Maintain professional and respectful communications at all times</li>
            </ul>
          </Sub>
          <Sub title="4.5 Performance Standards">
            <p className="mb-2">Account action may result if any threshold is exceeded:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dispute rate: &gt;3% in any rolling 90-day period</li>
              <li>Chargeback rate: &gt;1% in any rolling 60-day period</li>
              <li>Cancellation rate: &gt;2% in any rolling 90-day period</li>
              <li>Late shipment rate: &gt;5% in any rolling 90-day period</li>
              <li>Average rating below 4.0 on a rolling 90-day basis</li>
            </ul>
            <p className="mt-2 text-stone-500">TradeDiecast may modify thresholds at any time. TradeDiecast's calculation of metrics is final.</p>
          </Sub>
        </Section>

        <Section title="5. Prohibited Conduct">
          <Sub title="5.1 Fee Avoidance">
            Soliciting Buyers to transact outside the Platform or completing Platform-initiated
            Transactions off-Platform is a material breach, grounds for immediate termination,
            forfeiture of pending payouts, and legal action to recover lost fees plus damages.
          </Sub>
          <Sub title="5.2 Fraudulent Conduct">
            <ul className="list-disc pl-5 space-y-1">
              <li>Shipping empty packages, wrong items, or significant substitutes</li>
              <li>Shill bidding or using alternate accounts to manipulate ratings</li>
              <li>False claims about item provenance, rarity, or authenticity</li>
              <li>Misrepresenting identity or seller history</li>
              <li>Using the Platform to launder money or facilitate financial crime</li>
            </ul>
          </Sub>
          <Sub title="5.3 Multiple Account Abuse">
            <ul className="list-disc pl-5 space-y-1">
              <li>Operating more than one seller account without written approval</li>
              <li>Creating accounts to circumvent suspensions or bans</li>
              <li>Using or allowing others to use your credentials</li>
            </ul>
          </Sub>
          <Sub title="5.4 Platform Abuse">
            <ul className="list-disc pl-5 space-y-1">
              <li>Using bots or automation without written permission</li>
              <li>Artificially inflating view or engagement metrics</li>
              <li>Submitting false reports against other Users</li>
              <li>Attempting unauthorized access to Platform systems</li>
            </ul>
          </Sub>
        </Section>

        <Section title="6. Disputes and Purchase Assurance Program">
          <Sub title="6.1 Seller Obligations in Disputes">
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to Dispute notifications within 24 hours</li>
              <li>Cooperate fully and provide all requested evidence</li>
              <li>Failure to respond results in automatic resolution in the Buyer's favor</li>
              <li>Do not contact Buyers directly about pending Disputes without TradeDiecast approval</li>
            </ul>
          </Sub>
          <Sub title="6.2 TradeDiecast's Authority">
            TradeDiecast's determination on any Dispute is final and binding. Where a refund is
            issued, the amount plus the $25 administrative fee will be deducted from the Seller's
            payout. Sellers release TradeDiecast from all claims arising from Dispute determinations.
          </Sub>
          <Sub title="6.3 Returns">
            Any return policy stated in a Listing must be honored. Where a return is due to Seller
            error, a prepaid return label must be provided within 24 hours of return authorization.
          </Sub>
        </Section>

        <Section title="7. Intellectual Property and Content">
          <Sub title="7.1 Content License">
            By submitting Listing content, you grant TradeDiecast an irrevocable, perpetual,
            worldwide, royalty-free license to use, reproduce, modify, distribute, and display
            that content for operating and promoting the Platform. This license survives termination.
          </Sub>
          <Sub title="7.2 Data Rights">
            TradeDiecast may use data generated by your use of the Platform — including Listing,
            Transaction, pricing, and performance data — for any lawful purpose.
          </Sub>
          <Sub title="7.3 Brand Name Usage">
            You may reference brand names only to accurately identify the item's manufacturer, not
            to imply any commercial relationship with the brand owner.
          </Sub>
        </Section>

        <Section title="8. Representations and Warranties">
          <p className="mb-2">By creating any Listing, you represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You have full legal title to the item, free of all liens and encumbrances</li>
            <li>The item is exactly and accurately described in the Listing</li>
            <li>All photographs are original images of the specific item being sold</li>
            <li>The item is authentic and not counterfeit, unless explicitly disclosed</li>
            <li>The sale does not violate any applicable law or third-party right</li>
            <li>The item was not stolen or obtained by illegal means</li>
            <li>You will fulfill all Transaction obligations</li>
            <li>All information provided to TradeDiecast is accurate and complete</li>
          </ul>
        </Section>

        <Section title="9. Indemnification">
          <p>In addition to the indemnification in the Terms of Service, Sellers agree to indemnify,
          defend, and hold harmless TradeDiecast LLC from all claims, liabilities, damages, costs,
          and expenses (including attorneys' fees) arising from: any item listed or sold; any
          Transaction; violation of this Agreement or applicable law; Listing content; failure to
          remit taxes; or any fraud or illegal conduct in connection with the Platform. This obligation
          survives termination of this Agreement.</p>
        </Section>

        <Section title="10. Account Suspension and Termination">
          <Sub title="10.1 TradeDiecast's Right to Act">
            TradeDiecast may suspend, restrict, or terminate any seller account at any time, for any
            reason, with or without notice, without liability or compensation.
          </Sub>
          <Sub title="10.2 Grounds">
            Grounds include: Agreement or Terms violations; prohibited or misrepresented items;
            fraud or abuse; excessive Disputes, chargebacks, or cancellations; failure to provide
            required information; negative performance metrics; or conduct harmful to the Platform.
          </Sub>
          <Sub title="10.3 Effect of Termination">
            <ul className="list-disc pl-5 space-y-1">
              <li>All active Listings removed immediately</li>
              <li>Pending Transactions managed at TradeDiecast's discretion</li>
              <li>Payout balance held up to 180 days to cover refunds and chargebacks</li>
              <li>Remaining balance disbursed after hold period, less all charges</li>
              <li>All Agreement obligations survive termination</li>
              <li>Creating a new account after a permanent ban violates the Terms of Service</li>
            </ul>
          </Sub>
          <Sub title="10.4 Appeals">
            TradeDiecast may, but is not obligated to, provide an appeals process. Any such process
            is a courtesy only. TradeDiecast's final decision is binding.
          </Sub>
        </Section>

        <Section title="11. Limitation of Liability">
          <p className="uppercase text-xs tracking-wide text-stone-500">
            The limitation of liability in the Terms of Service applies in full to Sellers.
            Additionally: TradeDiecast is not liable for losses from Listing removal, search ranking
            changes, or account restrictions; for payout holds or delays; for Stripe's decisions;
            for Buyer payment failures; or for chargeback outcomes. TradeDiecast's total liability
            to any Seller shall not exceed the total Final Value Fees paid in the six months preceding
            the claim or $100, whichever is greater.
          </p>
        </Section>

        <Section title="12. Modifications">
          <p>TradeDiecast may modify this Agreement at any time. Updated versions will be posted on
          the Platform. Continued use as a Seller after posting constitutes acceptance.</p>
        </Section>

        <Section title="13. Governing Law and Disputes">
          <p>This Agreement is governed by the laws of Wyoming. All disputes between Sellers and
          TradeDiecast are subject to the dispute resolution provisions of the{' '}
          <Link to="/terms" className="text-brand-500 hover:underline">Terms of Service</Link>,
          including binding arbitration and class action waiver.</p>
        </Section>

        <Section title="14. General Provisions">
          <Sub title="14.1 Entire Agreement">This Agreement, the Terms of Service, and Privacy Policy constitute the entire agreement between Seller and TradeDiecast.</Sub>
          <Sub title="14.2 Severability">If any provision is invalid, it will be modified minimally, and all others remain in force.</Sub>
          <Sub title="14.3 No Waiver">TradeDiecast's failure to enforce any provision is not a waiver.</Sub>
          <Sub title="14.4 Assignment">You may not assign this Agreement without written consent. TradeDiecast may assign freely.</Sub>
          <Sub title="14.5 Independent Contractor">Sellers are independent contractors. Nothing creates employment, partnership, or agency between Seller and TradeDiecast.</Sub>
          <Sub title="14.6 Survival">Sections 3, 7, 8, 9, 10.3, 11, 13, and all provisions that by their nature should survive termination shall survive indefinitely.</Sub>
        </Section>

        <Section title="15. Contact">
          <p>TradeDiecast LLC — Seller Support<br />
          Email: <a href="mailto:hello@tradediecast.com" className="text-brand-500 hover:underline">hello@tradediecast.com</a><br />
          Website: <a href="https://tradediecast.com" className="text-brand-500 hover:underline">www.tradediecast.com</a><br />
          For legal notices: "LEGAL NOTICE — SELLER AGREEMENT"</p>
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
