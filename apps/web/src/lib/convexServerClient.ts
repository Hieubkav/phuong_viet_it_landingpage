import { ConvexHttpClient } from "convex/browser";

let client: ConvexHttpClient | null = null;

export function getConvexServerClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL;
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL or CONVEX_URL environment variable");
  }
  if (!client) {
    client = new ConvexHttpClient(url);
  }
  return client;
}
