import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({ title, endpoint, isSongsSection = false, onSongsLoaded, onSongSelect }) {
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(endpoint);
        const data = response.data || [];
        setItems(data);
        if (isSongsSection && typeof onSongsLoaded === "function") onSongsLoaded(data);
      } catch (error) {
        setItems([]);
      }
    }

    fetchData();
  }, [endpoint, isSongsSection, onSongsLoaded]);

  useEffect(() => {
    if (!isSongsSection) return;

    async function fetchGenres() {
      try {
        const response = await axios.get("https://qtify-backend.labs.crio.do/genres");
        setGenres(response.data?.data || []);
      } catch (error) {
        setGenres([]);
      }
    }

    fetchGenres();
  }, [isSongsSection]);

  const filteredItems = isSongsSection
    ? selectedGenre === "all"
      ? items
      : items.filter((song) => song.genre?.key === selectedGenre)
    : items;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {!isSongsSection ? (
          <button
            type="button"
            onClick={() => {
              setShowAll((prev) => !prev);
            }}
          >
            {showAll ? "Collapse" : "Show all"}
          </button>
        ) : null}
      </div>

      {isSongsSection ? (
        <div className={styles.tabsWrap}>
          <Tabs
            value={selectedGenre}
            onChange={(_, value) => setSelectedGenre(value)}
            className={styles.tabs}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All" value="all" />
            {genres.map((genre) => (
              <Tab key={genre.key} label={genre.label} value={genre.key} />
            ))}
          </Tabs>
        </div>
      ) : null}

      {!isSongsSection && showAll ? (
        <div className={styles.grid}>
          {filteredItems.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              count={album.follows}
              countLabel="Follows"
              className="album-card"
              onClick={() => {
                if (album.slug) navigate(`/album/${album.slug}`);
              }}
            />
          ))}
        </div>
      ) : (
        <Carousel
          data={filteredItems}
          idPrefix={title.toLowerCase().replace(/\s+/g, "-")}
          renderItem={(item) => (
            <Card
              image={item.image}
              title={item.title}
              count={isSongsSection ? item.likes : item.follows}
              countLabel={isSongsSection ? "Likes" : "Follows"}
              className={isSongsSection ? "song-card" : "album-card"}
              onClick={() => {
                if (isSongsSection) {
                  if (typeof onSongSelect === "function") onSongSelect(item);
                } else if (item.slug) {
                  navigate(`/album/${item.slug}`);
                }
              }}
            />
          )}
        />
      )}
    </section>
  );
}

export default Section;
