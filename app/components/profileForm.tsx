"use client";
import React, { useState } from "react";

export const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form className="bg-[#faf8f8] p-4 ">
      <span className="flex flex-col ">
        <label htmlFor="firstName " className="text-sm my-2 ">
          First name
        </label>
        <input
          type="text"
          name="firstName"
          className="p-1 rounded-lg border-1 border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </span>

      <span className="flex flex-col  ">
        <label htmlFor="lastName" className="text-sm my-2">
          Last name
        </label>
        <input
          type="text"
          className="p-1 rounded-md border-1 border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
          onChange={(e) => setLastName(e.target.value)}
        />
      </span>

      <span className="flex flex-col  ">
        <label htmlFor="email" className="text-sm my-2">
          Email
        </label>
        <input
          type="text"
          className="p-1 rounded-lg border-1 border-[#623afd] focus:outline-none focus:ring-2 focus:ring-[#623afd] focus:border-transparent"
          onChange={(e) => setEmail(e.target.value)}
        />
      </span>
    </form>
  );
};
