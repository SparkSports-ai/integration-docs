import { clsx, type ClassValue } from 'cnfast';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
