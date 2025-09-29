import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { HOME_BLOCK_KINDS, HOME_BLOCK_TEMPLATES } from "@pv-erp/shared/home-block-templates";

type HomeBlockKind = (typeof HOME_BLOCK_KINDS)[number];

type InsertableBlock = {
  kind: HomeBlockKind;
  order: number;
  isVisible: boolean;
  active: boolean;
  data: Record<string, unknown>;
};

const HOME_PAGE_SLUG = "home";

const DEFAULT_BLOCKS: InsertableBlock[] = HOME_BLOCK_KINDS.map((kind, index) => ({
  kind,
  order: index,
  isVisible: true,
  active: true,
  data: structuredClone(HOME_BLOCK_TEMPLATES[kind] ?? {}),
}));

export const seedHome = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    let page = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", HOME_PAGE_SLUG))
      .first();

    if (!page) {
      const pageId = await ctx.db.insert("pages", {
        slug: HOME_PAGE_SLUG,
        title: "Trang chủ",
        active: true,
        updatedAt: now,
        seoOverride: undefined,
      });
      page = await ctx.db.get(pageId);
    }

    if (!page?._id) {
      throw new Error("Không thể khởi tạo trang home");
    }

    const existingBlocks = await ctx.db
      .query("page_blocks")
      .withIndex("by_page_order", (q) => q.eq("pageId", page._id))
      .collect();

    if (existingBlocks.length === 0) {
      for (const block of DEFAULT_BLOCKS) {
        await ctx.db.insert("page_blocks", {
          pageId: page._id,
          kind: block.kind,
          order: block.order,
          isVisible: block.isVisible,
          active: block.active,
          data: block.data,
          locale: undefined,
          updatedAt: now,
          updatedBy: undefined,
        });
      }
    }

    return { ok: true, pageId: page._id } as const;
  },
});

function structuredClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
