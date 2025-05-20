import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profile: defineTable({
    userId: v.string(),
    name: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_name", ["name"]),

  links: defineTable({
    profileId: v.id("profile"),
    platform: v.string(),
    url: v.string(),
  }).index("by_profile_id", ["profileId"]),

  images: defineTable({
    profileId: v.id("profile"),
    url: v.id("_storage"),
  }).index("by_profile_id", ["profileId"]),
});
