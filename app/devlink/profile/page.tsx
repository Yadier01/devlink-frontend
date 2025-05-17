import { Phone } from "@/app/components/Phone";
import ProfileDetails from "@/app/components/ProfileDetails";

export default function page() {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-[1fr_1.5fr]">
      <Phone />
      <ProfileDetails />
    </div>
  );
}
