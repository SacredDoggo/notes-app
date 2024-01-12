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
});

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
	}
});

export const getUserDeletedDocuments = query({
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
			throw new Error("Not Authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (userId !== existingDocument?.userId) {
			throw new Error("Unauthorized");
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
			throw new Error("Not Authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (userId !== existingDocument?.userId) {
			throw new Error("Unauthorized");
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
			throw new Error("Not Authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (userId !== existingDocument?.userId) {
			throw new Error("Unauthorized");
		}

		const document = await ctx.db.patch(args.id, {
			isArchived: false
		});

		return document;
	}
});