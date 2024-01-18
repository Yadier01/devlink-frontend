import React from "react";
import { Links } from "./Links";
import { ProfileForm } from "./profileForm";

export default function ProfileDetails() {
  return (
    <div className="h-full p-8">
      <h1 className="font-bold text-black text-2xl">Profile Details</h1>
      <p>Add your details to create a personal touch to your profile. </p>
      <div className=" bg-[#fafafa] my-8 p-4 gap-4 flex flex-col  justify-center w-full xl:flex-row xl:justify-between items-center  rounded-lg">
        <h3>Profile Picture</h3>
        <span className=" relative   ">
          <img src="/pfp.jpg" alt="" className="rounded-lg h-52  xl:h-80 " />
          <span
            className="absolute inset-0 text-white font-bold text-lg  rounded-lg bg-black 
          transition-all opacity-0 hover:opacity-50 flex items-center justify-center"
          >
            Change Image
          </span>
        </span>
        <div>
          <p>Image must be below 1024x1024px </p>
          <p>Use PNG, JPG or BMP format.</p>
        </div>
      </div>

      <ProfileForm />
    </div>
  );
}
