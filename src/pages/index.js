import React from "react";
import FurnitureCard from "@/components/furniture-item/furniture-card";
import ProductCard from "@/components/product-card/product-card";
import Image from "next/image";
import { Images } from "@/utils/images";
import { Button } from "@/components/ui/button";

const Homepage = () => {
  return (
    <>
      <div className="container">
        <FurnitureCard />
        <ProductCard />
        <div className="flex flex-col items-center py-12">
          <Button className="bg-[#793E15] w-40">
            More Product
            <Image
              src={Images.moreIcon}
              alt="more-icon"
              width={20}
              height={20}
              className="pl-2"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
