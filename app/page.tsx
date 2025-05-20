"use client";

import { SignIn, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignIn
          fallbackRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
          }
        />
      </div>
    );
}
