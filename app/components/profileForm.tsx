"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import useUserInfo from "../hooks/fetchUserInfo";

const URL = "https://devlink-backend-production.up.railway.app/";
export const ProfileForm = () => {
  const { firstName, lastName, email, setFirstName, setEmail, setLastName } =
    useUserInfo();
  const sendUserInfo = async () => {
    const token = cookies.get("token");
    console.log(token);
    try {
      const response = await axios.post(URL, {
        firstName,
        email,
        lastName,
        token,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };
  const buttonHandler = () => {
    sendUserInfo();
  };
  const editUserInfo = async () => {
    const token = cookies.get("token");

    try {
      const response = await axios.patch(URL, {
        firstName,
        email,
        lastName,
        token,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };
  return (
    <>
      <form className="bg-[#faf8f8] p-4 flex flex-col gap-4 ">
        <span className="flex flex-col  xl:flex-row    ">
          <label htmlFor="firstName " className="text-sm my-2 w-1/3">
            First name*
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            className="p-1 rounded-lg border-1 w border-[#623afd] w-full focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </span>

        <span className="flex flex-col xl:flex-row ">
          <label htmlFor="lastName" className="text-sm my-2 w-1/3 ">
            Last name*
          </label>
          <input
            value={lastName}
            required
            type="text"
            className="p-1 rounded-md border-1 w-full border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
            onChange={(e) => setLastName(e.target.value)}
          />
        </span>

        <span className="flex flex-col xl:flex-row  ">
          <label htmlFor="email" className="text-sm my-2 w-1/3 ">
            Email
          </label>
          <input
            value={email}
            type="text"
            className="p-1 rounded-lg border-1 w-full border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
      </form>
      <button
        onClick={buttonHandler}
        className="bg-[#633bfe] w-full text-white p-2 rounded-lg font-bold "
      >
        save
      </button>
    </>
  );
};
