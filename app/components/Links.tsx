"use client";
import axios from "axios";
import cookies from "js-cookie";
import React, { useState } from "react";
import fetchUserInfo from "../hooks/fetchUserInfo";
import Button from "./Button";
import Nolink from "./Nolink";
import { Dropdown } from "./DropDown";
import { useStore } from "../store";

const URL = "https://devlink-backend-production.up.railway.app/";
const plataformOption = [
  { id: 1, name: "Github" },
  { id: 2, name: "Youtube" },
  { id: 3, name: "Linkedin" },
  { id: 4, name: "Twitter" },
];

export const Links = () => {
  const token = cookies.get("token");
  const { links, setUserLinks } = useStore();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const { fetchUserData } = fetchUserInfo();

  const sendLinks = async () => {
    try {
      const response = await axios.post(URL, {
        links,
        token,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  const buttonHandler = () => {
    if (links.length === 0) return;
    sendLinks();
  };

  const newLinkComponentHandler = () => {
    setUserLinks([...links, { platform: "", url: "" }]);
  };

  const handleUrlChange = (idx: number, url: string) => {
    const newLinks = [...links];
    newLinks[idx].url = url;
    setUserLinks(newLinks);
  };

  const removeLinkHandler = (id: number) => {
    const newLinks = links.filter((_, index) => index !== id);
    setUserLinks(newLinks);
  };

  return (
    <>
      <section className="relative px-8 pt-8 ">
        <div>
          <h1 className="font-bold text-2xl ">Customize your links</h1>
          <p className="text-gray-500 mt-2 mb-10">
            Add/edit/remove links below and then share all your profilse with
            the world!
          </p>
          <button
            onClick={newLinkComponentHandler}
            className="text-center w-full mb-4 text-[#643cff] bg-white border-[#643cff] border  p-2 rounded-lg font-bold"
          >
            + Add new link
          </button>
        </div>
        <div className="overflow-y-auto h-[550px]  rounded-xl bg-white">
          {links.length == 0 ? (
            <Nolink />
          ) : (
            links.map((link, idx) => {
              return (
                <div
                  className="bg-[#f8f8f8] w-full  p-4 my-4 rounded-lg text-gray-700"
                  key={idx}
                >
                  <span className="flex justify-between items-center">
                    <h3 className="font-semibold">Link #{idx + 1}</h3>
                    <button onClick={() => removeLinkHandler(idx)}>
                      Remove
                    </button>
                  </span>

                  <div className="flex flex-col gap-1">
                    <span className="flex flex-col">
                      <label htmlFor="plataform" className="text-xs">
                        Platform
                      </label>
                      <Dropdown
                        selected={link.platform}
                        options={plataformOption}
                        links={links}
                        idx={idx}
                        setLinks={setUserLinks}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                      />
                    </span>

                    <span className="flex flex-col ">
                      <label htmlFor="Link " className="text-xs">
                        Link
                      </label>

                      <input
                        name="Link"
                        className="border-2 border-gray-200 p-2 rounded-lg"
                        type="text"
                        value={link.url}
                        onChange={(e) => handleUrlChange(idx, e.target.value)}
                      />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      <Button onClick={buttonHandler} links={links} />
    </>
  );
};
