"use client";
import Link from "next/link";
import React from "react";

export const Form = ({ onSubmitFetch, isLogin, error }: any) => {
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    onSubmitFetch(name, password);
  };
  return (
    <form
      className="flex bg-white p-8 gap-4 flex-col max-w-md h-[400px] justify-between  w-full rounded-lg  shadow-sm "
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <div>
        <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Register"}</h2>
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
        <label htmlFor="password" className="text-sm text-gray-700">
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
      <button className="bg-[#643cff] text-white p-2 rounded-lg font-bold">
        {isLogin ? "Login" : "Register"}
      </button>
      {isLogin ? (
        <p className="text-gray-500 text-center ">
          Don't have an account?
          <Link href={"/register"} className="text-[#643cff] ml-2">
            Create account
          </Link>
        </p>
      ) : (
        <p className="text-gray-500 text-center ">
          Already have an account?
          <Link href={"/login"} className="text-[#643cff] ml-2">
            Login
          </Link>
        </p>
      )}

      {error && <p className="text-red-500 text-center ">{error}</p>}
    </form>
  );
};
