"use client";
import axios from "axios";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Login = ({}) => {
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const router = useRouter();

  const onSubmitHanlderLogin = (e: any) => {
    e.preventDefault();
    sendLoginRequest(name, password);
  };
  const sendLoginRequest = async (name: string, password: string) => {
    if (!name || !password) return;
    try {
      const response = await axios.post(
        "https://devlink-backend-production.up.railway.app/auth/login",
        {
          name,
          password,
        }
      );
      setData(response.data);
      Cookies.set("token", response.data.token);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const loginHandler = () => {};
  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/devlink/links");
    }
  }, [data]);
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
          use user user if you don't want to register
        </p>
        <button
          type="submit"
          onClick={loginHandler}
          className="bg-[#643cff] text-white p-2 rounded-lg font-bold"
        >
          Login
        </button>
        <p className="text-gray-500 text-center ">
          Don't have an account?
          <Link href={"/register"} className="text-[#643cff] ml-2">
            Create account
          </Link>
        </p>
        {error && <p className="text-red-500 text-center ">{error}</p>}
      </form>
    </>
  );
};
