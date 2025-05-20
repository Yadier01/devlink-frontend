"use client";
import ShowUserInfo from "@/app/components/ShowUserInfo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function Page() {
  const user = useQuery(api.profile.getUser);

  const data = [
    {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      links: user?.links,
      image: user?.image,
    },
  ];
  return <ShowUserInfo data={data} />;
}
