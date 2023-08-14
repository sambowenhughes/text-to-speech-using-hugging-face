import { type ClassValue, clsx } from "clsx"; // Importing from the clsx library
import { twMerge } from "tailwind-merge"; // Importing the twMerge function from the tailwind-merge library

/**
 * Combines multiple class names and returns a merged class name string.
 * @param {...ClassValue[]} inputs - Class names or class name arrays to be merged.
 * @returns {string} - Merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  // Merge class names using clsx and twMerge
  return twMerge(clsx(inputs));
}
