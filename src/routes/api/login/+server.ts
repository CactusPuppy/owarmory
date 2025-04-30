import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants/auth";

export async function GET({ cookies }) {
  const headers = { "Content-Type": "application/json" };

  // A user would be fetched here first, and a cookie would only be set if the user is set

  const currentUser = { username: "some-user#1234" };

  if (!currentUser) {
    return new Response(JSON.stringify({ status: "Error" }), { headers, status: 403 });
  }

  cookies.set(AUTH_TOKEN_COOKIE_NAME, "some-token", { path: "/", maxAge: 31536000 });

  return new Response(JSON.stringify(currentUser), { headers });
}
