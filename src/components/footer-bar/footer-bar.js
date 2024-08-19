import React from "react";
import Image from "next/image";
import { Images } from "@/utils/images";

const FooterBar = () => {
  return (
    <footer className="bg-[#582400] text-white py-4">
      <div className="container mx-auto flex justify-evenly items-start pt-8 pb-2">
        <Image
          src={Images.footerLogo}
          alt="footer-logo"
          width={150}
          height={150}
        />
        <div className="flex flex-col gap-2">
          <div className="hover:text-gray-400 text-xl">Contact</div>
          <div className="flex flex-row items-baseline gap-2">
            <div className="hover:text-gray-400 text-lg font-semibold">Phone:</div>
            <div className="font-outfit text-sm font-normal">xxx-xxx-xxxx</div>
          </div>
          <div className="flex flex-row items-baseline gap-2">
            <div className="hover:text-gray-400 text-lg font-semibold">Email:</div>
            <div className="font-outfit text-sm font-normal">abc@gmail.com</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="hover:text-gray-400 text-xl">About</div>
          <div className="hover:text-gray-400 text-lg font-semibold">Features</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
