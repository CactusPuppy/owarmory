export async function api<T>(path: string, serverFetch = null): Promise<T | null> {
  try {
    const response = await (serverFetch || fetch)(`/api/${path}`);
    const parsed = await response.json();

    return parsed;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
