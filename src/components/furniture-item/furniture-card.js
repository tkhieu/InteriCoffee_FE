import Image from "next/image";
import React from "react";
import { items } from "@/utils/furniture-card-dummy.js";

const FurnitureCard = ({ imageUrl, name }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden w-1/3 text-center">
      <Image
        src={imageUrl}
        alt={name}
        width={350}
        height={250}
        className="p-4 pl-0"
      />
      {/* <p className="text-[#6F4E37] font-outfit font-bold">{name}</p> */}
    </div>
  );
};

const FurnitureCardList = () => {
  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
          Furniture Collections
        </h1>
        <p className="text-white font-outfit pb-2">Check out some of our merchants collections</p>
      </div>
      <div className="flex flex-wrap justify-between">
        {items.map((item, index) => (
          <FurnitureCard
            key={index}
            imageUrl={item.imageUrl}
            name={item.name}
          />
        ))}
      </div>
    </>
  );
};

export default FurnitureCardList;
