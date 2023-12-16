import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  DocumentData: defineTable({
    title: v.string(),
    owner: v.string(),
    isPublished: v.boolean(),
    Content_Ref: v.id("DocumentContent"),
  }).index("Own_Docs", ["owner"]),
  DocumentContent: defineTable({
    content: v.string(),
  }),
});
