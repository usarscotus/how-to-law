import React, { useCallback, useEffect, useMemo, useState } from 'react';

type FlashcardItem = {
  id?: string;
  front: React.ReactNode;
  back: React.ReactNode;
};

export interface FlashcardsProps {
  deckId: string;
  title?: string;
  cards: FlashcardItem[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ deckId, title, cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const storageKey = useMemo(() => `htl:flashcards:${deckId}:known`, [deckId]);
  const validIds = useMemo(() => cards.map((card, index) => card.id ?? `${index}`), [cards]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setKnown(new Set(parsed));
      }
    } catch (error) {
      console.warn('Unable to read flashcard state', error);
    }
  }, [storageKey]);

  useEffect(() => {
    setKnown((prev) => {
      const next = new Set<string>();
      validIds.forEach((id) => {
        if (prev.has(id)) {
          next.add(id);
        }
      });
      if (next.size === prev.size && Array.from(next).every((id) => prev.has(id))) {
        return prev;
      }
      return next;
    });
  }, [validIds]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(Array.from(known)));
    } catch (error) {
      console.warn('Unable to persist flashcard state', error);
    }
  }, [known, storageKey]);

  useEffect(() => {
    setFlipped(false);
  }, [currentIndex]);

  const totalCards = cards.length;

  useEffect(() => {
    if (currentIndex >= totalCards) {
      setCurrentIndex(totalCards > 0 ? totalCards - 1 : 0);
    }
  }, [currentIndex, totalCards]);
  const currentCard = cards[currentIndex];
  const cardId = currentCard?.id ?? `${currentIndex}`;
  const isKnown = known.has(cardId);

  const handleFlip = useCallback(() => {
    if (!currentCard) return;
    setFlipped((prev) => !prev);
  }, [currentCard]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleFlip();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      }
    },
    [handleFlip, handleNext, handlePrev]
  );

  const toggleKnown = () => {
    setKnown((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  if (totalCards === 0) {
    return null;
  }

  const knownCount = known.size;

  return (
    <section className="flashcards" aria-label={title ?? 'Flashcards deck'}>
      {title ? <h2 className="fc-title">{title}</h2> : null}
      <div className="fc-status" role="status" aria-live="polite">
        Card {currentIndex + 1} of {totalCards} · Known {knownCount}
      </div>
      <div
        className="fc-card"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? 'Show front' : 'Show back'}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
      >
        <div className={`fc-card-inner${flipped ? ' fc-card-inner--flipped' : ''}`}>
          <div className="fc-face fc-face--front">
            <div className="fc-face-content">{currentCard.front}</div>
            <span className="fc-hint">Press space to flip</span>
          </div>
          <div className="fc-face fc-face--back">
            <div className="fc-face-content">{currentCard.back}</div>
            <span className="fc-hint">Press space to flip back</span>
          </div>
        </div>
      </div>
      <div className="fc-controls">
        <button type="button" className="fc-button" onClick={handlePrev} aria-label="Previous card">
          ← Prev
        </button>
        <button
          type="button"
          className={`fc-button${isKnown ? ' fc-button--active' : ''}`}
          onClick={toggleKnown}
          aria-pressed={isKnown}
        >
          {isKnown ? 'Mark unknown' : 'Mark known'}
        </button>
        <button type="button" className="fc-button" onClick={handleNext} aria-label="Next card">
          Next →
        </button>
      </div>
      <style>{flashcardStyles}</style>
    </section>
  );
};

const flashcardStyles = `
.flashcards {
  background: var(--card, #fff);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 1rem;
  padding: 1.5rem;
  color: inherit;
  display: grid;
  gap: 1.25rem;
}

.fc-title {
  margin: 0;
  font-size: 1.375rem;
}

.fc-status {
  font-size: 0.95rem;
  color: var(--muted, #475569);
}

.fc-card {
  position: relative;
  perspective: 1200px;
  cursor: pointer;
  border-radius: 1rem;
  outline: none;
}

.fc-card:focus-visible {
  box-shadow: 0 0 0 3px var(--accent, #2563eb);
}

.fc-card-inner {
  position: relative;
  width: 100%;
  min-height: 200px;
  transition: transform 320ms ease;
  transform-style: preserve-3d;
  border-radius: 1rem;
}

.fc-card-inner--flipped {
  transform: rotateY(180deg);
}

.fc-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  background: var(--card, #fff);
  background: color-mix(in srgb, var(--card, #fff) 95%, transparent);
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  border-radius: 1rem;
  display: grid;
  place-content: center;
  padding: 1.5rem;
  text-align: center;
  gap: 1rem;
}

.fc-face--back {
  transform: rotateY(180deg);
}

.fc-face-content {
  font-size: 1.05rem;
  line-height: 1.6;
}

.fc-hint {
  font-size: 0.8rem;
  color: var(--muted, #475569);
}

.fc-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.fc-button {
  appearance: none;
  border: 1px solid var(--border, rgba(15, 23, 42, 0.12));
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}

.fc-button:hover,
.fc-button:focus-visible {
  background: var(--accent, #2563eb);
  color: var(--accent-foreground, #f8fafc);
  outline: none;
}

.fc-button--active {
  background: var(--accent, #2563eb);
  color: var(--accent-foreground, #f8fafc);
}

@media (prefers-reduced-motion: reduce) {
  .fc-card-inner {
    transition-duration: 0.01ms !important;
  }

  .fc-card {
    perspective: none;
  }
}
`;

export default Flashcards;
