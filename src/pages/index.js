import React from "react";
import FurnitureCard from "@/components/furniture-item/furniture-card";
import ProductCard from "@/components/product-card/product-card";
import Image from "next/image";
import { Images } from "@/utils/images";
import { Button } from "@/components/ui/button";
import Background from "@/components/background/background";

const Homepage = () => {
  return (
    <>
      <Background />
      <div className="container">
        <FurnitureCard />
        <ProductCard />
      </div>
    </>
  );
};

export default Homepage;
