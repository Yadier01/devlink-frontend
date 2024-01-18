import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "../components/Header";
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
      <Header />
      <main className="mt-4 px-4  pb-4 sm:mt-6 sm:px-6">{children}</main>
    </>
  );
}
