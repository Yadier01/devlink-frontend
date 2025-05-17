"use client";
import Button from "./Button";
import { useStore } from "../store";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const ProfileForm = () => {
  const { firstName, lastName, email, setUserInfo } = useStore();
  const profile = useQuery(api.profile.getUser);

  useEffect(() => {
    if (profile) {
      setUserInfo({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });
    }
  }, [profile]);

  const submitProfile = useMutation(api.profile.createProfile);
  const buttonHandler = async () => {
    try {
      const res = await submitProfile({ firstName, lastName, email });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-[#fafafa] p-4 flex flex-col gap-4 "
      >
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
            onChange={(e) => setUserInfo({ firstName: e.target.value })}
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
            onChange={(e) => setUserInfo({ lastName: e.target.value })}
          />
        </span>

        <span className="flex flex-col xl:flex-row  ">
          <label htmlFor="email" className="text-sm my-2 w-1/3 ">
            Email
          </label>
          <input
            value={email}
            type="email"
            className="p-1 rounded-lg border-1 w-full border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
            onChange={(e) => setUserInfo({ email: e.target.value })}
          />
        </span>
      </form>
      <Button onClick={buttonHandler} />
    </>
  );
};
