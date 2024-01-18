"use client";
import ShowUserInfo from "@/app/components/ShowUserInfo";
import { useStore } from "../../../store";
import fetchUserInfo from "@/app/hooks/fetchUserInfo";
export default function Page() {
  const { firstName, lastName, email, links } = useStore();
  fetchUserInfo();
  console.log(firstName);
  const data = [
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      links: links,
    },
  ];
  return <ShowUserInfo data={data} />;
}
