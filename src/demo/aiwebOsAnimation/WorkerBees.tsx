import { WORKER_LOGOS } from './constants';

/** Subtle AI worker logos drifting across the preview canvas during builds. */
export function WorkerBees() {
  return (
    <div className="aos-worker-bees" aria-hidden>
      {WORKER_LOGOS.flatMap((worker, logoIdx) =>
        [0, 1].map((instance) => {
          const beeIdx = logoIdx * 2 + instance;
          return (
            <span
              key={`${worker.id}-${instance}`}
              className="aos-worker-bee-wrap"
              style={{ ['--bee-i' as string]: String(beeIdx) }}
            >
              <img
                src={worker.src}
                alt=""
                className={`aos-worker-bee aos-worker-bee--${worker.id}`}
                title={worker.name}
              />
            </span>
          );
        }),
      )}
    </div>
  );
}
