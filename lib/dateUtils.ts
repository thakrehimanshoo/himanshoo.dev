/**
 * Format a date with day, month abbreviation, date, year, and time
 * Example: "Mon, Dec 27, 2025 at 3:45 PM"
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = dayNames[d.getDay()];
  const monthName = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  // Format time in 12-hour format
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${dayName}, ${monthName} ${day}, ${year} at ${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format a date without time
 * Example: "Mon, Dec 27, 2025"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = dayNames[d.getDay()];
  const monthName = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${dayName}, ${monthName} ${day}, ${year}`;
}

/**
 * Check if a post was edited (updatedAt is different from createdAt)
 */
export function wasEdited(createdAt: Date | string, updatedAt: Date | string): boolean {
  const created = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const updated = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;

  // Consider edited if more than 1 minute difference
  return Math.abs(updated.getTime() - created.getTime()) > 60000;
}
