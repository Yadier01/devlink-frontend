"use client";
import axios from "axios";

import React, { useState } from "react";

const plataformOption = ["Github", "Youtube", "Linkedin", "Twitter", "Gitlab"];

export const Links = () => {
  const [links, setLinks] = useState([
    { url: "", platform: plataformOption[0] },
  ]);
  const newLinkComponentHandler = () => {
    if (links.length >= 4) return;
    setLinks((prev) => [...prev, { url: "", platform: plataformOption[0] }]);
  };

  const handleUrlChange = (idx, url) => {
    const newLinks = [...links];
    newLinks[idx].url = url;
    setLinks(newLinks);
  };

  const handlePlatformChange = (idx, platform) => {
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
    <div className="flex flex-col justify-between min-h-screen ">
      <button
        onClick={newLinkComponentHandler}
        className="text-center w-full text-[#643cff] bg-white border-[#643cff] border  p-2 rounded-lg font-bold"
      >
        + Add new link
      </button>
      {links.length == 0 ? (
        <p>No links :(</p>
      ) : (
        links.map((link, idx) => {
          return (
            <div
              className="bg-[#f8f8f8]  p-4 my-4 rounded-lg text-gray-700"
              key={idx}
            >
              <span className="flex justify-between items-center">
                <h3 className="font-semibold">Link #{idx + 1}</h3>
                <button onClick={() => removeLinkHandler(idx)}>Remove</button>
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex flex-col">
                  <label htmlFor="plataform" className="text-xs">
                    Plataform
                  </label>
                  <select
                    name="plataform"
                    value={link.platform}
                    className="bg-white border-2 border-gray-200 p-2 rounded-lg "
                    onChange={(e) => handlePlatformChange(idx, e.target.value)}
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
              </span>
            </div>
          );
        })
      )}

      <button
        onClick={() => console.log(links)}
        className="bg-[#633bfe] w-full text-white p-2 rounded-lg font-bold "
      >
        save
      </button>
    </div>
  );
};
