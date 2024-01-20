import { useState } from "react";
import { SVGDropdownOpen } from "./AllSVG";
import { OptionComponent } from "./Option";

interface Option {
  id: number;
  name: string;
  imgSrc: string;
}

interface DropdownProps {
  options: Option[];
  selected: string;
  links: any[];
  idx: number;
  setLinks: (links: any[]) => void;
  openDropdown: number | null;
  setOpenDropdown: (idx: number | null) => void;
}

export const Dropdown = ({
  options,
  selected,
  links,
  idx,
  setLinks,
  openDropdown,
  setOpenDropdown,
}: DropdownProps) => {
  const [name, setName] = useState<string>("");

  const paltformClickHandler = (option: string) => {
    setName(option);
    const newLinks = [...links];
    newLinks[idx].platform = option;
    setLinks(newLinks);
    setOpenDropdown(null);
  };

  const selectedOption = options.find((option) => option.name === selected);
  const svg = selectedOption ? (
    <img src={selectedOption.imgSrc} alt={`Icon for ${selectedOption.name}`} />
  ) : null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
        className="bg-white w-full border-2 flex items-center justify-between border-gray-200 p-2 rounded-lg"
      >
        {svg}
        {selected || name}
        <SVGDropdownOpen />
      </button>
      {openDropdown === idx && (
        <div className="absolute bg-white w-full overflow-y-scroll h-32">
          {options.map((option) => (
            <OptionComponent
              key={option.id}
              option={option}
              onClick={() => paltformClickHandler(option.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
