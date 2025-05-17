import { Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export async function getUserLinks(ctx: QueryCtx, profileId: Id<"profile">) {
  return await ctx.db
    .query("links")
    .withIndex("by_profile_id", (q) => q.eq("profileId", profileId))
    .collect();
}
