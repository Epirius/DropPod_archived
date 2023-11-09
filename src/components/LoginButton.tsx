import { signIn, useSession } from "next-auth/react";
import ProfileAvatar from "~/components/ui/ProfileAvatar";
import React from "react";

const Login = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="ml-auto mr-3">
      {sessionData ? (
        <ProfileAvatar />
      ) : (
        <button
          className="rounded-lg bg-RED_CARMINE h-8 w-16  font-semibold text-WHITE_EGG"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Login;
