"use client";
import axios from "axios";
import cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Nolink from "./Nolink";
import { Dropdown } from "./DropDown";
import { useStore } from "../store";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { query } from "@/convex/_generated/server";

const plataformOption = [
  { id: 1, name: "Github", imgSrc: "/images/icon-github-gray.svg" },
  { id: 2, name: "Youtube", imgSrc: "/images/icon-youtube-gray.svg" },
  { id: 3, name: "Linkedin", imgSrc: "/images/icon-linkedin-gray.svg" },
  { id: 4, name: "Twitter", imgSrc: "/images/icon-twitter-gray.svg" },
  { id: 5, name: "Facebook", imgSrc: "/images/icon-facebook-gray.svg" },
  { id: 7, name: "Twitch", imgSrc: "/images/icon-twitch-gray.svg" },
  { id: 8, name: "Codepen", imgSrc: "/images/icon-codepen-gray.svg" },
  { id: 9, name: "Devto", imgSrc: "/images/icon-devto-gray.svg" },
  {
    id: 10,
    name: "FreecodeCamp",
    imgSrc: "/images/icon-freecodecamp-gray.svg",
  },
];

export const Links = () => {
  const links = useStore((state) => state.links);
  const setUserLinks = useStore((state) => state.setUserLinks);
  const { firstName, lastName, email } = useStore();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const createProfile = useMutation(api.profile.createLink);
  const usersLinks = useQuery(api.profile.getLink);
  useEffect(() => {
    if (usersLinks) {
      setUserLinks(usersLinks);
    }
  }, [usersLinks]);
  const sendLinks = async () => {
    try {
      const created = await createProfile({
        links: links.map((link) => {
          return { _id: link._id, platform: link.platform, url: link.url };
        }),
      });
      console.log(created);
    } catch (error: any) {
      console.log(error);
    }
  };

  const buttonHandler = () => {
    if (links.length === 0) return;
    sendLinks();
  };

  const newLinkComponentHandler = () => {
    const newId = String(links.length + 1);
    setUserLinks([...links, { id: newId, platform: "", url: "" }] as any);
  };

  const handleUrlChange = (_id: string, url: string) => {
    const newLinks = [...links];
    const index = links.findIndex((link) => link._id === _id);
    newLinks[index].url = url;
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
                        onChange={(e) =>
                          handleUrlChange(link._id, e.target.value)
                        }
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
