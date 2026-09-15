/**
 * Utility to convert section headings into clean, URL-safe anchor IDs.
 */
export function slugifyHeading(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/^[0-9]+[\.\)\-]?\s*/, '') // Strip leading numbers like "1. " or "2) "
    .replace(/[^\w\s-]/g, '')           // Remove special characters
    .trim()
    .replace(/\s+/g, '-')              // Replace spaces with dashes
    .slice(0, 60);                     // Limit length
}

export interface TocItem {
  id: string;
  title: string;
  level?: number;
}
