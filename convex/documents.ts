import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId: userId,
      isArchived: false,
      isPublished: false
    });

    return document;
  }
})

export const getUserDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) => (
            q.eq("userId", userId)
        ))
        .filter((q) => (
            q.eq(q.field("isArchived"), false)
        ))
        .order("desc")
        .collect();

    return documents;
  },
});