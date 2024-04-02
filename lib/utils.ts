import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SoundLevels {
  l10: number;
  l50: number;
  l90: number;
  lmax: number;
  lmin: number;
}

export function calculateLeq(levels: SoundLevels): number {
  const { l10, l50, l90 } = levels;
  const leq = l50 + ((l10 - l90) * (2 / 56));
  return leq;
}


export function calculateLNP(leq: number, levels: SoundLevels): number {
  const { l10, l90 } = levels;
  const lnp = leq + (l10 - l90);
  return lnp;
}

export function calculateTNI(levels: SoundLevels): number {
  const { l10, l90 } = levels;
  const tni = 4 * (l10 - l90) + l90 - 30;
  return tni;
}

export function calculateNC(levels: SoundLevels): number {
  const { l10, l90 } = levels;
  const nc = l10 - l90;
  return nc;
}