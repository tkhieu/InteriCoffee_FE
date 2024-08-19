import { Images } from "@/utils/images";
import Image from "next/image";
import React, { useState } from "react";

const RatingSection = ({ rating }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  return (
    <div className="flex flex-row items-center justify-center gap-5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isHalfStar = currentRating >= star - 0.5 && currentRating < star;
        return (
          <Image
            key={star}
            src={
              star <= currentRating
                ? Images.ratedStarIcon
                : isHalfStar
                ? Images.halfRatedStarIcon
                : Images.unratedStarIcon
            }
            alt={`${star} star`}
            width={10}
            height={10}
            className="cursor-pointer"
          />
        );
      })}
    </div>
  );
};

export default RatingSection;