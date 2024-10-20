"use client";
import { api } from "@/convex/_generated/api";
import axios from "axios";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useAction, useMutation, useQuery } from "convex/react";

export const Login = ({}) => {
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const router = useRouter();

  const userLogin = useAction(api.user.loginUser);
  const sendLoginRequest = async (name: string, password: string) => {
    if (!name || !password) return;
    try {
      const { status } = await userLogin({ name, password });

      if (status === 200) router.push("/devlink/profile");
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmitHanlderLogin = (e: any) => {
    e.preventDefault();
    sendLoginRequest(name, password);
  };

  return (
    <>
      <form
        className="flex bg-white p-8 gap-4 flex-col max-w-md h-[400px] justify-between  w-full rounded-lg  shadow-sm "
        onSubmit={(e) => onSubmitHanlderLogin(e)}
      >
        <div>
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm text-gray-500">
            Add your details below to get back into the app
          </p>
        </div>
        <span className="flex flex-col">
          <label htmlFor="name" className="text-sm text-gray-700">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Enter your name"
            className="border-2 border-gray-200 p-2 rounded-lg"
            onChange={(e: any) => setName(e.target.value)}
          />
        </span>
        <span className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm
          text-gray-700
          "
          >
            Password
          </label>
          <input
            placeholder="Enter your password"
            name="password"
            className="border-2 border-gray-200 p-2 rounded-lg"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </span>
        <p className="text-center text-gray-500">
          use user user if you don&apos;t want to register
        </p>
        <button
          type="submit"
          className="bg-[#643cff] text-white p-2 rounded-lg font-bold"
        >
          Login
        </button>
        <p className="text-gray-500 text-center ">
          Don&apos;t have an account?
          <Link href={"/register"} className="text-[#643cff] ml-2">
            Create account
          </Link>
        </p>
        {error && <p className="text-red-500 text-center ">{error}</p>}
      </form>
    </>
  );
};
