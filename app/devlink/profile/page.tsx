import { ProfileForm } from "@/app/components/profileForm";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-700">
      <section className="bg-white m-4 p-4">
        <h1 className="font-bold text-black text-2xl">Profile Details</h1>
        <p>Add your details to create a personal touch to your profile. </p>
        <div className=" bg-[#faf8f8] my-8 p-3 rounded-lg">
          <h3>Profile Picture</h3>
          <p>Image must be below 1024x1024px use PNG, JPG or BMP format.</p>
          <img src="/pfp.jpg" alt="" />
        </div>
        <ProfileForm />
      </section>
    </div>
  );
}
