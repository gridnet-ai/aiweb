import { Link } from 'react-router-dom';
import {
  BROWSER_PATH,
  CORP_NAV_LINKS,
  HOME_PATH,
  PAGE_PATH,
  PHONE_SITE_URL,
  PLUGIN_PATH,
  PRIVACY_PATH,
  SUPPORT_PATH,
  TERMS_PATH,
} from '@/lib/corpSiteRoutes';
import '@/styles/corpSiteFooter.css';

type CorpSiteFooterProps = {
  dark?: boolean;
};

export function CorpSiteFooter({ dark = false }: CorpSiteFooterProps) {
  return (
    <footer className={`corp-site-footer${dark ? ' corp-site-footer--dark' : ''}`}>
      <div className="corp-site-footer-inner">
        <div className="corp-site-footer-top">
          <div className="corp-site-footer-brand">
            <Link to={HOME_PATH} className="corp-site-footer-logo-link" aria-label="AIWEB — home">
              <img
                className="corp-site-footer-logo corp-site-footer-logo--light"
                src="/brand/mail/aiweb-footer-logo-on-light.png"
                alt=""
                width={180}
                height={38}
              />
              <img
                className="corp-site-footer-logo corp-site-footer-logo--dark"
                src="/brand/mail/aiweb-footer-logo-on-dark.png"
                alt=""
                width={180}
                height={38}
              />
            </Link>
            <p className="corp-site-footer-operator">
              This website is operated by Super eComm, Inc., a Delaware corporation.
            </p>
          </div>

          <div className="corp-site-footer-cols">
            <div className="corp-site-footer-col">
              <h2 className="corp-site-footer-heading">Products</h2>
              <ul className="corp-site-footer-list">
                <li>
                  <a href={PHONE_SITE_URL}>Phone</a>
                </li>
                <li>
                  <Link to={BROWSER_PATH}>Browser</Link>
                </li>
                <li>
                  <Link to={PAGE_PATH}>Page</Link>
                </li>
                <li>
                  <Link to={PLUGIN_PATH}>Plugin</Link>
                </li>
              </ul>
            </div>

            <div className="corp-site-footer-col">
              <h2 className="corp-site-footer-heading">Company</h2>
              <ul className="corp-site-footer-list">
                {CORP_NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="corp-site-footer-col">
              <h2 className="corp-site-footer-heading">Legal</h2>
              <ul className="corp-site-footer-list">
                <li>
                  <Link to={PRIVACY_PATH}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={TERMS_PATH}>Terms of Service</Link>
                </li>
                <li>
                  <Link to={SUPPORT_PATH}>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="corp-site-footer-bottom">
          <p className="corp-site-footer-copy">
            © 2026 Super eComm, Inc. All rights reserved.
          </p>
          <nav className="corp-site-footer-legal" aria-label="Legal">
            <Link to={PRIVACY_PATH}>Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link to={TERMS_PATH}>Terms of Service</Link>
            <span aria-hidden="true">·</span>
            <Link to={SUPPORT_PATH}>Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
