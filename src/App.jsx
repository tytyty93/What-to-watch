import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { BASE_URL, API_KEY_PARAM, BACKDROP_BASE_URL } from "./config";
// LECTURE 47: Displaying Logo
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png";
//LECTURE 48: TV Show list item
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";

// LECTURE 49: Import TV Show Lists
import { TVShowList } from "./components/TVShowList/TVShowList";

// LECTURE 53: SearchBar
import { SearchBar } from "./components/SearchBar/SearchBar";

// LECTURE 44: Make sure that we only run the fetch ONCE, notice that it is outside of the App()
export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState();
  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (err) {
      alert("Something went wrong when fetching the popular TV show.");
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      );
      if (recommendationListResp.length > 0) {
        // We are getting only the top recommended TV shows based on the TV Show ID
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
    } catch (err) {
      alert("Something went wrong when fetching the recommended TV show.");
    }
  }
  // LECTURE 54: Searching TV shows by title
  async function fetchBytitle(title) {
    try {
      const searchResp = await TVShowAPI.fetchBytitle(title);
      if (searchResp.length > 0) {
        // We are getting only the top recommended TV shows based on the TV Show ID
        setCurrentTVShow(searchResp[0]);
      }
    } catch (err) {
      alert("Something went wrong when fetching the searched TV show.");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  // LECTURE 49: If currentTVShow is defined, then we call the fetchRecommendations function and input the TV Show's ID as param
  // We are also only for listening to changes from currentTVShow before updating it.
  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  // LECTURE 52: Event callback, clicking on a TV Show
  function updateTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }
  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? // Using the ? and : to indicate that if we are unable to fetch the show, the background will be black
            `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4"></div>
          <Logo
            img={logoImg}
            title={"Find shows for Teng Yao and Woan Yin"}
            subtitle={"Find a show you may like"}
          />
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchBytitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {/* WILL ONLY SHOW THE TV SHOW DETAILS IF THE CurrentTVShow is defined. 
        i.e successfully fetched the data from API */}
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {recommendationList && (
          <TVShowList
            onClickItem={updateTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
