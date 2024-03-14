import { redirect } from "next/navigation";
export default function Home() {
  redirect("/login");
  return (
    <main className="flex min-h-screen bg-[#fafafa] flex-col items-center justify-center "></main>
  );
}
