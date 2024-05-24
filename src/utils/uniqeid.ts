export function generateUniqueId(): string {
  // Generate a random alphanumeric ID
  return Math.random().toString(36).substr(2, 9);
}
