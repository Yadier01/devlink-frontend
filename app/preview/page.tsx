"use client";
import ShowUserInfo from "@/app/components/ShowUserInfo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
export default function Page() {
  const { isSignedIn } = useAuth();
  const user = isSignedIn ? useQuery(api.profile.getUser) : null;
  const data = [
    {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      links: user?.links,
      // image: user?.image,
    },
  ];
  return <ShowUserInfo data={data} />;
}
