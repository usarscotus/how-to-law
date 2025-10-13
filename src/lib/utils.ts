import { clsx } from 'clsx';

export function cx(...inputs: Parameters<typeof clsx>) {
  return clsx(inputs);
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

export function formatMinutes(minutes: number) {
  if (!Number.isFinite(minutes)) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}
