export function highlightText(text, query) {
  if (!query?.trim() || !text) return text
  try {
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300/30 text-yellow-200 rounded px-0.5">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  } catch {
    return text
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
