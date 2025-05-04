export function camelCaseToTitleCase(camelCaseString: string): string {
  return camelCaseString
    .replace(/((?<![A-Z])[A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
