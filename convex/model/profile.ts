import { QueryCtx } from "../_generated/server";

export async function getUserProfile(ctx: QueryCtx, args: { name: string }) {
  return await ctx.db
    .query("profile")
    .withIndex("by_name", (q) => q.eq("name", args.name))
    .unique();
}
