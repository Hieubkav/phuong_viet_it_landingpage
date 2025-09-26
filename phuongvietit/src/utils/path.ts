// src/utils/path.ts
export const withBasePath = (p: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const clean = p.startsWith("/") ? p : `/${p}`;
  return `${base}${clean}`;
};
