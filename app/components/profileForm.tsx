"use client";
import axios from "axios";
import cookies from "js-cookie";
import Button from "./Button";
import { useStore } from "../store";
import fetchUserInfo from "../hooks/fetchUserInfo";

const URL = "https://devlink-backend-production.up.railway.app/";
const selfhostedURL = "http://localhost:3002/";
export const ProfileForm = () => {
  const { firstName, lastName, email, setUserInfo } = useStore();

  fetchUserInfo();
  const sendUserInfo = async () => {
    const token = cookies.get("token");
    console.log("hit");
    try {
      await axios.post(
        selfhostedURL,
        {
          firstName,
          email,
          lastName,
        },
        {
          headers: {
            token,
          },
        },
      );
      console.log("second hit");
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  const buttonHandler = () => {
    sendUserInfo();
  };

  return (
    <>
      <form className="bg-[#fafafa] p-4 flex flex-col gap-4 ">
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
            type="text"
            className="p-1 rounded-lg border-1 w-full border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
            onChange={(e) => setUserInfo({ email: e.target.value })}
          />
        </span>
      </form>
      <Button onClick={buttonHandler} />
    </>
  );
};
