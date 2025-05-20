"use client";
import ShowUserInfo from "@/app/components/ShowUserInfo";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Page({ params }: { params: { username: string } }) {
  const name = params.username.toLowerCase();
  const user = useQuery(api.profile.getProfile, { name });

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
