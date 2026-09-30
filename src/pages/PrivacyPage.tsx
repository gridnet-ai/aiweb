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

export function PrivacyPage() {
  useScrollReveal();
  useMarketingPageSeo({
    title: 'Privacy Policy · AI Web Company',
    description:
      'How AI WEB (The AI Web Company) collects, uses, stores, and discloses information across AIWEB services.',
    canonicalPath: '/privacy',
  });

  return (
    <LegalDocLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="August 21, 2026"
      lede="How AI WEB — The AI Web Company — collects, uses, stores, and discloses information when you use AIWEB."
    >
      <p>
        <strong className="font-semibold text-marketing-ink">AI WEB</strong> (
        <strong className="font-semibold text-marketing-ink">The AI Web Company</strong>
        ) (&quot;AIWEB,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides tools that
        enable businesses and organizations to create and manage AI Web Pages, interact with
        artificial intelligence systems, publish business information, receive inquiries and
        commercial actions, and measure machine interactions.
      </p>
      <p>
        This Privacy Policy describes how we collect, use, store, and disclose information when you
        use AIWEB websites, AIWEB OS, AI Web Pages, AIWEB Actions, AIWEB Receipts, and related
        services.
      </p>

      <LegalSection title="Information We Collect">
        <p>We may collect information you provide directly to AIWEB, including:</p>
        <LegalList>
          <li>Name</li>
          <li>Email address</li>
          <li>Business and organization information</li>
          <li>Account information</li>
          <li>Business contact information</li>
          <li>Content submitted to AIWEB OS</li>
          <li>Uploaded documents and media</li>
          <li>Project information</li>
          <li>Support communications</li>
          <li>Quote requests and inquiries</li>
          <li>Information submitted through AIWEB Actions</li>
        </LegalList>
        <p>
          When someone submits an inquiry or requests a quote through AIWEB, we may process
          information necessary to deliver that request to the applicable business.
        </p>
      </LegalSection>

      <LegalSection title="Business Content">
        <p>Users may publish information about their businesses through AI Web Pages.</p>
        <p>
          Published information may be accessible to humans, search engines, artificial intelligence
          systems, automated agents, and other machine systems.
        </p>
        <p>
          Users are responsible for determining what business information they choose to make public.
        </p>
        <p>
          Private account, Project, administrative, and unpublished information is not intended to
          become public merely because a user publishes an AI Web Page.
        </p>
      </LegalSection>

      <LegalSection title="Machine and Usage Information">
        <p>
          AIWEB may collect information about how humans and machines interact with our services,
          including:
        </p>
        <LegalList>
          <li>Page requests</li>
          <li>Machine interactions</li>
          <li>AI-originated interactions</li>
          <li>AIWEB Action executions</li>
          <li>Quote and inquiry activity</li>
          <li>Receipt activity</li>
          <li>Feature usage</li>
          <li>aiWh consumption</li>
          <li>Device and browser information</li>
          <li>IP address</li>
          <li>Logs and diagnostic information</li>
        </LegalList>
        <p>
          We use this information to operate AIWEB, provide analytics, prevent abuse, improve
          reliability, understand usage, and develop our services.
        </p>
      </LegalSection>

      <LegalSection title="AI Processing">
        <p>
          AIWEB services may use artificial intelligence models and infrastructure to process user
          requests and business information.
        </p>
        <p>
          Depending on the feature and workload, processing may use AIWEB infrastructure or
          third-party model and infrastructure providers.
        </p>
        <p>
          Information may be transmitted to service providers when necessary to perform the requested
          operation.
        </p>
        <p>
          We use reasonable measures intended to limit processing to information necessary for
          providing and improving the applicable service.
        </p>
      </LegalSection>

      <LegalSection title="AIWEB Actions and Receipts">
        <p>
          AIWEB allows machines and users to perform supported actions, such as submitting a business
          inquiry or requesting a quote.
        </p>
        <p>
          We may create records associated with these interactions, including an AIWEB Receipt, to
          provide attribution, status information, troubleshooting, measurement, and continuity
          between buyers and sellers.
        </p>
        <p>
          Information submitted through an AIWEB Action may be shared with the business or
          organization to which the request is directed.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <p>We may use collected information to:</p>
        <LegalList>
          <li>Provide and operate AIWEB</li>
          <li>Authenticate users</li>
          <li>Publish and maintain AI Web Pages</li>
          <li>Process AIWEB Actions</li>
          <li>Deliver inquiries to businesses</li>
          <li>Generate and maintain AIWEB Receipts</li>
          <li>Provide machine-interaction and lead analytics</li>
          <li>Operate AIWEB OS and AI features</li>
          <li>Measure aiWh usage</li>
          <li>Process subscriptions and payments</li>
          <li>Prevent fraud, abuse, and security incidents</li>
          <li>Provide customer support</li>
          <li>Improve our products</li>
          <li>Communicate about our services</li>
          <li>Comply with legal obligations</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Service Providers">
        <p>AIWEB may use third-party providers for services such as:</p>
        <LegalList>
          <li>Cloud infrastructure</li>
          <li>Data storage</li>
          <li>Artificial intelligence models</li>
          <li>Search and information retrieval</li>
          <li>Authentication</li>
          <li>Payments</li>
          <li>Analytics</li>
          <li>Communications</li>
          <li>Security and monitoring</li>
        </LegalList>
        <p>
          These providers may process information as necessary to provide services to AIWEB.
        </p>
      </LegalSection>

      <LegalSection title="Payments">
        <p>
          Payment information may be processed by third-party payment processors. AIWEB does not need
          to directly store complete payment-card information when payment processing is handled by
          those providers.
        </p>
      </LegalSection>

      <LegalSection title="Information Sharing">
        <p>We may disclose information:</p>
        <LegalList>
          <li>At your direction</li>
          <li>To businesses receiving an inquiry or AIWEB Action</li>
          <li>To service providers supporting AIWEB</li>
          <li>When required by law</li>
          <li>To protect AIWEB, our users, or others</li>
          <li>In connection with a merger, financing, acquisition, restructuring, or sale of assets</li>
        </LegalList>
        <p>We do not sell personal information to advertisers.</p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We use administrative, technical, and organizational safeguards intended to protect
          information.
        </p>
        <p>
          No online system can guarantee absolute security, and users should avoid submitting
          unnecessary sensitive information through AIWEB.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We may retain information for as long as reasonably necessary to provide our services,
          maintain business and transaction records, resolve disputes, enforce agreements, prevent
          abuse, and satisfy legal obligations.
        </p>
        <p>
          Retention periods may vary depending on the type of information and its purpose.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices and Rights">
        <p>
          Depending on your location, you may have rights regarding your personal information,
          including rights to request access, correction, deletion, or other controls provided by
          applicable law.
        </p>
        <p>
          You may contact AIWEB to make a privacy-related request.{' '}
          <LegalPlaceholder>
            Confirm dedicated privacy-request process/email if serving EU/UK or California users at
            meaningful volume.
          </LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          AIWEB&apos;s AIWEB OS and business tools are intended for business and commercial use and
          are not directed to children under 13.
        </p>
        <p>
          <LegalPlaceholder>
            Confirm with counsel whether consumer surfaces (Big Search, Stream Discs, .aiweb files)
            need separate COPPA-consistent language.
          </LegalPlaceholder>
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>We may update this Privacy Policy as AIWEB evolves.</p>
        <p>
          When appropriate, we will update the effective date or provide additional notice of
          material changes.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For questions about this Privacy Policy or AIWEB&apos;s privacy practices, contact:
        </p>
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
