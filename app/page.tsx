"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
export default function Home() {
  const router = useRouter();

  router.push("/login");
  return (
    <main className="flex min-h-screen bg-[#fafafa] flex-col items-center justify-center "></main>
  );
}
