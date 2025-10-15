import React, { useEffect, useMemo, useState } from 'react';

type DecisionLeaf = {
  note: string;
};

type DecisionNode = {
  q: string;
  yes?: DecisionBranch;
  no?: DecisionBranch;
  note?: string;
};

type DecisionBranch = DecisionNode | DecisionLeaf | string | undefined;

export interface DecisionTreeProps {
  title?: string;
  nodes: DecisionNode[];
}

const isDecisionNode = (value: DecisionBranch): value is DecisionNode => {
  return Boolean(value && typeof value === 'object' && 'q' in value);
};

const isLeaf = (value: DecisionBranch): value is DecisionLeaf => {
  return Boolean(value && typeof value === 'object' && 'note' in value && !('q' in value));
};

const DecisionTree: React.FC<DecisionTreeProps> = ({ title, nodes }) => {
  const nodePaths = useMemo(() => collectNodePaths(nodes), [nodes]);
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOpenNodes((prev) => {
      const next = new Set<string>();
      nodePaths.forEach((path) => {
        if (prev.has(path)) {
          next.add(path);
        }
      });
      return next;
    });
  }, [nodePaths]);

  const toggleNode = (path: string, open: boolean) => {
    setOpenNodes((prev) => {
      const next = new Set(prev);
      if (open) {
        next.add(path);
      } else {
        next.delete(path);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenNodes(new Set(nodePaths));
  };

  const handleCollapseAll = () => {
    setOpenNodes(new Set());
  };

  const renderBranch = (branch: DecisionBranch, label: string, path: string) => {
    if (!branch) {
      return null;
    }

    if (isDecisionNode(branch)) {
      return (
        <div className="dt-branch" key={path}>
          <span className="dt-branch-label">{label}</span>
          {renderNode(branch, path)}
        </div>
      );
    }

    if (isLeaf(branch)) {
      return (
        <div className="dt-branch" key={path}>
          <span className="dt-branch-label">{label}</span>
          <p className="dt-note" role="note">
            {branch.note}
          </p>
        </div>
      );
    }

    return (
      <div className="dt-branch" key={path}>
        <span className="dt-branch-label">{label}</span>
        <p className="dt-note" role="note">
          {String(branch)}
        </p>
      </div>
    );
  };

  const renderNode = (node: DecisionNode, path: string) => {
    const isOpen = openNodes.has(path);

    return (
      <details
        className="dt-node"
        open={isOpen}
        onToggle={(event) => toggleNode(path, (event.currentTarget as HTMLDetailsElement).open)}
      >
        <summary className="dt-summary" aria-expanded={isOpen}>
          <span>{node.q}</span>
        </summary>
        <div className="dt-content">
          {node.note ? (
            <p className="dt-note" role="note">
              {node.note}
            </p>
          ) : null}
          <div className="dt-branches" role="group">
            {renderBranch(node.yes, 'Yes', `${path}.yes`)}
            {renderBranch(node.no, 'No', `${path}.no`)}
          </div>
        </div>
      </details>
    );
  };

  return (
    <section className="decision-tree" aria-label={title ?? 'Decision tree'}>
      {title ? <h2 className="dt-title">{title}</h2> : null}
      <div className="dt-controls">
        <button type="button" className="dt-button" onClick={handleExpandAll} disabled={openNodes.size === nodePaths.length}>
          Expand all
        </button>
        <button type="button" className="dt-button" onClick={handleCollapseAll} disabled={openNodes.size === 0}>
          Collapse all
        </button>
      </div>
      <ol className="dt-list">
        {nodes.map((node, index) => (
          <li key={index} className="dt-list-item">
            {renderNode(node, `${index}`)}
          </li>
        ))}
      </ol>
      <style>{styles}</style>
    </section>
  );
};

const collectNodePaths = (nodes: DecisionNode[], prefix = ''): string[] => {
  return nodes.flatMap((node, index) => {
    const current = prefix ? `${prefix}.${index}` : `${index}`;
    const paths = [current];
    if (node.yes && isDecisionNode(node.yes)) {
      paths.push(...collectNodePaths([node.yes], `${current}.yes`));
    }
    if (node.no && isDecisionNode(node.no)) {
      paths.push(...collectNodePaths([node.no], `${current}.no`));
    }
    return paths;
  });
};

const styles = `
.decision-tree {
  background: var(--card, #fff);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 1rem;
  padding: 1.5rem;
  color: inherit;
}

.dt-title {
  margin-top: 0;
  font-size: 1.375rem;
  margin-bottom: 1rem;
}

.dt-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.dt-button {
  appearance: none;
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}

.dt-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dt-button:not(:disabled):hover,
.dt-button:not(:disabled):focus-visible {
  background: var(--accent, #2563eb);
  color: var(--accent-foreground, #f8fafc);
  outline: none;
}

.dt-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.dt-node {
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--card, #fff);
  background: color-mix(in srgb, var(--card, #fff) 92%, transparent);
}

.dt-summary {
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dt-summary::-webkit-details-marker {
  display: none;
}

.dt-summary::before {
  content: '\\25BC';
  font-size: 0.75rem;
  transform: rotate(-90deg);
  transition: transform 180ms ease;
}

.dt-node[open] > .dt-summary::before {
  transform: rotate(0deg);
}

.dt-content {
  margin-top: 0.75rem;
  display: grid;
  gap: 0.75rem;
}

.dt-note {
  margin: 0;
  font-size: 0.95rem;
  color: var(--muted, #475569);
}

.dt-branches {
  display: grid;
  gap: 0.75rem;
}

.dt-branch {
  border-left: 2px solid var(--border, rgba(15, 23, 42, 0.18));
  padding-left: 0.75rem;
  display: grid;
  gap: 0.35rem;
}

.dt-branch-label {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  color: var(--accent, #2563eb);
}

@media (prefers-reduced-motion: reduce) {
  .dt-button,
  .dt-summary::before {
    transition-duration: 0.01ms !important;
  }
}
`;

export default DecisionTree;
