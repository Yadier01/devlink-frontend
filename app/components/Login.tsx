import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const Login = async ({}) => {
  const { userId, redirectToSignIn } = await auth();
  if (userId) redirectToSignIn({ returnBackUrl: "/devlink/profile" });

  return (
    <>
      <SignInButton />
    </>
  );
};
