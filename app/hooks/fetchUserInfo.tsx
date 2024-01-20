import cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { useStore } from "../store";

export default function useUserInfo() {
  const URL = "https://devlink-backend-production.up.railway.app/";
  const { setUserLinks, firstName, lastName, email, links, setUserInfo } =
    useStore();

  const fetchUserData = async () => {
    if (firstName && lastName && email) return;

    const token = cookies.get("token");
    try {
      const response = await axios.get(URL, {
        params: {
          token,
        },
      });

      const newLinks = response.data[0].links;
      setUserInfo({
        firstName: response.data[0].firstName,
        lastName: response.data[0].lastName,
        email: response.data[0].email,
      });
      setUserLinks(newLinks);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    firstName,
    lastName,
    email,
    links,
    fetchUserData,
  };
}
