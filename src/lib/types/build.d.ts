import type { Prisma } from "$src/generated/prisma";

export type FullStadiumBuild = Prisma.StadiumBuildGetPayload<{
  include: {
    roundInfos: {
      include: {
        sections: {
          include: {
            power: true;
            items: true;
          };
        };
      };
    };
  };
}>;
