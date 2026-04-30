import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import searchIcon from "../../../assets/Search icon.svg";

function Search({ placeholder = "search a song", searchData = [] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const filtered = searchData.filter((item) =>
    item.title?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (album) => {
    setQuery(album.title);
    setOpen(false);
    if (album.slug) navigate(`/album/${album.slug}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form
        className={`search-wrapper ${styles.wrapper}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (filtered[0]) handleSelect(filtered[0]);
        }}
      >
        <input
          type="text"
          name="search"
          className={`search ${styles.search}`}
          data-testid="search-input"
          placeholder={placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />

        <button type="submit" className={`search-button ${styles.searchButton}`}>
          <img src={searchIcon} alt="search" />
        </button>
      </form>
      {open && query.trim() && filtered.length > 0 ? (
        <ul className={styles.dropdown}>
          {filtered.slice(0, 6).map((album) => (
            <li key={album.id} onClick={() => handleSelect(album)}>
              <p className={styles.albumTitle}>{album.title}</p>
              <p className={styles.albumArtists}>{album.description}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Search;