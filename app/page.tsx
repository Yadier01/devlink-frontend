
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
export default function Home() {

  redirect("/login");
  return (
    <main className="flex min-h-screen bg-[#fafafa] flex-col items-center justify-center "></main>
  );
}
