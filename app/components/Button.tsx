type Props = {
  links?: any;
  onClick: () => void;
};
export default function Button({ onClick, links }: Props) {
  const buttonColorLength =
    links?.length === 0 ? "bg-[#633bfe]/60 " : "bg-[#633bfe]";
  return (
    <div className=" bottom-0   w-full border-t  flex items-center justify-end text-white p-2 rounded-lg font-bold ">
      <button
        className={` h-[46px] w-full  rounded-lg border border-transparent ${buttonColorLength} px-7 font-semibold text-white transition duration-150
          ease-in-out hover:bg-purple-hover-color 
          active:bg-purple-hover-color  sm:w-28 `}
        onClick={onClick}
      >
        Save
      </button>
    </div>
  );
}
