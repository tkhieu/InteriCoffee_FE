import React from "react";
import Image from "next/image";
import { products } from "@/utils/product-card-dummy";

const ProductListItem = () => {
  return (
    <div className="flex flex-wrap justify-between content-between w-[1000px] mx-auto py-8 gap-y-8 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 flex-basis-[calc(33.333%-1rem)] box-border border-2 border-[#6F4E37] rounded-lg w-[260px] h-[300px] flex flex-col items-center justify-between"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="w-[180px]"
          />
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-[#6F4E37]">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListItem;
