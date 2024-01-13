import { Links } from "@/app/components/Links";

export default function page() {
  return (
    <div className="flex bg-[#f3f3f3] min-h-screen w-screen">
      <div className="bg-red-400 h- grow-[2] m-3 hidden lg:flex">s</div>
      <div className="bg-white p-4 shadow-md min-h-full grow-[1] m-3">
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
