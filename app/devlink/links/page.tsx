import { Links } from "@/app/components/Links";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Phone } from "@/app/components/Phone";
import ProfileDetails from "@/app/components/ProfileDetails";
import UILeft from "@/app/components/UILeft";
import { UIRight } from "@/app/components/UiRight";

export default function page() {
  if (!cookies().get("token")) redirect("/login");
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-[1fr_1.5fr]">
      <Phone />

      <UIRight>
        <Links />
      </UIRight>
    </div>
  );
}
