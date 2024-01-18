import React from "react";
import { Form } from "../components/Form";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
export default function page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <Form  isLogin={false}></Form>
    </main>
  );
}
