export const HOME_PATH = '/';
export const OS_PATH = '/os';
export const MAIL_PATH = '/mail';
export const PRICING_PATH = '/pricing';
export const PLUGINS_PATH = '/plugins';
export const PLUGIN_PATH = '/plugin';
export const ALBUM_PATH = '/album';
/** Former marketing home (CorpHero + mission / team / products). */
export const OVERVIEW_PATH = '/overview';
export const ABOUT_PATH = '/about';
export const TEAM_PATH = '/team';
export const NEWS_PATH = '/news';
export const PRESS_PATH = '/press';
export const INVESTORS_PATH = '/investors';
export const CAREERS_PATH = '/careers';
export const BLOG_PATH = '/blog';
export const TERMS_PATH = '/terms';
export const PRIVACY_PATH = '/privacy';
export const SUPPORT_PATH = '/support';

export const CORP_NAV_LINKS = [
  { label: 'About', to: ABOUT_PATH },
  { label: 'Team', to: TEAM_PATH },
  { label: 'News', to: NEWS_PATH },
  { label: 'Press', to: PRESS_PATH },
  { label: 'Investors', to: INVESTORS_PATH },
  { label: 'Careers', to: CAREERS_PATH },
  { label: 'Blog', to: BLOG_PATH },
] as const;

export function newsPostPath(slug: string): string {
  return `${NEWS_PATH}/${slug}`;
}

export function blogPostPath(slug: string): string {
  return `${BLOG_PATH}/${slug}`;
}
