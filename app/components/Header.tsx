"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

export const Header = () => {
  const links = [
    {
      href: "/devlink/links",
      imgSrc: "/images/icon-links-header.svg",
      text: "Links",
    },
    {
      href: "/devlink/profile",
      imgSrc: "/images/icon-profile-details-header.svg",
      text: "Profile Details",
    },
  ];

  const previewLink = {
    href: "/preview",
    imgSrc: "/images/icon-preview-header.svg",
    text: "Preview",
  };

  return (
    <>
      <header className=" m-4 p-5 rounded-lg bg-white ">
        <nav className="w-full  flex justify-between items-center">
          <span className="flex items-center  w-full justify-between gp-10">
            <img
              src="/images/logo-devlinks-small.svg"
              className="lg:hidden"
              alt=""
            />

            <img
              src="/images/logo-devlinks-large.svg"
              className="hidden lg:flex"
              alt=""
            />
            <div className="flex gap-10">
              {links.map((link) => (
                <div key={link.href}>
                  <Link href={link.href}>
                    <img
                      className=" lg:hidden"
                      src={link.imgSrc}
                      alt={link.text}
                    />
                    <p className="hidden lg:flex">{link.text}</p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link href={previewLink.href}>
                <img src={previewLink.imgSrc} alt="" className="lg:hidden" />
                <p className="hidden lg:flex">{previewLink.text}</p>
              </Link>

              <Authenticated>
                <UserButton />
              </Authenticated>
              <Unauthenticated>
                <SignInButton />
              </Unauthenticated>
            </div>
          </span>
        </nav>
      </header>
    </>
  );
};
