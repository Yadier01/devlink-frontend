"use client";
import { FormEvent, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useStore } from "../store";

export const ProfilePicture = () => {
  const { image } = useStore();
  const generateUploadUrl = useMutation(api.profile.generateUploadUrl);
  const sendImage = useMutation(api.profile.sendImage);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    await sendImage({ storageId });

    setSelectedImage(null);
    imageInput.current!.value = "";
  }

  const checkImgDimensions = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width > 1024 || img.height > 1024) {
            console.log("Image dimensions must be 1024x1024px or smaller");
            return;
          }
          setSelectedImage(file);
        };
        img.onerror = () => {
          console.log("Failed to load image");
        };
        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" bg-[#fafafa] my-8 p-4 gap-4 flex flex-col  justify-center w-full xl:flex-row xl:justify-between items-center  rounded-lg">
      <h3>Profile Picture</h3>
      <span className="w-full md:w-3/4  lg:w-[400px] ">
        <form className="relative   " onSubmit={handleSendImage}>
          <input
            type="file"
            name="image"
            id="fileInput"
            className="hidden "
            accept="image/*"
            ref={imageInput}
            onChange={(event) => checkImgDimensions(event.target.files![0])}
            disabled={selectedImage !== null}
          />

          <label
            htmlFor="fileInput"
            className={`cursor-pointer rounded-lg  block w-full h-60 md:h-96 xl:h-80 bg-cover bg-no-repeat bg-center relative 
              `}
            style={{
              backgroundImage: selectedImage
                ? `url(${URL.createObjectURL(selectedImage)})`
                : `url(${image})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

            <div className="absolute inset-0  flex items-center justify-center text-white">
              Click to Upload
            </div>
          </label>

          <input
            type="submit"
            value="Send Image"
            disabled={selectedImage === null}
          />
        </form>
      </span>
      <div>
        <p>Image must be below 1024x1024px </p>
        <p>Use PNG, JPG or BMP format.</p>
      </div>
    </div>
  );
};
