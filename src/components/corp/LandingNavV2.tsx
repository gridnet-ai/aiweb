import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { applyLandingTheme, useLandingTheme } from '@/hooks/useLandingTheme';
import {
  GEEKDOM_PATH,
  HOME_PATH,
  MAIL_SITE_URL,
  PHONE_SITE_URL,
  PLUGIN_PATH,
} from '@/lib/corpSiteRoutes';

export const AGENCY_PILOT_HREF =
  'mailto:support@theaiwebcompany.com?subject=Agency%20pilot%20application';

/** Unsigned visitors land on the AIWEB Mail app, which opens sign-in. */
export const OS_LOGIN_HREF = MAIL_SITE_URL;

export const CHATGPT_AIWEB_PLUGIN_HREF =
  'https://chatgpt.com/plugins/plugin_asdk_app_6a8e85029ad08191b8cd1435be85f221?q=call';

export function LandingNavV2() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const drawerId = useId();
  const { isLight, toggle } = useLandingTheme();
  const themeable =
    location.pathname === HOME_PATH ||
    location.pathname === PLUGIN_PATH ||
    location.pathname === GEEKDOM_PATH;

  useEffect(() => {
    if (!themeable) return;
    applyLandingTheme(isLight ? 'light' : 'dark');
  }, [isLight, themeable]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const menu = createPortal(
    <div className={`lv2p-nav-overlay${open ? ' is-open' : ''}${isLight ? ' lv2p-nav-overlay--light' : ''}`}>
      <button
        type="button"
        className="lv2p-nav-backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
      <nav
        id={drawerId}
        className={`lv2p-nav-drawer${isLight ? ' lv2p-nav-drawer--light' : ''}`}
        aria-label="Menu"
        aria-hidden={!open}
      >
        <a className="lv2p-nav-item" href={MAIL_SITE_URL}>
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Mail
        </a>
        <Link className="lv2p-nav-item" to={PLUGIN_PATH} onClick={() => setOpen(false)}>
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Plugin
        </Link>
        <a className="lv2p-nav-item" href={OS_LOGIN_HREF} target="_blank" rel="noopener noreferrer">
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Log in
        </a>

        {themeable ? (
          <div className="lv2p-nav-theme">
            <div className="lv2p-nav-theme-copy">
              <span className="lv2p-nav-theme-label">Light mode</span>
              <span className="lv2p-nav-theme-hint">{isLight ? 'On' : 'Off'}</span>
            </div>
            <button
              type="button"
              className={`lv2p-nav-theme-toggle${isLight ? ' is-on' : ''}`}
              role="switch"
              aria-checked={isLight}
              aria-label="Light mode"
              tabIndex={open ? 0 : -1}
              onClick={toggle}
            >
              <span className="lv2p-nav-theme-knob" aria-hidden />
            </button>
          </div>
        ) : null}
      </nav>
    </div>,
    document.body,
  );

  return (
    <header className="lv2p-nav">
      <Link to="/" className="lv2p-nav-brand" aria-label="AIWEB — home">
        <img
          className="lv2p-nav-logo lv2p-nav-logo--on-light"
          src="/images/promo/aiweb-nav-logo-black.png"
          alt=""
        />
        <img
          className="lv2p-nav-logo lv2p-nav-logo--on-dark"
          src="/images/promo/aiweb-nav-logo-white.png"
          alt=""
        />
      </Link>
      <nav className="lv2p-nav-links" aria-label="Landing">
        <a className="lv2p-nav-item" href={MAIL_SITE_URL}>
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Mail
        </a>
        <Link className="lv2p-nav-item" to={PLUGIN_PATH}>
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Plugin
        </Link>
        <a className="lv2p-nav-item" href={OS_LOGIN_HREF} target="_blank" rel="noopener noreferrer">
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Log in
        </a>
      </nav>
      <div className="lv2p-nav-actions">
        <a
          className="lv2p-nav-try"
          href={PHONE_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download the app"
        >
          Download
        </a>
        <button
          type="button"
          className="lv2p-nav-menu"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="lv2p-nav-menu-label">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`lv2p-nav-menu-icon${open ? ' is-open' : ''}`} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      {menu}
    </header>
  );
}
