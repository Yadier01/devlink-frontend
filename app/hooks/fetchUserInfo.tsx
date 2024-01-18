import cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useUserInfo(plataformOption: string[] = []) {
  const URL = "https://devlink-backend-production.up.railway.app/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState([
    { url: "", platform: plataformOption[0] },
  ]);

  const fetchUserInfo = async () => {
    const token = cookies.get("token");
    try {
      const response = await axios.get(URL, {
        params: {
          token,
        },
      });
      setFirstName(response.data[0].firstName);
      setLastName(response.data[0].lastName);
      setEmail(response.data[0].email);
    } catch (error: any) {}
    console.log("error"); //fix later
  };

  const fetchUserLinks = async () => {
    const token = cookies.get("token");
    try {
      const response = await axios.get(URL, {
        params: {
          token,
        },
      });
      const newLinks = response.data.reduce(
        (acc: any, usr: any) => [...acc, ...usr.links],
        []
      );
      console.log(newLinks);
      setLinks(newLinks);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserLinks();
  }, []);

  return {
    firstName,
    lastName,
    email,
    links,
    setFirstName,
    setLastName,
    setEmail,
    setLinks,
  };
}
