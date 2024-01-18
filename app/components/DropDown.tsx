"use client";

import { useState } from "react";
import { SVGDropdownOpen } from "./AllSVG";

export const Dropdown = ({
  options,
  selected,
  links,
  idx,
  setLinks,
  openDropdown,
  setOpenDropdown,
}: any) => {
  const [name, setName] = useState<string>("");

  const paltformClickHandler = (option: any) => {
    setName(option);
    const newLinks = [...links];
    newLinks[idx].platform = option;
    setLinks(newLinks);
    setOpenDropdown(null);
    console.log(idx);
  };

  const renderedOptions = options.map((option: any) => {
    return (
      <p
        key={option.id}
        onClick={() => paltformClickHandler(option.name)}
        className="cursor-pointer p-3 border-b "
      >
        {option.name}
      </p>
    );
  });

  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
        className="bg-white w-full border-2 border-gray-200 p-2 rounded-lg"
      >
        <img src={`/images/icon-github-gray.svg`} alt="" />
        {selected ? selected : name}
        <SVGDropdownOpen />
      </button>
      {openDropdown === idx && (
        <div className="absolute bg-white  w-full overflow-y-scroll h-32 ">
          {renderedOptions}
        </div>
      )}
    </div>
  );
};
