// components/header-bar/header-bar.tsx

import Image from "next/image";
import React from "react";
import { Images } from "@/utils/images";
import Link from "next/link";

const HeaderBar = () => {
  return (
    //Commiter: Khang Thuận
    //Date: 20/08/2024
    //Change 2: Add Padding x-axis to the header for more space
    <div className="flex flex-row gap-2 items-center justify-between px-10">
      <Link href="/">
        <Image
          src={Images.headerLogo}
          alt="header-logo"
          width={180}
          height={180}
          className=""
        />
      </Link>
      {/* Change 3: Add extra gap value to the general nav for more space */}
      <div className="flex flex-row gap-8 items-center">
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
      {/* Change 4: Adjust the way Login and Signup options separated */}
      <div className="flex flex-row justify-between items-center gap-2">
          <Link href="/login" className="text-lg font-outfit font-bold leading-[3.78rem] text-white">Login </Link>
          <span className="text-white">/</span>
          <Link href="/signup" className="text-lg font-outfit font-bold leading-[3.78rem] text-white"> Signup</Link>
        </div>
    </div>
  );
};

export default HeaderBar;
