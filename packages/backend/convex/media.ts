import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

export const generateUploadUrl = action({
  args: {},
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return { uploadUrl };
  },
});

export const saveImage = mutation({
  args: {
    title: v.optional(v.string()),
    storageId: v.id("_storage"),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    format: v.optional(v.string()),
    sizeBytes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("media", {
      kind: "image",
      title: args.title,
      storageId: args.storageId,
      width: args.width,
      height: args.height,
      format: args.format ?? "webp",
      sizeBytes: args.sizeBytes,
      createdAt: now,
    });
    return await ctx.db.get(id);
  },
});

export const createVideo = mutation({
  args: {
    title: v.optional(v.string()),
    externalUrl: v.string(),
  },
  handler: async (ctx, { title, externalUrl }) => {
    const now = Date.now();
    const id = await ctx.db.insert("media", {
      kind: "video",
      title,
      externalUrl,
      createdAt: now,
    });
    return await ctx.db.get(id);
  },
});

export const list = query({
  args: { kind: v.optional(v.union(v.literal("image"), v.literal("video"))) },
  handler: async (ctx, { kind }) => {
    let docs;
    if (kind) {
      docs = await ctx.db
        .query("media")
        .withIndex("by_kind", (q) => q.eq("kind", kind))
        .collect();
    } else {
      docs = await ctx.db.query("media").collect();
    }

    const activeDocs = docs.filter((doc) => !doc.deletedAt);

    const items = await Promise.all(
      activeDocs.map(async (doc) => {
        if (doc.kind === "image" && doc.storageId) {
          try {
            const url = await ctx.storage.getUrl(doc.storageId);
            return { ...doc, url };
          } catch (_err) {
            return { ...doc };
          }
        }
        return doc;
      }),
    );

    return items;
  },
});

export const remove = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return false;

    if (doc.kind === "image" && doc.storageId) {
      try {
        await ctx.storage.delete(doc.storageId);
      } catch (_err) {
        // ignore missing blob
      }
    }

    await ctx.db.delete(id);
    return true;
  },
});

export const update = mutation({
  args: {
    id: v.id("media"),
    title: v.optional(v.string()),
    externalUrl: v.optional(v.string()),
  },
  handler: async (ctx, { id, title, externalUrl }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return null;

    const patch: Record<string, unknown> = {};
    if (title !== undefined) patch.title = title;
    if (externalUrl !== undefined) patch.externalUrl = externalUrl;

    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(id, patch);
    }

    return id;
  },
});

export const replaceImage = mutation({
  args: {
    id: v.id("media"),
    storageId: v.id("_storage"),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    format: v.optional(v.string()),
    sizeBytes: v.optional(v.number()),
  },
  handler: async (ctx, { id, storageId, width, height, format, sizeBytes }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return null;
    if (doc.kind !== "image") throw new Error("Not an image");

    if (doc.storageId && doc.storageId !== storageId) {
      try {
        await ctx.storage.delete(doc.storageId);
      } catch (_err) {
        // ignore missing blob
      }
    }

    const patch: Record<string, unknown> = { storageId };
    if (width !== undefined) patch.width = width;
    if (height !== undefined) patch.height = height;
    if (format !== undefined) patch.format = format;
    if (sizeBytes !== undefined) patch.sizeBytes = sizeBytes;

    await ctx.db.patch(id, patch);
    return id;
  },
});

export const getImageUrl = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return { url };
  },
});

export const forceRemove = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, { id }) => {
    const exist = await ctx.db.get(id);
    if (!exist) return false;
    await ctx.db.delete(id);
    return true;
  },
});
