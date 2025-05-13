/** Replace all non standard characters with a -, and replace repeating -- with a single -, without leading or trailing - */
export function toSlug(string: string): string {
  return string
    .replace(/[^a-z0-9]/gi, " ")
    .trim()
    .replaceAll(" ", "-")
    .toLowerCase()
    .replace(/-+/g, "-");
}
