import { testBuildData } from "$lib/data/testData";
import type { Build } from "$lib/types/build";

export async function GET() {
  const headers = { "Content-Type": "application/json" };

  const builds: Build[] = [];
  for (let index = 0; index < 10; index++) {
    builds.push(testBuildData);
  }

  return new Response(JSON.stringify(builds), { headers });
}
