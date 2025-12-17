/**
 * @fileoverview Utility functions for the application
 * @module lib/utils
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @function cn
 * @param {...ClassValue[]} inputs - Class names or class name objects to be combined
 * @returns {string} Merged class names string
 * @example
 * // Returns 'p-4 bg-red-500 hover:bg-red-600'
 * cn('p-4', 'bg-red-500', 'hover:bg-red-600')
 * 
 * @example
 * // Returns 'p-4 bg-blue-500'
 * cn('p-4', { 'bg-red-500': false, 'bg-blue-500': true })
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
