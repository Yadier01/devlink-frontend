"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  password: string;
};
export const Form = ({ onSubmitFetch, isLogin, error }: any) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    regiser(data.name, data.password);
  };

  const router = useRouter();

  const regiser = async (name: string, password: string) => {
    try {
      const response = await axios.post(
        "https://devlink-backend-production.up.railway.app/auth/register",
        {
          name,
          password,
        }
      );

      if (response.status === 201) {
        <p>succes</p>;
        router.push("/login");
      }
    } catch (error: any) {
      return error.response.data.error;
    }
  };

  return (
    <>
      <form
        className="flex bg-white p-8 gap-4 flex-col max-w-md h-[400px] justify-between  w-full rounded-lg  shadow-sm "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h2 className="text-2xl font-bold">
            {isLogin ? "Login" : "Register"}
          </h2>
          <p className="text-sm text-gray-500">
            Add your details below to get back into the app
          </p>
        </div>

        <span className="flex flex-col">
          <label htmlFor="name" className="text-sm text-gray-700">
            Name
          </label>

          <input
            type="text"
            {...register("name", { required: true, minLength: 3 })}
            placeholder="Enter your name"
            className="border-2 border-gray-200 p-2 rounded-lg"
          />
        </span>

        <span className="flex flex-col">
          <label htmlFor="password" className="text-sm text-gray-700">
            Password
          </label>
          <input
            placeholder="Enter your password"
            className="border-2 border-gray-200 p-2 rounded-lg"
            {...register("password", { required: true, minLength: 6 })}
          />
        </span>

        <button className="bg-[#643cff] text-white p-2 rounded-lg font-bold">
          {isLogin ? "Login" : "Register"}
        </button>

        {isLogin ? (
          <p className="text-gray-500 text-center ">
            Don&apos;t have an account?
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
    </>
  );
};
