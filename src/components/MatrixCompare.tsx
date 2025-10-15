import React from 'react';

type MatrixCellValue = 'yes' | 'no' | 'partial';

type MatrixCell = {
  value: MatrixCellValue;
  note?: string;
};

type MatrixRow = {
  label: string;
  description?: string;
  cells: MatrixCell[];
};

export interface MatrixCompareProps {
  title?: string;
  caption?: string;
  columns: string[];
  rows: MatrixRow[];
}

const valueToSymbol: Record<MatrixCellValue, { symbol: string; label: string }> = {
  yes: { symbol: '✓', label: 'Yes' },
  no: { symbol: '—', label: 'No' },
  partial: { symbol: '∼', label: 'Partially' },
};

const MatrixCompare: React.FC<MatrixCompareProps> = ({ title, caption, columns, rows }) => {
  return (
    <section className="matrix-compare" aria-label={title ?? caption ?? 'Comparison matrix'}>
      {title ? <h2 className="mc-title">{title}</h2> : null}
      <div className="mc-wrapper" role="region" aria-live="polite">
        <table className="mc-table">
          {caption ? <caption className="mc-caption">{caption}</caption> : null}
          <thead>
            <tr>
              <th scope="col" className="mc-heading mc-heading--corner">
                Factor
              </th>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="mc-heading">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="mc-row-heading">
                  <span>{row.label}</span>
                  {row.description ? <small className="mc-row-note">{row.description}</small> : null}
                </th>
                {row.cells.map((cell, cellIndex) => {
                  const mapping = valueToSymbol[cell.value];
                  return (
                    <td key={cellIndex} data-status={cell.value}>
                      <span className="mc-symbol" aria-hidden="true">
                        {mapping.symbol}
                      </span>
                      <span className="mc-visually-hidden">{mapping.label}</span>
                      {cell.note ? <p className="mc-note">{cell.note}</p> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{matrixStyles}</style>
    </section>
  );
};

const matrixStyles = `
.matrix-compare {
  background: var(--card, #fff);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 1rem;
  padding: 1.5rem;
  overflow-x: auto;
}

.mc-title {
  margin: 0 0 1rem;
  font-size: 1.375rem;
}

.mc-wrapper {
  max-width: 100%;
  overflow-x: auto;
}

.mc-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 420px;
}

.mc-caption {
  caption-side: top;
  text-align: left;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.mc-heading {
  background: var(--card, #fff);
  background: color-mix(in srgb, var(--accent, #2563eb) 12%, transparent);
  color: inherit;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid var(--border, rgba(15, 23, 42, 0.12));
}

.mc-heading--corner {
  border-top-left-radius: 0.75rem;
}

.mc-table thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 2;
  background: var(--card, #fff);
  background: color-mix(in srgb, var(--card, #fff) 94%, transparent);
}

.mc-row-heading {
  font-weight: 600;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  text-align: left;
  min-width: 12rem;
  vertical-align: top;
}

.mc-row-note {
  display: block;
  margin-top: 0.35rem;
  color: var(--muted, #475569);
  font-size: 0.85rem;
}

.mc-table td {
  border-bottom: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  padding: 0.75rem;
  vertical-align: top;
  min-width: 9rem;
}

.mc-table tbody tr:last-child th,
.mc-table tbody tr:last-child td {
  border-bottom: none;
}

.mc-symbol {
  font-size: 1.35rem;
  font-weight: 600;
}

.mc-note {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: var(--muted, #475569);
}

.mc-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.mc-table td[data-status='yes'] {
  background: var(--card, #fff);
  background: color-mix(in srgb, var(--accent, #2563eb) 8%, transparent);
}

.mc-table td[data-status='partial'] {
  background: var(--card, #fff);
  background: color-mix(in srgb, var(--accent, #2563eb) 4%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .matrix-compare,
  .mc-table td {
    scroll-behavior: auto;
  }
}
`;

export default MatrixCompare;
