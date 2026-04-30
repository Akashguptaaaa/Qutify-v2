import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const INITIAL_VISIBLE_CARDS = 7;
const CARD_WIDTH = 160;
const CARD_GAP = 20;

function Section({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await axios.get(endpoint);
        setItems(response.data || []);
      } catch (error) {
        setItems([]);
      }
    }

    fetchAlbums();
  }, [endpoint]);

  const maxStartIndex = Math.max(0, items.length - INITIAL_VISIBLE_CARDS);
  const trackOffset = startIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
          type="button"
          onClick={() => {
            setShowAll((prev) => !prev);
            setStartIndex(0);
          }}
        >
          {showAll ? "Collapse" : "Show all"}
        </button>
      </div>

      {!showAll ? (
        <div className={styles.sliderControls}>
          <button
            type="button"
            aria-label="previous"
            onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
            disabled={startIndex === 0}
          >
            Prev
          </button>
          <button
            type="button"
            aria-label="next"
            onClick={() => setStartIndex((prev) => Math.min(maxStartIndex, prev + 1))}
            disabled={startIndex >= maxStartIndex}
          >
            Next
          </button>
        </div>
      ) : null}

      {showAll ? (
        <div className={styles.grid}>
          {items.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              follows={album.follows}
              title={album.title}
            />
          ))}
        </div>
      ) : (
        <div className={styles.sliderViewport}>
          <div
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${trackOffset}px)` }}
          >
            {items.map((album) => (
              <Card
                key={album.id}
                image={album.image}
                follows={album.follows}
                title={album.title}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Section;
