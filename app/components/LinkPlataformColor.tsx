const platformStyles: any = {
  Youtube: "bg-[#ee3638] text-white",
  Github: "bg-[#191919] text-white ",
  Linkedin: "bg-[#2d69ff] text-white ",
  Twitter: "bg-[#1da1f2] text-white ",
  freecodecamp: "bg-[#0a0a23] text-white ",
  Facebook: "bg-[#1877f2] text-white ",
  Codepen: "bg-[#000000] text-white ",
  Devto: "bg-[#0a0a0a] text-white ",
  Twitch: "bg-[#6441a5] text-white ",
  Instagram: "bg-[#e1306c] text-white ",
};
interface Props {
  link: Links;
  isPhone: boolean;
}
interface Links {
  platform: string;
  url: string;
}
export const LinkPlataformColor = ({ link, isPhone }: Props) => {
  const platformStyle = platformStyles[link.platform] || "";
  const commonStyle =
    "p-2 flex items-center justify-center gap-2 rounded-md text-sm";

  return (
    <p
      className={`capitalize ${platformStyle} ${
        isPhone ? "w-1/2" : "w-full"
      } ${commonStyle}`}
    >
      {link.platform}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        width="20"
        height="20"
        fill="white"
      >
        <path
          d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
          data-name="Right"
        />
      </svg>
    </p>
  );
};
