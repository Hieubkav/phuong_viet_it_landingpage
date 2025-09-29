import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getById = query({
  args: { id: v.id("page_blocks") },
  handler: async (ctx, { id }) => {
    const block = await ctx.db.get(id);
    return block ?? null;
  },
});

export const getForPage = query({
  args: { pageId: v.optional(v.id("pages")) },
  handler: async (ctx, { pageId }) => {
    if (!pageId) return [] as const;

    const blocks = await ctx.db
      .query("page_blocks")
      .withIndex("by_page_order", (q) => q.eq("pageId", pageId))
      .collect();

    return blocks.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    pageId: v.id("pages"),
    kind: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
    active: v.boolean(),
    data: v.any(),
    locale: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("page_blocks", { ...args, updatedAt: now });
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("page_blocks"),
    kind: v.optional(v.string()),
    order: v.optional(v.number()),
    isVisible: v.optional(v.boolean()),
    active: v.optional(v.boolean()),
    data: v.optional(v.any()),
    locale: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patch }) => {
    const now = Date.now();
    await ctx.db.patch(id, { ...patch, updatedAt: now });
    return { ok: true } as const;
  },
});

export const remove = mutation({
  args: { id: v.id("page_blocks") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { ok: true } as const;
  },
});

export const reorder = mutation({
  args: { pageId: v.id("pages"), orderedIds: v.array(v.id("page_blocks")) },
  handler: async (ctx, { pageId, orderedIds }) => {
    const now = Date.now();
    for (let i = 0; i < orderedIds.length; i++) {
      await ctx.db.patch(orderedIds[i], { order: i, updatedAt: now });
    }

    const blocks = await ctx.db
      .query("page_blocks")
      .withIndex("by_page_order", (q) => q.eq("pageId", pageId))
      .collect();

    return blocks.sort((a, b) => a.order - b.order);
  },
});

export const toggleVisibility = mutation({
  args: { id: v.id("page_blocks"), isVisible: v.boolean() },
  handler: async (ctx, { id, isVisible }) => {
    await ctx.db.patch(id, { isVisible, updatedAt: Date.now() });
    return { ok: true } as const;
  },
});

export const bulkToggleVisibility = mutation({
  args: { ids: v.array(v.id("page_blocks")), isVisible: v.boolean() },
  handler: async (ctx, { ids, isVisible }) => {
    const now = Date.now();
    for (const id of ids) {
      await ctx.db.patch(id, { isVisible, updatedAt: now });
    }
    return { ok: true, count: ids.length } as const;
  },
});
