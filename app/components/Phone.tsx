"use client";

import { useState } from "react";
import { useStore } from "../store";
import { LinkPlataformColor } from "./LinkPlataformColor";

export const Phone = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const { email, links } = useStore();
  return (
    <div className="hidden place-items-center rounded-xl bg-white lg:grid">
      <svg width="308" height="632" fill="none" viewBox="0 0 308 632">
        <path
          stroke="#737373"
          d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
        ></path>
        <path
          fill="#fff"
          stroke="#737373"
          d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
        ></path>

        <defs>
          <clipPath id="circleView">
            <circle cx="153.5" cy="112" r="48" />
          </clipPath>
        </defs>

        {!imgLoaded && <circle cx="153.5" cy="112" r="48" fill="#EEE"></circle>}

        <image
          x="105.5"
          xlinkHref="/pfp.jpg"
          y="64"
          height="96px"
          width="96px"
          clipPath="url(#circleView)"
          onLoad={() => setImgLoaded(false)}
          onError={() => setImgLoaded(false)}
        />

        <rect
          width="160"
          height="16"
          x="73.5"
          y="185"
          fill="#EEE"
          rx="8"
        ></rect>

        <foreignObject x="0" y="208" width="100%" height={632 - 208}>
          <div className="flex flex-col items-center gap-3 h-full overflow-auto">
            <p className="text-center text-xs">{email}</p>

            {links.map((link, index) => (
              <LinkPlataformColor key={index} link={link} isPhone={true} />
            ))}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};
