import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

type MediaDoc = Doc<"media">;
type MediaKind = MediaDoc["kind"];
type MediaWithUrl = MediaDoc & { url?: string };

type StorageCtx = {
  storage: {
    getUrl: (storageId: Id<"_storage">) => Promise<string | null>;
  };
};

function isImage(doc: MediaDoc): doc is MediaDoc & { storageId: Id<"_storage"> } {
  return doc.kind === "image" && !!doc.storageId;
}

async function buildMediaPayload(ctx: StorageCtx, doc: MediaDoc): Promise<MediaWithUrl> {
  if (isImage(doc)) {
    try {
      const url = await ctx.storage.getUrl(doc.storageId);
      return url ? { ...doc, url } : { ...doc };
    } catch (_error) {
      return { ...doc };
    }
  }
  return doc;
}

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
      deletedAt: undefined,
    });

    const doc = await ctx.db.get(id);
    if (!doc) {
      throw new Error("Image not found after insert");
    }

    return await buildMediaPayload(ctx, doc);
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
      deletedAt: undefined,
    });
    return await ctx.db.get(id);
  },
});

export const list = query({
  args: { kind: v.optional(v.union(v.literal("image"), v.literal("video"))) },
  handler: async (ctx, { kind }) => {
    let docs: MediaDoc[];
    if (kind) {
      docs = await ctx.db
        .query("media")
        .withIndex("by_kind", (q) => q.eq("kind", kind))
        .collect();
      docs = docs.filter((doc) => !doc.deletedAt);
    } else {
      docs = await ctx.db
        .query("media")
        .withIndex("by_deleted", (q) => q.eq("deletedAt", undefined))
        .collect();
    }

    docs.sort((a, b) => b.createdAt - a.createdAt);
    return Promise.all(docs.map((doc) => buildMediaPayload(ctx, doc)));
  },
});

export const update = mutation({
  args: {
    id: v.id("media"),
    title: v.optional(v.string()),
    externalUrl: v.optional(v.string()),
  },
  handler: async (ctx, { id, title, externalUrl }) => {
    const patch: Record<string, unknown> = {};
    if (title !== undefined) patch.title = title;
    if (externalUrl !== undefined) patch.externalUrl = externalUrl;

    if (Object.keys(patch).length === 0) {
      return { ok: true } as const;
    }

    await ctx.db.patch(id, patch);
    return { ok: true } as const;
  },
});

export const remove = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return { ok: false } as const;

    if (isImage(doc)) {
      try {
        await ctx.storage.delete(doc.storageId);
      } catch (_error) {
        // ignore missing blob to keep soft delete flow resilient
      }
    }

    await ctx.db.patch(id, { deletedAt: Date.now() });
    return { ok: true } as const;
  },
});

export const forceRemove = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (doc && isImage(doc)) {
      try {
        await ctx.storage.delete(doc.storageId);
      } catch (_error) {
        // swallow storage deletion failure
      }
    }
    await ctx.db.delete(id);
    return { ok: true } as const;
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
    if (!doc) return { ok: false } as const;
    if (!isImage(doc)) throw new Error("Only image media can be replaced");

    if (doc.storageId && doc.storageId !== storageId) {
      try {
        await ctx.storage.delete(doc.storageId);
      } catch (_error) {
        // ignore missing blob
      }
    }

    const patch: Record<string, unknown> = { storageId };
    if (width !== undefined) patch.width = width;
    if (height !== undefined) patch.height = height;
    if (format !== undefined) patch.format = format;
    if (sizeBytes !== undefined) patch.sizeBytes = sizeBytes;

    await ctx.db.patch(id, patch);
    return { ok: true } as const;
  },
});

export const getImageUrl = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return { url };
  },
});
