import cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { useStore } from "../store";

const selfhostedURL = "http://localhost:3002/";
export default function useUserInfo() {
  const URL = "https://devlink-backend-production.up.railway.app/";
  const { setUserLinks, firstName, lastName, email, links, setUserInfo } =
    useStore();
  const fetchUserData = async () => {
    if (firstName && lastName && email) return;

    const token = cookies.get("token");
    try {
      const response = await axios.get(selfhostedURL, {
        params: {
          token,
        },
      });
      const newLinks = response.data[0].links;

      setUserInfo({
        firstName: response.data[0].firstName,
        lastName: response.data[0].lastName,
        email: response.data[0].email,
        image: response.data[0].image,
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
