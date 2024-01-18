import React from "react";
import NoLinkSvg from "./AllSVG";

export default function Nolink() {
  return (
    <div className=" h-full flex items-center justify-center flex-col p-20  bg-[#fafafa]">
      <NoLinkSvg />
      <h2 className="text-2xl xl:text-3xl text-center font-bold my-6">
        Let&apos;s get you started
      </h2>
      <p className=" xl:w-3/5 text-gray-500  text-center">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We&apos;re here to help you
        share your profiles with everyone!
      </p>
    </div>
  );
}
