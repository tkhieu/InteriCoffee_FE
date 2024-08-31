import Image from "next/image";
import React, { useState } from "react";
import { products } from "@/utils/product-card-dummy";
import RatingSection from "@/components/rating/rating-section";

export const ProductCard = ({ imageUrl, name, price, rating, isSale }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden text-center p-2">
      <Image
        src={imageUrl}
        alt={name}
        width={260}
        height={450}
        className="p-4"
      />
      <div className="flex flex-col gap-3">
        <p className="text-white font-outfit font-bold">{name}</p>
        <RatingSection rating={rating} />
        <p className="text-white font-outfit font-normal">{price}</p>
      </div>
    </div>
  );
};

const ProductCardList = () => {
  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
          Recent Products
        </h1>
        <p className="text-white font-outfit pb-2">
          Checkout our latest products
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {products.slice(0, 6).map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            rating={product.rating}
            isSale={product.isSale}
          />
        ))}
      </div>
      {products.some(product => product.isSale) && products.length > 0 && (
    <>
      <div className="flex flex-col items-start">
        <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
          On Sale
        </h1>
        <p className="text-white font-outfit pb-2">
          Special Discount on these items, grab them quickly!
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {products.filter(product => product.isSale).slice(0, 6).map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            rating={product.rating}
            isSale={product.isSale}
          />
        ))}
      </div>
    </>
  )}
    </>
  );
};

export default ProductCardList;
