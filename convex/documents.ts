import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
	args: {
		title: v.string()
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
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
});

export const getUserDocuments = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
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
	}
});

export const getUserDeletedDocuments = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const userId = identity.subject;

		const documents = await ctx.db
			.query("documents")
			.withIndex("by_user", (q) => (
				q.eq("userId", userId)
			))
			.filter((q) => (
				q.eq(q.field("isArchived"), true)
			))
			.order("desc")
			.collect();

		return documents;
	}
});

export const archive = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (userId !== existingDocument?.userId) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.patch(args.id, {
			isArchived: true
		});

		return document;
	}
});

export const remove = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (userId !== existingDocument?.userId) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.delete(args.id);

		return document;
	}
});

export const restore = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (userId !== existingDocument?.userId) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.patch(args.id, {
			isArchived: false
		});

		return document;
	}
});

export const getSearchDocuments = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated")
		}

		const userId = identity.subject;

		const documents = ctx.db
			.query("documents")
			.withIndex("by_user", (q) => (
				q.eq("userId", userId)
			))
			.order("desc")
			.collect();

		return documents;
	}
});

export const getById = query({
	args: { documentId: v.id("documents") },
	handler: async (ctx, args) => {
		const document = await ctx.db.get(args.documentId);

		if (!document) {
			throw new ConvexError("Not found");
		}

		if (document?.isPublished && !document.isArchived) {
			return document;
		}

		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const userId = identity.subject;

		if (document?.userId !== userId) {
			throw new ConvexError("Unauthorized");
		}

		return document;
	}
});

export const update = mutation({
	args: {
		id: v.id("documents"),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		icon: v.optional(v.string()),
		coverImage: v.optional(v.string()),
	},
	handler:async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);
		
		if (!existingDocument) {
			throw new ConvexError("Not found");
		}

		if (existingDocument.userId !== userId) {
			throw new ConvexError("Unauthorized");
		}

		const { id, ...patches } = args;

		const document = ctx.db.patch(id, patches);

		return document;
	}
})