import type { SlashPrefixedString } from "$lib/types/path";

export async function api<T>(
  path: SlashPrefixedString,
  params?: Record<string, string>,
  serverFetch: typeof fetch | null = null,
  options: RequestInit = {},
): Promise<T> {
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    path += `?${queryString}`;
  }

  const response = await (serverFetch || fetch)(`/api${path}`, options);
  const errorType = response.headers.get("X-Error-Type");
  const parsed = await response.json();

  if (!response.ok) throw { message: parsed.message, status: response.status, errorType };

  return parsed;
}
