import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddDocuments = mutation({
  args: {
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    const { owner } = args;
    const datatoAdd = {
      title: "Untitled",
      owner: owner,
      isPublished: false,
    };
    const _content_Id = await ctx.db.insert("DocumentContent", {
      content: "",
    });
    await ctx.db.insert("DocumentData", {
      ...datatoAdd,
      Content_Ref: _content_Id,
    });
  },
});

export const GetDocuments = query({
  args: { uid: v.any() },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query("DocumentData")
      .withIndex("Own_Docs", (e) => e.eq("owner", args.uid))
      .collect();
    return docs;
  },
});

export const GetDocumentDataByIdForPageView = query({
  args: { id: v.union(v.id("DocumentData"), v.null()) },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) {
      return { authorised: false };
    }
    try {
      const data = await ctx.db.get(id);
      if (!data?.isPublished) {
        return { authorised: false };
      }
      return { authorised: true, ...data };
    } catch (err) {
      return { authorised: false };
    }
  },
});

export const GetDocumentContentByIdForPageView = query({
  args: { id: v.union(v.id("DocumentContent"), v.null()) },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) {
      return { authorised: false };
    }
    try {
      const data = await ctx.db.get(id);
      return { ...data, authorised: true };
    } catch (err) {
      return { authorised: false };
    }
  },
});

export const UpdateDocumentsData = mutation({
  args: {
    id: v.id("DocumentData"),
    uid: v.string(),
    key: v.string(),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const { id, uid, key, value } = args;

    const data = await ctx.db.get(id);
    if (!data) {
      return { authorised: false };
    }
    // if (data?.owner !== uid) {
    //   throw new Error("Not Authorized for this Action");
    // }
    await ctx.db.patch(id, {
      [key]: value,
    });
    return { authorised: true };
  },
});

export const UpdateDocumentsContentData = mutation({
  args: {
    id: v.id("DocumentContent"),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const { id, value } = args;
    await ctx.db.patch(id, {
      content: value,
    });
  },
});

export const DeleteDocumentById = mutation({
  args: { id: v.id("DocumentData"), uid: v.string() },
  handler: async (ctx, args) => {
    const { id, uid } = args;

    const data = await ctx.db.get(id);

    if (data?.owner !== uid) {
      throw new Error("Not Authorized for this Action");
    }
    await ctx.db.delete(data?.Content_Ref);
    await ctx.db.delete(id);
  },
});
