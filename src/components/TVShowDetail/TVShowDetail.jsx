import * as React from "react";
import { FiveStarRating } from "../FiveStarRating/FiveStarRating";

// LECTURE 45
import s from "./style.module.css";

// LECTURE 46: Rating component
export function TVShowDetail({ tvShow }) {
  const rating = tvShow.vote_average / 2;
  return (
    <div>
      <div className={s.title}>{tvShow.name}</div>
      <div className={s.rating_container}>
        <FiveStarRating rating={rating} />
        <span className={s.rating}>
          {(tvShow.vote_average / 2).toFixed(1)} / 5
        </span>
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
    </div>
  );
}
