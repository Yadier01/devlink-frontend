import { cookies } from "next/headers";
import Link from "next/link";

export const Header = () => {
  const isToken = cookies().get("token");
  return (
    <>
      {isToken && (
        <header className=" m-4 p-5 rounded-lg bg-white ">
          <nav className="w-full  flex justify-between items-center">
            <img src="/devlinklogo.png" alt="" className="h-8" />
            <span className="flex gap-10">
              <Link href={"/devlink/links"}>Links</Link>
              <Link href={"/devlink/profile"}>Profile Details</Link>
            </span>
            <button>Preview</button>
          </nav>
        </header>
      )}
    </>
  );
};
