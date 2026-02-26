// Format date helper
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Reading time calculator
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Category color mapping
export function getCategoryColor(color: string | undefined): string {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };
  return colors[color || 'blue'] || colors.blue;
}

// Category icon mapping
export function getCategoryIcon(icon: string | undefined): string {
  const icons: Record<string, string> = {
    cloud: '☁️',
    ai: '🤖',
    leadership: '🎯',
  };
  return icons[icon || 'cloud'] || '📝';
}

// Truncate text helper
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
