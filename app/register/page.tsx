"use client";
import React from "react";
import { Form } from "../components/Form";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const constRegiser = async (name: string, password: string) => {
    if (!name || !password) return;
    try {
      const response = await axios.post("https://devlink-backend-production.up.railway.app/auth/register", {
        name,
        password,
      });

      if (response.status === 201) {
        <p>succes</p>;
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error: any) {
      return error.response.data.error;
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <Form onSubmitFetch={constRegiser} isLogin={false}></Form>
    </main>
  );
}
