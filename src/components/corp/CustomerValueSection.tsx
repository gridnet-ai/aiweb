import {
  Boxes,
  ChartLine,
  Layers,
  Link2,
  Workflow,
} from 'lucide-react';
import './customerValueSection.css';

const VALUES = [
  {
    icon: Workflow,
    title: 'Protect agency margins',
    body: 'Audits, checks, updates, and revisions become reusable OS workflows.',
  },
  {
    icon: Layers,
    title: 'Reduce the cost of AI visibility',
    body: 'One canonical business artifact — not disconnected fixes per model.',
  },
  {
    icon: ChartLine,
    title: 'Deliver measurable outcomes',
    body: 'Track discovery, actions, and the conversations that follow.',
  },
  {
    icon: Link2,
    title: 'Create persistent client value',
    body: 'Research, diagnostics, and improvements stay on the page.',
  },
  {
    icon: Boxes,
    title: 'Manage more inventory',
    body: 'More clients, locations, and products — without more headcount.',
  },
] as const;

export function CustomerValueSection() {
  return (
    <section className="cv-section" aria-labelledby="customer-value-heading">
      <div className="cv-inner">
        <p className="cv-kicker">Customer value</p>
        <h2 id="customer-value-heading" className="cv-headline">
          Increase operating leverage without increasing headcount
        </h2>
        <ul className="cv-grid">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="cv-item">
              <span className="cv-icon" aria-hidden>
                <Icon strokeWidth={1.6} />
              </span>
              <div className="cv-copy">
                <h3 className="cv-title">{title}</h3>
                <p className="cv-body">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
