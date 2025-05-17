import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserProfile, getUserProfileByUserId } from "./model/profile";
import { getUserLinks } from "./model/links";

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
    if (!user) throw new Error("Not authenticated");

    const exists = await getUserProfileByUserId(ctx, user?.subject!);

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
    const profile = await getUserProfile(ctx, args.name);

    if (!profile) throw new Error("Profile not found");

    const links = await getUserLinks(ctx, profile._id);
    return {
      ...profile,
      links: links,
    };
  },
});

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    const profile = await getUserProfileByUserId(ctx, user?.subject!);
    if (!profile) return null;

    const links = await getUserLinks(ctx, profile._id);

    return {
      ...profile,
      links: links,
    };
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

    const profile = await getUserProfile(ctx, user.nickname!);
    if (!profile) throw new Error("Profile not found");

    const existingLinks = await getUserLinks(ctx, profile._id);

    //if link is already in the database, update it
    //if link is not in the database, insert it
    const tasks = args.links.map(async (link) => {
      const existing = existingLinks.find((l) => link._id === l._id);

      if (!existing) {
        return ctx.db.insert("links", {
          platform: link.platform,
          url: link.url,
          profileId: profile._id,
        });
      }

      const isModified =
        existing.platform !== link.platform || existing.url !== link.url;

      if (isModified) {
        return ctx.db.patch(existing._id, {
          platform: link.platform,
          url: link.url,
        });
      }
      return;
    });

    await Promise.all(tasks);
  },
});

export const getLink = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return null;

    const profile = await getUserProfileByUserId(ctx, user.subject!);

    if (!profile) return null;
    return await getUserLinks(ctx, profile._id);
  },
});
