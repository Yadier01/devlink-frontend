import { Links } from "@/app/components/Links";
import { Phone } from "@/app/components/Phone";
import { UIRight } from "@/app/components/UiRight";

export default function page() {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-[1fr_1.5fr]">
      <Phone />
      <UIRight>
        <Links />
      </UIRight>
    </div>
  );
}
