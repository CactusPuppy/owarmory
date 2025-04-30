export async function api<T>(
  path: string,
  params?: Record<string, string>,
  serverFetch: typeof fetch | null = null,
): Promise<T | null> {
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    path += `?${queryString}`;
  }

  try {
    const response = await (serverFetch || fetch)(`/api/${path}`);
    const parsed = await response.json();

    return parsed;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
