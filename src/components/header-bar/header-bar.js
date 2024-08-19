// components/header-bar/header-bar.tsx

import Image from "next/image";
import React from "react";
import { Images } from "@/utils/images";
import Link from "next/link";

const HeaderBar = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-between">
      <Link href="/">
        <Image
          src={Images.headerLogo}
          alt="header-logo"
          width={180}
          height={180}
          className=""
        />
      </Link>
      <div className="flex flex-row gap-4 items-center">
        <Link
          href="/products"
          className="flex text-center text-lg font-outfit font-bold leading-[3.78rem] text-white"
        >
          Products
        </Link>
        <Link
          href="/projects"
          className="flex text-center text-lg font-outfit font-bold leading-[3.78rem] text-white"
        >
          Projects
        </Link>

        <Link
          href="/about-us"
          className="flex text-center text-lg font-outfit font-bold leading-[3.78rem] text-white"
        >
          About Us
        </Link>
        <Link
          href="/settings"
          className="flex text-center text-lg font-outfit font-bold leading-[3.78rem] text-white"
        >
          Settings
        </Link>
        
      </div>
      <div className="flex flex-row">
          <Link href="/login" className="text-lg font-outfit font-bold leading-[3.78rem] text-white">Login /</Link>
          <Link href="/signup" className="text-lg font-outfit font-bold leading-[3.78rem] text-white">Signup</Link>
        </div>
    </div>
  );
};

export default HeaderBar;
