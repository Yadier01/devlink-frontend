import type { Metadata } from "next";

import { Header } from "../components/Header";
import { Phone } from "../components/Phone";
export const metadata: Metadata = {
  title: "Dev Links",
  description: "Best place to share your social media links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mt-4 px-4  pb-4 sm:mt-6 sm:px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-[1fr_1.5fr]">
          <Phone />
          {children}
        </div>
      </main>
    </>
  );
}
