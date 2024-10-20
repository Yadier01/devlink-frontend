import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import * as bcrypt from "bcryptjs";
import { internal } from "./_generated/api";

//this is called in the frontend
export const createUser = action({
  args: {
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { name, password }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await ctx.runMutation(internal.user.hashPasswordAction, {
      name,
      password: hashedPassword,
    });
  },
});

export const hashPasswordAction = internalMutation({
  args: {
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { name, password }) => {
    return ctx.db.insert("users", { name, password });
  },
});
//this is called in the front end
export const loginUser = action({
  args: {
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { name, password }) => {
    const user = await ctx.runMutation(internal.user.getUser, { name });

    if (!user) return { error: "User not found", status: 400 };
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return { error: "Invalid password", status: 400 };

    return { status: 200 };
  },
});

export const getUser = internalMutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("name"), name))
      .first();

    if (!user) return;
    return user;
  },
});
