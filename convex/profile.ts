import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserProfileByName, getUserProfileByUserId } from "./model/profile";
import { getUserLinks } from "./model/links";
import { getImage, getProfileImage } from "./model/images";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const sendImage = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const profile = await getUserProfileByUserId(ctx);
    if (!profile) return null;

    const images = await ctx.db
      .query("images")
      .withIndex("by_profile_id", (q) => q.eq("profileId", profile._id))
      .unique();

    if (images) {
      ctx.db.patch(images._id, {
        url: args.storageId,
      });
      ctx.storage.delete(images.url);
      return;
    }

    await ctx.db.insert("images", {
      profileId: profile._id,
      url: args.storageId,
    });
  },
});

export const getImages = query({
  handler: async (ctx) => {
    const profile = await getUserProfileByUserId(ctx);
    if (!profile) return null;

    const images = await getImage(ctx);
    if (!images) return null;

    return await ctx.storage.getUrl(images.url);
  },
});

export const createProfile = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, { firstName, lastName, email }) => {
    if (!firstName || !lastName || !email)
      throw new Error("Missing required fields");

    // Check if profile already exists
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");

    const exists = await getUserProfileByUserId(ctx);

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
    const profile = await getUserProfileByName(ctx, args.name);

    if (!profile) throw new Error("Profile not found");

    const links = await getUserLinks(ctx, profile._id);
    const image = await getProfileImage(ctx, profile._id);
    return {
      ...profile,
      links: links,
      image: image,
    };
  },
});

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const profile = await getUserProfileByUserId(ctx);
    if (!profile) return null;

    const links = await getUserLinks(ctx, profile._id);
    const image = await getProfileImage(ctx, profile._id);

    return {
      ...profile,
      links: links,
      image: image,
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

    const profile = await getUserProfileByName(ctx, user.nickname!);
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
  handler: async (ctx) => {
    const profile = await getUserProfileByUserId(ctx);
    if (!profile) return null;
    return await getUserLinks(ctx, profile._id);
  },
});
