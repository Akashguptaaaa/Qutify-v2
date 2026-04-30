import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, endpoint, buttonText = "Collapse" }) {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

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
        <button type="button" onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? "Show all" : buttonText}
        </button>
      </div>

      {!collapsed ? (
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
      ) : null}
    </section>
  );
}

export default Section;
