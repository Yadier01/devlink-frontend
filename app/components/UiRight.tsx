import React from "react";
import { Phone } from "./Phone";

export const UIRight = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid min-h-[785px] grid-rows-[auto_1fr_auto]  rounded-xl bg-white lg:h-[819px]">
      {children}
    </section>
  );
};
