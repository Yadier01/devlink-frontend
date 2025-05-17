import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";
import { internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const createProfile = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    links: v.optional(v.array(v.id("links"))),
  },
  handler: async (ctx, { firstName, lastName, email, links }) => {
    if (!firstName || !lastName || !email)
      throw new Error("Missing required fields");

    // Check if profile already exists
    const user = await ctx.auth.getUserIdentity();
    const exists = await ctx.db
      .query("profile")
      .withIndex("by_userId", (q) => q.eq("userId", user?.subject!))
      .unique();

    if (exists) {
      ctx.db.patch(exists._id, {
        firstName,
        lastName,
        email,
      });
      return { status: 200, message: "Profile updated sucessfully" };
    }
    // Create profile if it doesn't exist
    const profile = await ctx.db.insert("profile", {
      name: user?.nickname!,
      firstName,
      lastName,
      email,
      userId: user?.subject!,
    });

    if (!profile) throw new Error("Failed to create profile");
  },
});

export const getProfile = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("profile")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique();
  },
});

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    console.log(user);
    return await ctx.db
      .query("profile")
      .withIndex("by_userId", (q) => q.eq("userId", user?.subject!))
      .unique();
  },
});

export const createLink = mutation({
  args: {
    links: v.array(
      v.object({
        _id: v.optional(v.id("links")),
        platform: v.string(),
        url: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const profile = await ctx.db
      .query("profile")
      .withIndex("by_name", (q) => q.eq("name", user.nickname!))
      .unique();

    if (!profile) throw new Error("Profile not found");

    const links = await ctx.runQuery(internal.profile.getLinks, {
      profileId: profile._id,
    });

    args.links.forEach(async (link) => {
      const linkExists = links.find((l) => link._id === l._id);

      if (linkExists) {
        if (
          linkExists.platform !== link.platform ||
          linkExists.url !== link.url
        ) {
        }
        await ctx.db.patch(linkExists._id, {
          platform: link.platform,
          url: link.url,
        });
      } else if (!linkExists) {
        await ctx.db.insert("links", {
          platform: link.platform,
          url: link.url,
          profileId: profile._id,
        });
      }
    });
  },
});
export const getLinks = internalQuery({
  args: {
    profileId: v.id("profile"),
  },
  handler: async (ctx, args) => {
    //  const  profile= await ctx.db
    //     .query("profile")
    //     .withIndex("by_name", (q) => q.eq("name", args.name))
    //     .unique();
    //   const links = await getManyFrom(ctx.db, "links", "profileId", profile._id);
    return await ctx.db
      .query("links")
      .withIndex("by_profile_id", (q) => q.eq("profileId", args.profileId))
      .collect();
  },
});

export const getLink = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const profile = await ctx.db
      .query("profile")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject!))
      .unique();

    if (!profile) throw new Error("Profile not found");
    return await ctx.db
      .query("links")
      .withIndex("by_profile_id", (q) => q.eq("profileId", profile._id))
      .collect();
  },
});
