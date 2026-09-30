export type PluginPlatformTab = {
  id: string;
  label: string;
  disabled?: boolean;
};

/** Default platform tabs for /plugins. Add Claude, Gemini, etc. here. */
export const PLUGINS_PLATFORMS: PluginPlatformTab[] = [
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'more', label: 'More platforms coming soon', disabled: true },
];
