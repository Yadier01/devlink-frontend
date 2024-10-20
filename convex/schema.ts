import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    password: v.string(),
  }),
  profile: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  }),
});
