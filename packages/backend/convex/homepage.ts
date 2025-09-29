import { query } from "./_generated/server";
import { v } from "convex/values";

export const getHomepage = query({
  args: {
    slug: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = args.slug ?? "home";
    const locale = args.locale;

    const page = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!page) {
      return {
        page: null,
        blocks: [] as const,
        settings: null,
      } as const;
    }

    const rawBlocks = await ctx.db
      .query("page_blocks")
      .withIndex("by_page_order", (q) => q.eq("pageId", page._id))
      .collect();

    const blocks = rawBlocks
      .filter((block) => block.active !== false && block.isVisible !== false)
      .filter((block) => !locale || !block.locale || block.locale === locale)
      .sort((a, b) => a.order - b.order);

    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site"))
      .first();

    return {
      page,
      blocks,
      settings: settings ?? null,
    } as const;
  },
});
