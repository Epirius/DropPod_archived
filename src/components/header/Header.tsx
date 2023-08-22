import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo1.png";
import { signIn, useSession } from "next-auth/react";
import ProfileAvatar from "../ui/ProfileAvatar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="flex flex-row items-center bg-BLACK_CYNICAL text-slate-50">
      <Link
        href={"/"}
        className="flex w-auto flex-row items-center gap-3 py-3 pl-2"
      >
        <Image src={logo} width="40" height="40" alt={"Drop pod logo"} />
        <p>DropPod</p>
      </Link>
      <Navbar />
      <Login />
    </header>
  );
};

const Login = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="ml-auto mr-3">
      {sessionData ? (
        <ProfileAvatar />
      ) : (
        <button
          className="rounded-full bg-GRAY_CLOUD px-8 py-2.5 font-semibold text-WHITE_EGG"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Header;
