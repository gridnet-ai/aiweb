import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { applyLandingTheme, useLandingTheme } from '@/hooks/useLandingTheme';
import {
  GEEKDOM_PATH,
  HOME_PATH,
  MAIL_SITE_URL,
  PHONE_ANDROID_PATH,
  PHONE_IOS_PATH,
  PLUGIN_PATH,
} from '@/lib/corpSiteRoutes';
import {
  detectPhonePlatform,
  phoneDownloadHref,
} from '@/lib/detectPhonePlatform';
import { trackPhoneInstallEvent } from '@/lib/phoneInstallAnalytics';

export const AGENCY_PILOT_HREF =
  'mailto:support@theaiwebcompany.com?subject=Agency%20pilot%20application';

/** Unsigned visitors land on the AIWEB Mail app, which opens sign-in. */
export const OS_LOGIN_HREF = MAIL_SITE_URL;

export const CHATGPT_AIWEB_PLUGIN_HREF =
  'https://chatgpt.com/plugins/plugin_asdk_app_6a8e85029ad08191b8cd1435be85f221?q=call';

function NavAppleIcon() {
  return (
    <svg className="lv2p-nav-item-icon" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function NavAndroidIcon() {
  return (
    <svg className="lv2p-nav-item-icon" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M17.59 9.48 19.43 6.3a.6.6 0 0 0-.26-.85.62.62 0 0 0-.83.22l-1.88 3.24a11.4 11.4 0 0 0-8.92 0L5.66 5.67a.62.62 0 0 0-.83-.22.6.6 0 0 0-.26.85l1.84 3.18C4.3 11.04 2.8 14.04 2.8 17.5h18.4c0-3.46-1.5-6.46-3.61-8.02ZM7.5 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  );
}

export function LandingNavV2() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const drawerId = useId();
  const { isLight, toggle } = useLandingTheme();
  const onHome = location.pathname === HOME_PATH;
  const [downloadHref, setDownloadHref] = useState(() =>
    phoneDownloadHref('other', { onHome }),
  );
  const themeable =
    location.pathname === HOME_PATH ||
    location.pathname === PLUGIN_PATH ||
    location.pathname === GEEKDOM_PATH;

  useEffect(() => {
    if (!themeable) return;
    applyLandingTheme(isLight ? 'light' : 'dark');
  }, [isLight, themeable]);

  useEffect(() => {
    setDownloadHref(phoneDownloadHref(detectPhonePlatform(), { onHome }));
  }, [onHome]);

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
        <Link className="lv2p-nav-item" to={PHONE_IOS_PATH} onClick={() => setOpen(false)}>
          <NavAppleIcon />
          iOS
        </Link>
        <Link className="lv2p-nav-item" to={PHONE_ANDROID_PATH} onClick={() => setOpen(false)}>
          <NavAndroidIcon />
          Android
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
        <Link className="lv2p-nav-item" to={PHONE_IOS_PATH}>
          <NavAppleIcon />
          iOS
        </Link>
        <Link className="lv2p-nav-item" to={PHONE_ANDROID_PATH}>
          <NavAndroidIcon />
          Android
        </Link>
        <a className="lv2p-nav-item" href={OS_LOGIN_HREF} target="_blank" rel="noopener noreferrer">
          <img className="lv2p-nav-item-icon lv2p-nav-item-icon--cloud" src="/icons/aiweb-cloud.png?v=2" alt="" />
          Log in
        </a>
      </nav>
      <div className="lv2p-nav-actions">
        <a
          className="lv2p-nav-try"
          href={downloadHref}
          aria-label="Download the app"
          {...(downloadHref.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          onClick={() => {
            const platform = detectPhonePlatform();
            trackPhoneInstallEvent({
              event: 'phone_install_download_click',
              platform,
            });
          }}
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
