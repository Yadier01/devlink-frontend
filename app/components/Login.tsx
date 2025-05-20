import { SignIn } from "@clerk/nextjs";

export const Login = async ({}) => {
  const { userId, redirectToSignIn } = await auth();
  if (userId) redirectToSignIn({ returnBackUrl: "/devlink/profile" });

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-8 h-80 w-80 flex flex-col items-center justify-center ">
      {/* <h1 className=" text-md">Please Sign In or Sign Up</h1> */}
      <SignIn />
    </div>
  );
};
