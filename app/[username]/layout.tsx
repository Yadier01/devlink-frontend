import type { Metadata } from "next";

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
      <main className="">{children}</main>
    </>
  );
}
