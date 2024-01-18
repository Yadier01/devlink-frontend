import React from "react";
import { Form } from "../components/Form";
export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <Form isLogin={false}></Form>
    </main>
  );
}
