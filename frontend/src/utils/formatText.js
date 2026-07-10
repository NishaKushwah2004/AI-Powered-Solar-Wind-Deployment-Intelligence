export function truncateText(text, maxLength = 80) {
  if (!text) return "-";

  return text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text;
}