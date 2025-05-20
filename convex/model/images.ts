import { getUserProfileByUserId } from "./profile";
import { QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const getImage = async (ctx: QueryCtx) => {
  const profile = await getUserProfileByUserId(ctx);
  if (!profile) return null;
  return await ctx.db
    .query("images")
    .withIndex("by_profile_id", (q) => q.eq("profileId", profile._id))
    .unique();
};

export const getProfileImage = async (
  ctx: QueryCtx,
  profileId: Id<"profile">
) => {
  const image = await ctx.db
    .query("images")
    .withIndex("by_profile_id", (q) => q.eq("profileId", profileId))
    .unique();

  if (!image) return null;
  return await ctx.storage.getUrl(image?.url);
};
