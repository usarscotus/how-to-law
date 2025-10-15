import React from 'react';

type TimelineItem = {
  label: string;
  detail?: string;
  cite?: string;
};

export interface TimelineProps {
  title?: string;
  items: TimelineItem[];
  ariaLabel?: string;
}

const Timeline: React.FC<TimelineProps> = ({ title, items, ariaLabel }) => {
  return (
    <section className="htl-timeline" aria-label={ariaLabel ?? title ?? 'Timeline'}>
      {title ? <h2 className="htl-timeline__title">{title}</h2> : null}
      <ol className="htl-timeline__list">
        {items.map((item, index) => (
          <li key={index} className="htl-timeline__item">
            <div className="htl-timeline__marker" aria-hidden="true" />
            <div className="htl-timeline__content">
              <h3 className="htl-timeline__label">{item.label}</h3>
              {item.detail ? <p className="htl-timeline__detail">{item.detail}</p> : null}
              {item.cite ? <cite className="htl-timeline__cite">{item.cite}</cite> : null}
            </div>
          </li>
        ))}
      </ol>
      <style>{timelineStyles}</style>
    </section>
  );
};

const timelineStyles = `
.htl-timeline {
  background: var(--card, #fff);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 1rem;
  padding: 1.5rem;
  color: inherit;
}

.htl-timeline__title {
  margin: 0 0 1.5rem;
  font-size: 1.375rem;
}

.htl-timeline__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
  position: relative;
}

.htl-timeline__list::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 0.5rem;
  width: 2px;
  background: var(--border, rgba(15, 23, 42, 0.12));
}

.htl-timeline__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  position: relative;
  padding-left: 1.5rem;
}

.htl-timeline__marker {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  background: var(--background, #f8fafc);
  border: 2px solid var(--accent, #2563eb);
}

.htl-timeline__content {
  display: grid;
  gap: 0.4rem;
}

.htl-timeline__label {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.htl-timeline__detail {
  margin: 0;
  color: var(--muted, #475569);
  font-size: 0.975rem;
}

.htl-timeline__cite {
  font-style: normal;
  font-size: 0.85rem;
  color: var(--muted, #475569);
}

@media (min-width: 768px) {
  .htl-timeline__list {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(12rem, 1fr);
    gap: 2rem;
    padding-left: 0;
  }

  .htl-timeline__list::before {
    top: 1.5rem;
    bottom: auto;
    left: 0;
    right: 0;
    width: auto;
    height: 2px;
    background: var(--border, rgba(15, 23, 42, 0.12));
  }

  .htl-timeline__item {
    position: relative;
    padding-left: 0;
    padding-top: 2.75rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    text-align: left;
  }

  .htl-timeline__marker {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .htl-timeline__item::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .htl-timeline__marker,
  .htl-timeline__item::after {
    transition: none !important;
  }
}
`;

export default Timeline;
