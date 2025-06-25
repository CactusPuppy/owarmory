export function camelCaseToTitleCase(camelCaseString: string): string {
  return camelCaseString
    .replace(/((?<![A-Z])[A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

const combiningUnicodeChars = /[\u0300-\u036F]/g;
export function transliterate(input: string): string {
  return input.normalize("NFKD").replace(combiningUnicodeChars, "").replace("\u00E6", "ae");
}
