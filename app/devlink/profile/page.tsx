import { Phone } from "@/app/components/Phone";
import { ProfileForm } from "@/app/components/profileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  if (!cookies().get("token")) redirect("/login");

  return (
    <div className="min-h-screen flex bg-[#f8f8f8] text-gray-700">
      <section className=" bg-white items-center justify-center rounded-lg h- grow-[2] m-3 hidden 2xl:flex">
        <Phone />
      </section>

      <section className="bg-white m-4 p-4 grow-[1] ">
        <h1 className="font-bold text-black text-2xl">Profile Details</h1>
        <p>Add your details to create a personal touch to your profile. </p>
        <div className=" bg-[#faf8f8] my-8 p-4 gap-4 flex flex-col  justify-center w-full xl:flex-row xl:justify-between items-center  rounded-lg">
          <h3>Profile Picture</h3>
          <span className=" relative   ">
            <img src="/pfp.jpg" alt="" className="rounded-lg h-52  xl:h-80 " />
            <span className="absolute inset-0 text-white font-bold text-lg  rounded-lg bg-black transition-all opacity-0 hover:opacity-50 flex items-center justify-center">
              Change Image
            </span>
          </span>
          <div>
            <p>Image must be below 1024x1024px </p>
            <p>Use PNG, JPG or BMP format.</p>
          </div>
        </div>
        <ProfileForm />
      </section>
    </div>
  );
}
