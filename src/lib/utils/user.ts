/** Returns battle tag without the delimiter. User#123 -> User. */
export function cleanName(name: string): string {
  return name.split("#")[0];
}
