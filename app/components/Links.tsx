"use client";
import axios from "axios";
import cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import fetchUserInfo from "../hooks/fetchUserInfo";
import Button from "./Button";
import Nolink from "./Nolink";

const URL = "https://devlink-backend-production.up.railway.app/";
const plataformOption = ["Github", "Youtube", "Linkedin", "Twitter", "Gitlab"];

export const Links = () => {
  const { links, setLinks } = fetchUserInfo(plataformOption);
  const token = cookies.get("token");

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
    setLinks((prev) => [...prev, { url: "", platform: plataformOption[0] }]);
  };

  const handleUrlChange = (idx: number, url: string) => {
    const newLinks = [...links];
    newLinks[idx].url = url;
    setLinks(newLinks);
  };

  const handlePlatformChange = (idx: number, platform: string) => {
    const newLinks = [...links];
    newLinks[idx].platform = platform;
    setLinks(newLinks);
  };
  const removeLinkHandler = (idx: any) => {
    const newLinks = [...links];
    newLinks.splice(idx, 1);
    setLinks(newLinks);
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
                      <select
                        name="plataform"
                        value={link.platform}
                        className="bg-white border-2 border-gray-200 p-2 rounded-lg "
                        onChange={(e) =>
                          handlePlatformChange(idx, e.target.value)
                        }
                      >
                        {plataformOption.map((platform) => (
                          <option key={platform}>{platform}</option>
                        ))}
                      </select>
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
