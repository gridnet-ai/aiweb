import type { ChatgptPlanId } from '@/lib/pluginsCtas';

export const CHATGPT_PLANS: {
  id: ChatgptPlanId;
  label: string;
  kicker: string;
}[] = [
  { id: 'business', label: 'Business', kicker: 'Workspaces' },
  { id: 'plus', label: 'Plus', kicker: 'Personal' },
  { id: 'free', label: 'Free', kicker: 'Personal' },
];

type Props = {
  selected: ChatgptPlanId;
  onSelect: (id: ChatgptPlanId) => void;
};

/** ChatGPT plan selector — Business, Plus, and Free as distinct tabs. */
export function ChatgptPlanNav({ selected, onSelect }: Props) {
  return (
    <div className="pg-plans" role="tablist" aria-label="ChatGPT plan">
      {CHATGPT_PLANS.map((p) => {
        const active = p.id === selected;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`chatgpt-plan-${p.id}`}
            aria-selected={active}
            aria-controls={`chatgpt-panel-${p.id}`}
            className={`pg-plan pg-plan--${p.id}${active ? ' is-active' : ''}`}
            onClick={() => onSelect(p.id)}
          >
            <span className="pg-plan__kicker">{p.kicker}</span>
            <span className="pg-plan__label">ChatGPT {p.label}</span>
          </button>
        );
      })}
    </div>
  );
}
