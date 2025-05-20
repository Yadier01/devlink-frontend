import { MutationCtx, QueryCtx } from "../_generated/server";

export async function getUserProfileByName(ctx: QueryCtx, name: string) {
  return await ctx.db
    .query("profile")
    .withIndex("by_name", (q) => q.eq("name", name))
    .unique();
}

export async function getUserProfileByUserId(ctx: QueryCtx) {
  const user = await ctx.auth.getUserIdentity();
  if (!user) return null;
  return await ctx.db
    .query("profile")
    .withIndex("by_userId", (q) => q.eq("userId", user.subject!))
    .unique();
}
