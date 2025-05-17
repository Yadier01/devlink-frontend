import React from "react";
import { ProfileForm } from "./profileForm";
import { ProfilePicture } from "./ProfilePicture";
export default function ProfileDetails() {
  return (
    <section className="grid min-h-[785px] grid-rows-[auto_1fr_auto]  rounded-xl bg-white lg:h-[819px]">
      <div className="h-full p-8">
        <h1 className="font-bold text-black text-2xl">Profile Details</h1>
        <p>Add your details to create a personal touch to your profile. </p>

        <ProfilePicture />
        <ProfileForm />
      </div>
    </section>
  );
}
