import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
          type="button"
          onClick={() => {
            setShowAll((prev) => !prev);
          }}
        >
          {showAll ? "Collapse" : "Show all"}
        </button>
      </div>

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
        <Carousel
          data={items}
          idPrefix={title.toLowerCase().replace(/\s+/g, "-")}
          renderItem={(album) => (
            <Card image={album.image} follows={album.follows} title={album.title} />
          )}
        />
      )}
    </section>
  );
}

export default Section;
