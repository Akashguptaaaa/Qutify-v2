import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SongsSection.module.css";

function SongsSection() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await axios.get("https://qtify-backend.labs.crio.do/songs");
        setSongs(response.data || []);
      } catch (error) {
        setSongs([]);
      }
    }

    fetchSongs();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Songs</h2>
      </div>
      <div className={styles.grid}>
        {songs.map((song) => (
          <article key={song.id} className={`${styles.songCard} song-card`}>
            <img src={song.image} alt={song.title} className={styles.image} />
            <div className={styles.info}>
              <p className={styles.title}>{song.title}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SongsSection;
