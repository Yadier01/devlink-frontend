import { cookies } from "next/headers";
import Link from "next/link";

export const Header = () => {
  const isToken = cookies().get("token");
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
    href: "/devlink/appearance",
    imgSrc: "/images/icon-preview-header.svg",
    text: "Preview",
  };

  return (
    <>
      {isToken && (
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
              <Link href={previewLink.href}>
                <img src={previewLink.imgSrc} alt="" className="lg:hidden" />
                <p className="hidden lg:flex">{previewLink.text}</p>
              </Link>
            </span>
          </nav>
        </header>
      )}
    </>
  );
};
