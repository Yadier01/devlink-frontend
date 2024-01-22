"use client";
import React from "react";
import { ProfileForm } from "./profileForm";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function ProfileDetails() {
  const { register, handleSubmit } = useForm();
  const token = Cookies.get("token");
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(
        "https://devlink-backend-production.up.railway.app/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-full p-8">
      <h1 className="font-bold text-black text-2xl">Profile Details</h1>
      <p>Add your details to create a personal touch to your profile. </p>
      <div className=" bg-[#fafafa] my-8 p-4 gap-4 flex flex-col  justify-center w-full xl:flex-row xl:justify-between items-center  rounded-lg">
        <h3>Profile Picture</h3>
        <span className="relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("image")}
              type="file"
              name="image"
              alt=""
              className="rounded-lg h-52 xl:h-80"
            />
            <input type="submit" />
          </form>
        </span>
        <div>
          <p>Image must be below 1024x1024px </p>
          <p>Use PNG, JPG or BMP format.</p>
        </div>
      </div>

      <ProfileForm />
    </div>
  );
}
