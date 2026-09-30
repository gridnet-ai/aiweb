export const AI_WEB_COMPANY_BRAND = {
  name: 'AI Web Company',
  mission: 'AIWEB is the commercial action layer for AI.',
  subheadline:
    'Publish AIWEB Pages that AI agents can discover, understand, and act through.',
  productLoop: 'Build. Publish. Get discovered. Receive Calls. Respond. Improve. Repeat.',
  logoSrc: '/icons/app-logo.png',
  watermarkDomain: 'theaiwebcompany.com',
  siteOrigin: 'https://www.theaiwebcompany.com',
} as const;

export const SITE_ORIGIN = AI_WEB_COMPANY_BRAND.siteOrigin;

/** Product surfaces — outbound only; never merge into corp primary nav. */
export const PRODUCT_URLS = {
  aiWebApp: 'https://www.theaiwebapp.com',
  aiWebAppDownload: 'https://www.theaiwebapp.com/download',
  aiWebAppStore: 'https://www.aiwebappstore.com',
  bigSearch: 'https://bigsearchai.com',
  publishToAi: 'https://publishtoai.com',
  publisher: 'https://www.os.theaiwebcompany.com',
  aiWebOs: 'https://www.os.theaiwebcompany.com',
  openApp: 'https://bigsearchai.com/app',
  status: 'https://bigsearchai.com/status',
  /** Canonical legal/support live on the corp site. */
  terms: 'https://www.theaiwebcompany.com/terms',
  privacy: 'https://www.theaiwebcompany.com/privacy',
  support: 'https://www.theaiwebcompany.com/support',
} as const;

export const CORP_CONTACTS = {
  press: 'mailto:press@theaiwebcompany.com',
  investors: 'mailto:investors@theaiwebcompany.com',
  careers: 'mailto:careers@theaiwebcompany.com',
  support: 'mailto:support@theaiwebcompany.com',
} as const;
