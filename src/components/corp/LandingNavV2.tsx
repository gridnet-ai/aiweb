import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { PRODUCT_URLS } from '@/lib/aiWebCompanyBrand';
import { OS_PATH } from '@/lib/corpSiteRoutes';

export const AGENCY_PILOT_HREF =
  'mailto:support@theaiwebcompany.com?subject=Agency%20pilot%20application';

/** Unsigned visitors land on the AIWEB OS welcome screen, which opens sign-in. */
export const OS_LOGIN_HREF = PRODUCT_URLS.aiWebOs;

const MENU = [
  {
    label: 'Create',
    links: [{ label: 'Create for AI', href: `${OS_PATH}#create` }],
  },
  {
    label: 'Measure',
    links: [{ label: 'AI kitchen sink', href: `${OS_PATH}#stories` }],
  },
  {
    label: 'AIWEB OS',
    links: [
      { label: 'OS', href: OS_PATH },
      { label: 'AIWEB OS', href: `${OS_PATH}#os` },
      { label: 'Self-improving pages', href: `${OS_PATH}#pages` },
      { label: 'AIWEB Pages', href: '#sites' },
      { label: 'Message buyers', href: `${OS_PATH}#inbox` },
      { label: 'Calls', href: `${OS_PATH}#calls` },
      { label: 'Metrics', href: `${OS_PATH}#metrics` },
    ],
  },
  {
    label: 'ChatGPT',
    links: [{ label: 'Keep ChatGPT', href: `${OS_PATH}#partners` }],
  },
  {
    label: 'Get started',
    links: [
      { label: 'Pricing', href: '#start' },
      { label: 'Who it fits', href: `${OS_PATH}#sized` },
      { label: 'Resources', href: `${OS_PATH}#resources` },
    ],
  },
] as const;

export function LandingNavV2() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
        <button
          type="button"
          className="lv2p-icon-btn"
          aria-label="Search"
          onClick={() => setSearchOpen((v) => !v)}
        >
          <Search size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="lv2p-icon-btn lv2p-menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {searchOpen ? (
        <form
          className="lv2p-search"
          action={`${OS_PATH}#create`}
          onSubmit={() => setSearchOpen(false)}
        >
          <input type="search" placeholder="Search AIWEB" aria-label="Search" />
        </form>
      ) : null}

      {open ? (
        <div className="lv2p-drawer">
          {MENU.map((group) => (
            <details key={group.label} className="lv2p-acc">
              <summary>{group.label}</summary>
              <div>
                {group.links.map((link) =>
                  link.href.startsWith('/') ? (
                    <Link key={link.label} to={link.href} onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            </details>
          ))}
          <a
            className="lv2p-pill lv2p-pill--fill lv2p-drawer-cta"
            href={OS_LOGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
          <a
            className="lv2p-pill lv2p-pill--line"
            href={OS_LOGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in
          </a>
        </div>
      ) : null}
    </header>
  );
}
