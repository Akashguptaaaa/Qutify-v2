import React, { useState } from "react";
import styles from "./Search.module.css";
import searchIcon from "../../../assets/Search icon.svg";

function Search({ placeholder = "search" }) {
  const [query, setQuery] = useState("");

  return (
    <form className={`search-wrapper ${styles.wrapper}`}>
      <input
        type="text"
        name="search"
        className={`search ${styles.search}`}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className={`search-button ${styles.searchButton}`}>
        <img src={searchIcon} alt="search" />
      </button>
    </form>
  );
}

export default Search;