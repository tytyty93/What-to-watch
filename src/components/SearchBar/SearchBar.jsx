import s from "./style.module.css";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "react-bootstrap-icons";

export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  function submit(e) {
    // LECTURE 54: Searchbar handling, ensuring that we search only when the user presses on enter and its not spaces.
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      onSubmit(e.target.value);
      // Upon calling the submit function using the value derived from handlechange, we will reset the value to blank
      setValue("");
    }
  }

  // Whenever a user enter a word in the search bar, the value will be stored to be submitted once they press on enter which
  // is handled by the submit function.
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        onChange={handleChange}
        className={s.input}
        type="text"
        placeholder={"Search for a tv show you may like"}
        value={value}
      />
    </>
  );
}
