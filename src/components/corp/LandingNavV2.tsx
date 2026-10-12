import { Link } from 'react-router-dom';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { OS_PATH } from '@/lib/corpSiteRoutes';

export const AGENCY_PILOT_HREF =
  'mailto:support@theaiwebcompany.com?subject=Agency%20pilot%20application';

/** Unsigned visitors land on the AIWEB OS welcome screen, which opens sign-in. */
export const OS_LOGIN_HREF = PRODUCT_URLS.aiWebOs;

export const CHATGPT_AIWEB_PLUGIN_HREF =
  'https://chatgpt.com/plugins/plugin_asdk_app_6a8e85029ad08191b8cd1435be85f221?q=call';

export function LandingNavV2() {
  return (
    <header className="lv2p-nav">
      <Link to="/" className="lv2p-nav-brand" aria-label="AIWEB — home">
        <img
          className="lv2p-nav-mark"
          src="/images/promo/aiweb-call-mark.png"
          alt=""
          width={28}
          height={28}
        />
        <span className="lv2p-nav-brand-name">AIWEB</span>
      </Link>
      <nav className="lv2p-nav-links" aria-label="Landing">
        <Link to={`${OS_PATH}#create`}>Create</Link>
        <Link to={`${OS_PATH}#stories`}>Measure</Link>
        <Link to={OS_PATH}>AIWEB OS</Link>
        <Link to={`${OS_PATH}#partners`}>ChatGPT</Link>
        <a href="#start">Get started</a>
      </nav>
      <div className="lv2p-nav-actions">
        <a
          className="lv2p-nav-text"
          href={OS_LOGIN_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in
        </a>
        <a
          className="lv2p-nav-try"
          href={CHATGPT_AIWEB_PLUGIN_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          Try it
        </a>
      </div>
    </header>
  );
}
