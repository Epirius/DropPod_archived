import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo1.png";

const Header = () => {
  return (
    <header className=" flex bg-BLACK_CYNICAL text-slate-50">
      <Link
        href={"/"}
        className="flex w-auto flex-row items-center gap-3 py-3 pl-2"
      >
        <Image src={logo} width="40" height="40" alt={"Drop pod logo"} />
        <p>DropPod</p>
      </Link>
    </header>
  );
};

export default Header;
