import type { PluginPlatformTab } from '@/lib/pluginsPlatforms';

type Props = {
  platforms: PluginPlatformTab[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Segmented platform switcher — add tabs later without changing page layout. */
export function PlatformNav({ platforms, selectedId, onSelect }: Props) {
  return (
    <div className="pg-seg" role="tablist" aria-label="AIWEB plugin platforms">
      {platforms.map((p) => {
        const selected = p.id === selectedId;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`platform-tab-${p.id}`}
            aria-selected={selected}
            aria-controls="plugins-platform-panel"
            disabled={p.disabled}
            className={`pg-seg__btn${selected ? ' is-active' : ''}${p.disabled ? ' is-soon' : ''}`}
            onClick={() => {
              if (p.disabled) return;
              onSelect(p.id);
            }}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
