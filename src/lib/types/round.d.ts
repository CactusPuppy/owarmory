import type { FullStadiumBuild } from "./build";

export type FullRoundInfo = FullStadiumBuild["roundInfos"][number];
export type FullRoundSectionInfo = FullRoundInfo["sections"][number];
export type CurrentRound = { value: number };
