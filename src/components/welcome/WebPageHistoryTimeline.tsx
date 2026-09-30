const PAGE_JOURNEY = [
  { era: '1989', label: 'Static Web' },
  { era: '1993', label: 'Server-Side Dynamic' },
  { era: '1995', label: 'Client-Side Dynamic' },
  { era: '2026', label: 'Machine-native Web' },
] as const;

export function WebPageHistoryTimeline() {
  return (
    <div className="mt-8 w-full max-w-[820px] px-1">
      <p className="text-center font-mono-marketing text-[10px] font-bold uppercase tracking-[0.16em] text-marketing-muted2">
        The history of the web
      </p>
      <ol className="relative mx-auto mt-2 flex items-start justify-between">
        <span
          className="absolute left-[6px] right-[6px] top-[5px] h-px bg-[#c8c5bf]"
          aria-hidden
        />
        {PAGE_JOURNEY.map((step, index) => (
          <li key={step.era} className="relative z-10 flex w-[8.25rem] flex-col items-center">
            <span
              className={`block h-[11px] w-[11px] rounded-full ring-4 ring-[#eceae6] ${
                index === PAGE_JOURNEY.length - 1 ? 'bg-marketing-gold' : 'bg-marketing-ink'
              }`}
              aria-hidden
            />
            <span className="mt-2 font-mono-marketing text-[10px] font-bold tracking-[0.08em] text-marketing-muted2">
              {step.era}
            </span>
            <span className="mt-0.5 text-center text-[11px] font-semibold leading-snug text-marketing-ink">
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
