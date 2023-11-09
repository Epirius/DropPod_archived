import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo1.png";
import Navbar from "./Navbar";
import Login from "~/components/LoginButton";

const Header = () => {
  return (
    <header className="flex flex-row items-center bg-BLACK_CYNICAL text-slate-50">
      <Link
        href={"/"}
        className="flex w-auto flex-row items-center gap-3 py-3 pl-2 hover:scale-105 mr-6 sm:mr-16"
      >
        <Image src={logo} width="40" height="40" alt={"Drop pod logo"} />
        <p className="invisible w-0 sm:w-fit sm:visible">DropPod</p>
      </Link>
      <Navbar />
      <Login />
    </header>
  );
};

export default Header;
