"use client";
import React from "react";
import { ProfileForm } from "./profileForm";
import { useStore } from "../store";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function ProfileDetails() {
  const { register, handleSubmit } = useForm();
  const image = useStore((state) => state.image);
  const onSubmit = async (data: any) => {
    //   console.log("hit");
    //   const formData = new FormData();
    //   formData.append("image", data.image[0]);
    //   try {
    //     const response = await axios.post("http://localhost:3002/", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         token,
    //       },
    //     });
    //     console.log(response.data);
    //   } catch (error: any) {
    //     console.error(error.response.data);
    //   }
  };
  return (
    <section className="grid min-h-[785px] grid-rows-[auto_1fr_auto]  rounded-xl bg-white lg:h-[819px]">
      <div className="h-full p-8">
        <h1 className="font-bold text-black text-2xl">Profile Details</h1>
        <p>Add your details to create a personal touch to your profile. </p>
        <div className=" bg-[#fafafa] my-8 p-4 gap-4 flex flex-col  justify-center w-full xl:flex-row xl:justify-between items-center  rounded-lg">
          <h3>Profile Picture</h3>
          <span className="w-full md:w-3/4  lg:w-[400px] ">
            <form
              className="relative  bg-red-400"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("image")}
                type="file"
                name="image"
                id="fileInput"
                className="hidden"
              />

              <label
                htmlFor="fileInput"
                className="cursor-pointer block w-full h-60 md:h-96 xl:h-80 bg-cover bg-no-repeat bg-center relative"
                style={{
                  backgroundImage: image
                    ? `url(http://localhost:3002${image})`
                    : "none",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className="absolute inset-0 flex items-center justify-center text-white">
                  Click to Upload
                </div>
              </label>

              <button type="submit">Send</button>
            </form>
          </span>
          <div>
            <p>Image must be below 1024x1024px </p>
            <p>Use PNG, JPG or BMP format.</p>
          </div>
        </div>

        <ProfileForm />
      </div>
    </section>
  );
}
