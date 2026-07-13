/**
 * Pure, reusable helper functions (no React, no side effects).
 * Add date/number/string formatters and small utilities here.
 */

/** Format a number with thousands separators, e.g. 33755 -> "33,755". */
export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return '-';
  return new Intl.NumberFormat('en-IN').format(Number(value));
}

/** Format an ISO date string to a readable form. */
export function formatDate(iso) {
  if (!iso) return '-';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}
