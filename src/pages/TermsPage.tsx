import {
  LegalDocLayout,
  LegalList,
  LegalPlaceholder,
  LegalSection,
} from '@/components/corp/LegalDocLayout';
import { CORP_CONTACTS } from '@/lib/aiWebCompanyBrand';
import { SUPPORT_PATH } from '@/lib/corpSiteRoutes';
import { useMarketingPageSeo, useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export function TermsPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Terms of Service · AI Web Company',
    description:
      'Terms of Service for AIWEB websites, AIWEB OS, AI Web Pages, Projects, Actions, Receipts, and related services.',
    canonicalPath: '/terms',
  });

  return (
    <LegalDocLayout
      eyebrow="Legal"
      title="Terms of Service"
      effectiveDate="August 21, 2026"
      lede="These Terms govern access to and use of services provided by AI WEB — The AI Web Company."
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of services provided by{' '}
        <strong className="font-semibold text-marketing-ink">AI WEB</strong> (
        <strong className="font-semibold text-marketing-ink">The AI Web Company</strong>
        ) (&quot;AIWEB,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including AIWEB
        websites, AIWEB OS, AI Web Pages, Projects, AIWEB Actions, AIWEB Receipts, AI features, and
        related services.
      </p>
      <p>By accessing or using AIWEB, you agree to these Terms.</p>

      <LegalSection title="1. Eligibility">
        <p>
          <LegalPlaceholder>Confirm age/majority rules with counsel before publishing.</LegalPlaceholder>{' '}
          You must be at least 18 years old, or the age of legal majority in your jurisdiction, and
          have the legal capacity to enter into a binding agreement, to use AIWEB on your own behalf
          or on behalf of a business or organization.
        </p>
      </LegalSection>

      <LegalSection title="2. AIWEB Services">
        <p>
          AIWEB provides infrastructure and software that enables businesses and organizations to
          publish information for humans and machines, manage AI Web Pages, use AI-assisted tools,
          receive supported inquiries and actions, and measure interactions with their published
          business presence.
        </p>
        <p>Features may change as AIWEB develops.</p>
      </LegalSection>

      <LegalSection title="3. Accounts">
        <p>You are responsible for:</p>
        <LegalList>
          <li>Providing accurate account information</li>
          <li>Maintaining the security of your account</li>
          <li>Protecting your credentials</li>
          <li>Activities performed through your account</li>
          <li>Keeping business and contact information reasonably current</li>
        </LegalList>
        <p>You may not use another person&apos;s account without authorization.</p>
      </LegalSection>

      <LegalSection title="4. AI Web Pages and Published Content">
        <p>You retain responsibility for content you submit or publish through AIWEB.</p>
        <p>
          You represent that you have the necessary rights and authority to publish the information,
          media, documents, trademarks, and other materials you provide.
        </p>
        <p>
          By publishing an AI Web Page, you understand that published information is intended to be
          accessible to humans and may also be accessed, analyzed, indexed, interpreted, or acted
          upon by search engines, AI systems, automated agents, and other machines.
        </p>
        <p>
          You grant AIWEB the rights reasonably necessary to host, process, format, reproduce,
          transmit, and display your content for operating and providing the services.
        </p>
      </LegalSection>

      <LegalSection title="5. Accuracy of Business Information">
        <p>
          You are responsible for the accuracy of business information and claims published through
          your account.
        </p>
        <p>
          AIWEB tools, including AI-assisted generation and AI Check, may help identify, generate,
          organize, or evaluate information, but they do not replace your responsibility to review
          published content.
        </p>
        <p>
          You should review AI-generated or AI-modified information before relying on or publishing
          it.
        </p>
      </LegalSection>

      <LegalSection title="6. AI Services">
        <p>Some AIWEB features use artificial intelligence.</p>
        <p>
          AI-generated output may be incomplete, inaccurate, outdated, or inappropriate for a
          particular purpose.
        </p>
        <p>
          You are responsible for reviewing outputs before relying on them for business, legal,
          financial, safety-critical, or other consequential decisions.
        </p>
        <p>
          AIWEB may use different models, infrastructure, routing systems, and service providers to
          perform AI workloads.
        </p>
      </LegalSection>

      <LegalSection title="7. AIWEB Actions">
        <p>
          AI Web Pages may expose supported actions that allow users or automated systems to interact
          with a business.
        </p>
        <p>Examples may include:</p>
        <LegalList>
          <li>Requesting a quote</li>
          <li>Submitting an inquiry</li>
          <li>Requesting information</li>
          <li>Initiating another supported business workflow</li>
        </LegalList>
        <p>
          An AIWEB Action does not by itself create a binding purchase, contract, acceptance, or
          obligation unless the parties separately establish one.
        </p>
        <p>
          Businesses remain responsible for responding to inquiries and establishing the terms of any
          resulting transaction.
        </p>
      </LegalSection>

      <LegalSection title="8. AIWEB Receipts">
        <p>AIWEB may generate a Receipt or other record when an AIWEB Action occurs.</p>
        <p>
          A Receipt may provide evidence that an interaction or request was submitted or processed
          through AIWEB.
        </p>
        <p>
          Unless expressly stated otherwise, an AIWEB Receipt is not a payment receipt, contract,
          purchase order, guarantee, or representation that a transaction has been completed.
        </p>
      </LegalSection>

      <LegalSection title="9. Projects">
        <p>AIWEB OS may allow users to organize business information and AI Web Pages into Projects.</p>
        <p>
          Users are responsible for ensuring they have authority to manage information belonging to
          clients, businesses, or other organizations placed within their Projects.
        </p>
      </LegalSection>

      <LegalSection title="10. aiWh and AI Usage">
        <p>
          Certain plans may include an allocation of aiWh, AIWEB&apos;s measurement system for AI
          usage and computational work.
        </p>
        <p>
          aiWh may be consumed by features including AI-assisted publishing, research, search, chat,
          AI Check, generation, and other AI operations.
        </p>
        <p>
          Included allocations, measurement methods, overages, and usage policies may vary by
          subscription plan.
        </p>
        <p>
          aiWh is a service-usage measurement and has no cash value. Unless required by law or
          expressly stated otherwise, unused aiWh is not redeemable for money.
        </p>
      </LegalSection>

      <LegalSection title="11. Subscriptions and Billing">
        <p>Paid AIWEB services may be offered on a subscription basis.</p>
        <p>
          By purchasing a subscription, you authorize AIWEB and its payment providers to charge
          applicable subscription fees and other authorized charges.
        </p>
        <p>
          Subscription pricing, included aiWh, features, and billing periods will be presented at
          purchase.
        </p>
        <p>
          Subscriptions may renew automatically unless canceled according to the terms presented
          during purchase.
        </p>
      </LegalSection>

      <LegalSection title="12. Cancellation">
        <p>
          You may cancel a subscription according to the cancellation options provided through your
          account or support.
        </p>
        <p>
          Unless otherwise required by law or expressly stated, cancellation prevents future renewal
          and does not necessarily entitle you to a refund for previously paid subscription periods.
        </p>
      </LegalSection>

      <LegalSection title="13. Acceptable Use">
        <p>You may not use AIWEB to:</p>
        <LegalList>
          <li>Violate applicable law</li>
          <li>Commit fraud or deception</li>
          <li>Impersonate another person or business</li>
          <li>Publish content you do not have authority to use</li>
          <li>Distribute malware or malicious code</li>
          <li>Interfere with AIWEB infrastructure</li>
          <li>Attempt unauthorized access to accounts or systems</li>
          <li>Circumvent usage limits or security controls</li>
          <li>Abuse AIWEB Actions or automated interfaces</li>
          <li>Generate spam or abusive inquiries</li>
          <li>Use AIWEB in a manner that materially harms the service or other users</li>
        </LegalList>
        <p>
          We may restrict or suspend access when reasonably necessary to protect AIWEB, users,
          businesses, or third parties.
        </p>
      </LegalSection>

      <LegalSection title="14. Third-Party Services">
        <p>
          AIWEB may interact with third-party platforms, AI systems, websites, payment processors,
          cloud providers, and other services.
        </p>
        <p>
          AIWEB does not control third-party services and is not responsible for their independent
          availability, policies, outputs, or conduct.
        </p>
        <p>
          Availability or behavior of integrations may change when third-party platforms modify their
          services.
        </p>
      </LegalSection>

      <LegalSection title="15. Intellectual Property">
        <p>
          AIWEB and its software, systems, branding, interfaces, technology, and other proprietary
          materials are owned by AIWEB or its licensors and are protected by applicable
          intellectual-property laws.
        </p>
        <p>These Terms do not transfer ownership of AIWEB intellectual property to you.</p>
      </LegalSection>

      <LegalSection title="16. Service Availability">
        <p>
          We work to provide reliable services but do not guarantee uninterrupted or error-free
          operation.
        </p>
        <p>
          AI systems, third-party platforms, networks, cloud infrastructure, integrations, and other
          dependencies may occasionally be unavailable or behave unexpectedly.
        </p>
        <p>Features may be modified, added, or discontinued.</p>
      </LegalSection>

      <LegalSection title="17. Disclaimer of Warranties">
        <p>
          To the maximum extent permitted by law, AIWEB services are provided &quot;as is&quot; and
          &quot;as available.&quot;
        </p>
        <p>
          AIWEB disclaims warranties not expressly provided in these Terms, including implied
          warranties of merchantability, fitness for a particular purpose, and non-infringement where
          permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="18. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, AIWEB will not be liable for indirect,
          incidental, special, consequential, exemplary, or punitive damages, or for lost profits,
          revenues, business opportunities, goodwill, or data arising from use of the services.
        </p>
        <p>
          Any additional limitations applicable to paid services may be stated in an order form or
          other written agreement.
        </p>
      </LegalSection>

      <LegalSection title="19. Indemnification">
        <p>
          To the extent permitted by law, you agree to indemnify and hold harmless AIWEB and its
          affiliates, officers, employees, and agents from claims arising from your content, misuse of
          the services, violation of these Terms, or violation of another person&apos;s rights.
        </p>
      </LegalSection>

      <LegalSection title="20. Termination">
        <p>You may stop using AIWEB at any time.</p>
        <p>
          AIWEB may suspend or terminate access when reasonably necessary because of violations of
          these Terms, security threats, abuse, nonpayment, legal requirements, or material risks to
          the service or its users.
        </p>
      </LegalSection>

      <LegalSection title="21. Governing Law and Dispute Resolution">
        <p>
          <LegalPlaceholder>
            Confirm governing law, venue, arbitration, and class-action waiver with counsel.
          </LegalPlaceholder>{' '}
          These Terms are governed by the laws of{' '}
          <LegalPlaceholder>STATE — e.g. Delaware</LegalPlaceholder>, without regard to
          conflict-of-law principles.
        </p>
      </LegalSection>

      <LegalSection title="22. Changes to These Terms">
        <p>We may update these Terms as AIWEB and its services evolve.</p>
        <p>
          Material changes may be communicated through the service or by other reasonable means.
        </p>
        <p>
          Continued use after updated Terms become effective constitutes acceptance where permitted by
          law.
        </p>
      </LegalSection>

      <LegalSection title="23. Contact">
        <p>Questions about these Terms may be directed to:</p>
        <p>
          <strong className="font-semibold text-marketing-ink">AI WEB · The AI Web Company</strong>
          <br />
          <Link to={SUPPORT_PATH} className="font-semibold text-marketing-crimson hover:text-marketing-crimsonDark">
            Support
          </Link>
          {' · '}
          <a
            href={CORP_CONTACTS.support}
            className="font-semibold text-marketing-crimson hover:text-marketing-crimsonDark"
          >
            support@theaiwebcompany.com
          </a>
        </p>
      </LegalSection>
    </LegalDocLayout>
  );
}
