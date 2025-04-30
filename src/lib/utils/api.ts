export async function api<T>(
  path: string,
  serverFetch: typeof fetch | null = null,
  options: RequestInit = {},
): Promise<T> {
  const response = await (serverFetch || fetch)(`/api/${path}`, options);
  const parsed = await response.json();

  if (!response.ok) throw { message: parsed.message, status: response.status };

  return parsed;
}
