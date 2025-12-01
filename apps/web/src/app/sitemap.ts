import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pv-erp.com").replace(/\/$/, "");

function getLastModified(filePath: string): Date {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

function getDocEntries(): MetadataRoute.Sitemap {
  const docsDir = path.join(process.cwd(), "content", "docs");
  if (!fs.existsSync(docsDir)) return [];

  return fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const slug = entry.name === "index.mdx" ? "" : `/${entry.name.replace(/\.mdx$/, "")}`;
      const lastModified = getLastModified(path.join(docsDir, entry.name));

      return {
        url: `${BASE_URL}/docs${slug}`,
        lastModified,
      };
    });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "src", "app");
  const includeTodos = process.env.INCLUDE_TODOS !== "false";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: getLastModified(path.join(appDir, "(site)", "page.tsx")),
    },
    ...(includeTodos
      ? [
          {
            url: `${BASE_URL}/todos`,
            lastModified: getLastModified(path.join(appDir, "(site)", "todos", "page.tsx")),
          },
        ]
      : []),
  ];

  return [...staticRoutes, ...getDocEntries()];
}
