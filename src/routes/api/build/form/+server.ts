import { heroes } from '$src/lib/constants/heroData.js';
import type { FullStadiumBuild } from '$src/lib/types/build.js';
import type { FullRoundInfo } from '$src/lib/types/round.js';

const headers = { "Content-Type": "application/json" };

export async function POST({ request }) {
  const build: FullStadiumBuild = await request.json();

  try {
    validate(build);
  } catch (error: unknown) {
    return new Response(JSON.stringify({ message: error.message }), { headers, status: 500 });
  }

  // Pretend to post `data` to the DB
  await new Promise(res => setTimeout(res, 500));

  const response = {};

  return new Response(JSON.stringify(response), { headers });
}

export async function PATCH({ request }) {
  const build: FullStadiumBuild = await request.json();

  // Pretend to fetch the build to PATCH
  await new Promise(res => setTimeout(res, 500));

  try {
    validate(build);
  } catch (error: unknown) {
    return new Response(JSON.stringify({ message: error.message }), { headers, status: 500 });
  }

  // Pretend to post `data` to the DB
  await new Promise(res => setTimeout(res, 500));

  const response = {};

  return new Response(JSON.stringify(response), { headers });
}

function validate(build: FullStadiumBuild) {
  // Title
  if (!build.buildTitle) throw new Error("No build title was given.");
  if (build.buildTitle.length < 10) throw new Error("Given title was too short. Requires at least 10 characters.");
  if (build.buildTitle.length > 70) throw new Error("Given title was too long. Max 70 characters.");

  // Introduction
  if (!build.description) throw new Error("No introduction was given.");
  if (build.description.length < 20) throw new Error("Given introduction was too short. Requires at least 20 characters.");
  if (build.description.length > 200) throw new Error("Given introduction was too long. Max 200 characters.");

  // Hero
  if (!build.heroName) throw new Error("No hero was selected.");
  if (!heroes.map((hero) => hero.name).includes(build.heroName)) throw new Error("An invalid hero was selected.");

  // Rounds
  if (build.roundInfos.length < 7) throw new Error("Not all rounds were given.");
  if (build.roundInfos.some((i: FullRoundInfo) => i.sections?.length !== 1)) throw new Error("Some rounds contain invalid data.");

  // Description
  if (build.additionalNotes.length > 5000) throw new Error("Given description was too long. Max 5000 characters.");
}
