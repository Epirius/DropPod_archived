import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-BLACK_CYNICAL text-slate-50">
      <Image
        src={"/public/logo1.png"}
        width="40"
        height="40"
        alt={"Drop pod logo"}
      />
      <p>DropPod</p>
    </header>
  );
};

export default Header;
