import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { internalQueryGeneric, queryGeneric } from "convex/server";
import { Id } from "./_generated/dataModel";

export const createProfile = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { firstName, lastName, email }) => {
    if (!firstName || !lastName || !email)
      return {
        error: "Missing required fields",
        status: 400,
      };

    const profile = await ctx.db.insert("profile", {
      firstName,
      lastName,
      email,
    });

    if (!profile)
      return {
        error: "Failed to create profile",
        status: 500,
      };
    return {
      status: 201,
    };
  },
});

export const getProfile = query({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { firstName }) => {
    return await ctx.db
      .query("profile")
      .filter((q) => q.eq(q.field("firstName"), firstName))
      .first();
  },
});
