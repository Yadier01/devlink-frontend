"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const URL = "https://devlink-backend-production.up.railway.app/";
export default function Page({ params }: { params: { username: string } }) {
  const [data, setData] = useState<any>([]);
  const name = params.username;
  const sendLoginRequest = async () => {
    try {
      const response = await axios.get(URL, {
        params: {
          name,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    sendLoginRequest();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
      {data.map((link: any) => (
        <div
          className="bg-white shadow-lg p-4 h-max w-60 flex flex-col gap-8 items-center justify-between"
          key={link._id}
        >
          <span className="items-center flex  flex-col justify-center">
            <img src="/pfp.jpg" className="my-3 rounded-full h-14" alt="" />
            <h1 className="font-bold text-lg capitalize">
              {link.firstName} {link.lastName}
            </h1>
            <p className="text-sm">{link.email}</p>
          </span>

          <div className="w-full text-center">
            {link.links.map((link: any) => (
              <div className="flex w-full" key={link._id}>
                <a href={link.url} target="_blank" className="w-full my-1.5">
                  <p
                    className={`capitalize ${
                      link.platform === "Youtube"
                        ? "bg-[#ee3638] text-white w-full p-2  flex items-center justify-center gap-2 rounded-md text-sm "
                        : link.platform === "Github"
                        ? "bg-[#191919] text-white w-full p-2  flex items-center justify-center gap-2 rounded-md text-sm "
                        : link.platform === "Linkedin"
                        ? "bg-[#2d69ff] text-white w-full p-2  flex items-center justify-center gap-2 rounded-md text-sm "
                        : ""
                    }`}
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
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
