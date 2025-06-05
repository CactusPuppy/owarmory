import { redirect } from "@sveltejs/kit";

export async function GET() {
  redirect(302, "/admin/talents/items");
}
