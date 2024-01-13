import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Dev Links",
  description: "Best place to share your social media links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isToken = cookies().get("token");
  return (
    <>
      {isToken && (
        <header className=" m-4 p-4 ">
          <nav className="w-full flex justify-between items-center">
            img
            <span className="flex gap-10">
              <Link href={"/devlink/links"}>Links</Link>
              <Link href={"/devlink/profile"}>Profile Details</Link>
            </span>
            <button>Preview</button>
          </nav>
        </header>
      )}
      <main>{children}</main>
    </>
  );
}
