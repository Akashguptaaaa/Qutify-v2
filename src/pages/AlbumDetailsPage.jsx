import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Card from "../components/Card/Card";
import styles from "./AlbumDetailsPage.module.css";

const PAGE_SIZE = 13;

function AlbumDetailsPage() {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const [topRes, newRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/albums/top"),
          axios.get("https://qtify-backend.labs.crio.do/albums/new"),
        ]);
        const allAlbums = [...(topRes.data || []), ...(newRes.data || [])];
        const selectedAlbum = allAlbums.find((item) => item.slug === slug) || null;
        setAlbum(selectedAlbum);
      } catch (error) {
        setAlbum(null);
      }
    }

    fetchAlbum();
  }, [slug]);

  const songs = album?.songs || [];
  const pageCount = Math.ceil(songs.length / PAGE_SIZE);
  const visibleSongs = useMemo(
    () => songs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [songs, page]
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/">Back to Home</Link>
        <h1>{album?.title || "Album details"}</h1>
      </div>
      <div className={styles.grid}>
        {visibleSongs.map((song) => (
          <Card
            key={song.id}
            image={song.image || album?.image}
            title={song.title}
            count={song.likes}
            countLabel="Likes"
            className="song-card"
          />
        ))}
      </div>
      {pageCount > 1 ? (
        <div className={styles.pagination}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
          />
        </div>
      ) : null}
    </div>
  );
}

export default AlbumDetailsPage;
