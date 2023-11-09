import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "~/components/LoginButton";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      void router.push("/");
    }
  }, [router, session]);

  return (
    <div className="">
      <Login />
    </div>
  );
};

export default LoginPage;
