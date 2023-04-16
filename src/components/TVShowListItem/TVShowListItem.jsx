import s from "./style.module.css";
import { SMALL_IMG_COVER_BASE_URL } from "../../config";
export function TVShowListItem({ tvShow, onClick }) {
  const MAX_TITLE_CHAR = 20;

  const onClick_ = () => {
    onClick(tvShow);
  };
  return (
    <div className={s.container}>
      <img
        alt={tvShow.name}
        src={SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path}
        onClick={onClick_}
        className={s.img}
      />
      <div className={s.title}>
        {tvShow.name.length > MAX_TITLE_CHAR
          ? tvShow.name.slice(0, 20) + "..."
          : tvShow.name}
      </div>
    </div>
  );
}
