import { Links } from "@/app/components/Links";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function page() {
  if (!cookies().get("token")) redirect("/login");
  return (
    <div className="flex  min-h-screen w-screen">
      <div className="bg-white rounded-lg grow-[2] m-3 hidden 2xl:flex">s</div>
      <div className="bg-white p-4 shadow-md rounded-lg min-h-full grow-[1] m-3">
        <h1 className="font-bold text-2xl ">Customize your links</h1>
        <p className="text-gray-500 mt-2 mb-10">
          Add/edit/remove links below and then share all your profilse with the
          world!
        </p>
        <Links />
      </div>
    </div>
  );
}
