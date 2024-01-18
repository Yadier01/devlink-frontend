import { Phone } from "@/app/components/Phone";
import ProfileDetails from "@/app/components/ProfileDetails";
import { UIRight } from "@/app/components/UiRight";
import { ProfileForm } from "@/app/components/profileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  if (!cookies().get("token")) redirect("/login");

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-[1fr_1.5fr]">
      <Phone />

      <UIRight>
        <ProfileDetails />
      </UIRight>
    </div>
  );
}
