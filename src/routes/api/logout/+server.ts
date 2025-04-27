import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants/auth";

export async function GET({ cookies }) {
  const headers = { "Content-Type": "application/json" };

  cookies.delete(AUTH_TOKEN_COOKIE_NAME, { path: "/" });

  return new Response(JSON.stringify(true), { headers });
};
