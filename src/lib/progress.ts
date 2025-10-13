export type LessonProgress = {
  completed: boolean;
  score?: number;
  total?: number;
  updatedAt: number;
};

export type Store = {
  lessons: Record<string, LessonProgress>;
};

const STORAGE_KEY = 'htl:progress';

function getDefaultStore(): Store {
  return { lessons: {} };
}

export function getProgress(): Store {
  if (typeof window === 'undefined') {
    return getDefaultStore();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStore();
    const parsed = JSON.parse(raw) as Store;
    return {
      lessons: parsed.lessons ?? {}
    };
  } catch (error) {
    console.error('Failed to parse progress', error);
    return getDefaultStore();
  }
}

export function setProgress(store: Store) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getLessonProgress(lessonId: string): LessonProgress | undefined {
  const store = getProgress();
  return store.lessons[lessonId];
}

export function scoreLesson(lessonId: string, score: number, total: number) {
  const store = getProgress();
  store.lessons[lessonId] = {
    completed: score >= total ? true : store.lessons[lessonId]?.completed ?? false,
    score: Math.max(score, store.lessons[lessonId]?.score ?? 0),
    total,
    updatedAt: Date.now()
  };
  setProgress(store);
  return store.lessons[lessonId];
}

export function toggleLessonComplete(lessonId: string, completed: boolean) {
  const store = getProgress();
  const existing = store.lessons[lessonId] ?? { completed: false, updatedAt: 0 };
  const fallbackTotal = existing.total ?? (existing.score && existing.score > 0 ? existing.score : 1);
  const updated = {
    ...existing,
    completed,
    score: completed ? existing.score ?? fallbackTotal : 0,
    total: existing.total ?? fallbackTotal,
    updatedAt: Date.now()
  } satisfies LessonProgress;
  store.lessons[lessonId] = updated;
  setProgress(store);
  if (typeof window !== 'undefined') {
    const total = updated.total ?? 1;
    const score = updated.completed ? updated.score ?? total : 0;
    window.dispatchEvent(
      new CustomEvent('lesson-progress', {
        detail: { lessonId, score, total }
      })
    );
  }
  return updated;
}

export function markPerfect(lessonId: string, totalQuestions: number) {
  const store = getProgress();
  store.lessons[lessonId] = {
    completed: true,
    score: totalQuestions,
    total: totalQuestions,
    updatedAt: Date.now()
  };
  setProgress(store);
  return store.lessons[lessonId];
}

export function clearProgress() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
