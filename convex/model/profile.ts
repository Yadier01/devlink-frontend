import { MutationCtx, QueryCtx } from "../_generated/server";

export async function getUserProfile(ctx: QueryCtx, name: string) {
  return await ctx.db
    .query("profile")
    .withIndex("by_name", (q) => q.eq("name", name))
    .unique();
}

export async function getUserProfileByUserId(ctx: QueryCtx, user: string) {
  return await ctx.db
    .query("profile")
    .withIndex("by_userId", (q) => q.eq("userId", user))
    .unique();
}
