import Image from "next/image";
import React from "react";
import { Images } from "@/utils/images";
import { Input } from "../ui/input";

const ProductListFilter = () => {
  return (
    <div>
      <h1>PRODUCTS</h1>
      <Input placeholder="Search for products"><Image src={Images.moreIcon} alt="more-icon"/></Input>
    </div>
  );
};

export default ProductListFilter;
