const STORAGE_KEY = 'htl:progress';

type ProgressState = {
  completed: string[];
};

function safeParse(value: string | null): ProgressState {
  if (!value) return { completed: [] };
  try {
    const parsed = JSON.parse(value) as ProgressState;
    if (!Array.isArray(parsed.completed)) return { completed: [] };
    return { completed: parsed.completed };
  } catch (error) {
    console.warn('Unable to parse stored progress', error);
    return { completed: [] };
  }
}

function read(): ProgressState {
  if (typeof window === 'undefined') return { completed: [] };
  try {
    return safeParse(window.localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.warn('Unable to access progress storage', error);
    return { completed: [] };
  }
}

function write(state: ProgressState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to persist progress', error);
  }
}

export function markLessonComplete(id: string) {
  const state = read();
  if (!state.completed.includes(id)) {
    state.completed.push(id);
    write(state);
  }
}

export function resetLessonProgress(id: string) {
  const state = read();
  state.completed = state.completed.filter((item) => item !== id);
  write(state);
}

export function getProgressState() {
  return read();
}

export function isLessonComplete(id: string) {
  return read().completed.includes(id);
}
