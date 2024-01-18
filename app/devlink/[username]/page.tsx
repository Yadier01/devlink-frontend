"use client";

import ShowUserInfo from "@/app/components/ShowUserInfo";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "https://devlink-backend-production.up.railway.app/";
export default function Page({ params }: { params: { username: string } }) {
  const [data, setData] = useState<any>([]);
  const name = params.username;
  const fetchUserByName = async () => {
    try {
      const response = await axios.get(URL, {
        params: {
          name,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchUserByName();
  }, []);
  return <ShowUserInfo data={data} />;
}
