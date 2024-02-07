import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useEffect } from "react";
import STYLES from "../../../constants/style.constants";

type StarProps = {
  onRate: (rating: number) => void;
  initialRating?: number;
};

export const Star = ({ onRate, initialRating = 0 }: StarProps) => {
  const [rating, setRating] = useState(initialRating);
  useEffect(() => setRating(initialRating), [initialRating]);

  const handleRating = (rate: number) => {
    setRating(rate);
    onRate(rate);
  };

  return (
    <Rating
      onClick={handleRating}
      allowFraction={true}
      fillColor={STYLES.COLORS.PURPLE_ONE}
      initialValue={rating}
      readonly={initialRating ? true : false}
    />
  );
};
