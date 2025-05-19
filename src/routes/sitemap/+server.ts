import { prisma } from "$src/database/prismaClient.server";
import { buildPath, heroPath } from "$lib/utils/routes.js";
import { heroes } from "$src/lib/constants/heroData.js";

export async function GET({ url }) {
  const host = url.origin.slice(0, url.origin.length); // Removing trailing slash

  const builds = await prisma.stadiumBuild.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10000, // As many as we got, really. We're fine with slow responses here.
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

      <url>
        <loc>${host}</loc>
        <changefreq>daily</changefreq>
      </url>

      <url>
        <loc>${host}/latest</loc>
        <changefreq>daily</changefreq>
      </url>

      ${heroes
    .map(
      (hero) => `
        <url>
          <loc>${host}${heroPath(hero.name)}</loc>
          <changefreq>daily</changefreq>
        </url>
      `,
    )
    .join("")}

      ${builds
    .map(
      (build) => `
        <url>
          <loc>${host}${buildPath(build)}</loc>
          <lastmod>${build.updatedAt}</lastmod>
        </url>
      `,
    )
    .join("")}
    </urlset>
  `;

  return new Response(body, {
    headers: {
      "Cache-Control": "max-age=14400",
      "Content-Type": "application/xml",
    },
  });
}
