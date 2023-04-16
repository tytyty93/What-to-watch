import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  // Declare star icon array
  const starList = [];
  // Store number of filled stars
  const filledStars = Math.floor(rating);
  // Store if yes or no there is a half star
  const hasHalfStar = rating - parseInt(rating) >= 0.5;

  // Store the number of empty stars
  // If has halfstar, we minus 1 else we minus 0
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  // Push filled
  for (let i = 1; i <= filledStars; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }

  if (hasHalfStar) {
    starList.push(<StarHalf key={"star-half"} />);
  }

  for (let i = 1; i <= emptyStars; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }
  return <div>{starList}</div>;
}
