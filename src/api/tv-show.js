import axios from "axios";
import { BASE_URL, API_KEY_PARAM, BACKDROP_BASE_URL } from "../config";
import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from "./fake_data";

export class TVShowAPI {
  // LECTURE 41: We use the static in front of the function so that we can fetch the function directly
  // without having to create an instance of the class first
  static async fetchPopulars() {
    const response = await axios.get(`${BASE_URL}tv/top_rated${API_KEY_PARAM}`);
    console.log(response.data.results);
    // For axios, we will always have to call .data.results
    return response.data.results;
    // return FAKE_POPULARS;
  }

  // LECTURE 49: Fetching recommendations
  static async fetchRecommendations(tvShowId) {
    const response = await axios.get(
      `${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`
    );
    // For axios, we will always have to call .data.results
    return response.data.results;

    // return FAKE_RECOMMENDATIONS;
  }

  // LECTURE 54: Fetching TV shows by title
  static async fetchBytitle(title) {
    const response = await axios.get(
      `${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`
    );
    // For axios, we will always have to call .data.results
    return response.data.results;

    // return FAKE_RECOMMENDATIONS;
  }
}
