import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import "./App.css";

const API_BASE = "https://qtify-backend-labs.crio.do";
const SLIDE_SIZE = 4;

function AlbumSection({ title, data, showAll, onToggleShowAll, slideIndex, onNext, onPrev }) {
  const hasData = data.length > 0;
  const visibleData = showAll
    ? data
    : data.slice(slideIndex, Math.min(slideIndex + SLIDE_SIZE, data.length));

  return (
    <section className="section">
      <div className="sectionHeader">
        <h2>{title}</h2>
        <button type="button" onClick={onToggleShowAll}>
          {showAll ? "Collapse" : "Show all"}
        </button>
      </div>
      {!showAll && hasData ? (
        <div className="sliderControls">
          <button type="button" onClick={onPrev} disabled={slideIndex === 0}>
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={slideIndex + SLIDE_SIZE >= data.length}
          >
            Next
          </button>
        </div>
      ) : null}
      <div className={showAll ? "cardGrid" : "cardRow"}>
        {visibleData.map((item) => (
          <article key={item.id || item.slug || item.title} className="albumCard">
            <img src={item.image} alt={item.title} />
            <div className="cardMeta">
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [topShowAll, setTopShowAll] = useState(false);
  const [newShowAll, setNewShowAll] = useState(false);
  const [topSlide, setTopSlide] = useState(0);
  const [newSlide, setNewSlide] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [topRes, newRes, songsRes] = await Promise.all([
        fetch(`${API_BASE}/albums/top`),
        fetch(`${API_BASE}/albums/new`),
        fetch(`${API_BASE}/songs`),
      ]);
      const [topData, newData, songsData] = await Promise.all([
        topRes.json(),
        newRes.json(),
        songsRes.json(),
      ]);
      setTopAlbums(topData || []);
      setNewAlbums(newData || []);
      setSongs(songsData || []);
    }
    fetchData();
  }, []);

  const searchData = useMemo(() => [...topAlbums, ...newAlbums], [topAlbums, newAlbums]);

  return (
    <div className="app">
      <Navbar searchData={searchData} />
      <Hero />
      <AlbumSection
        title="Top Albums"
        data={topAlbums}
        showAll={topShowAll}
        onToggleShowAll={() => setTopShowAll((prev) => !prev)}
        slideIndex={topSlide}
        onPrev={() => setTopSlide((prev) => Math.max(0, prev - 1))}
        onNext={() => setTopSlide((prev) => Math.min(topAlbums.length - SLIDE_SIZE, prev + 1))}
      />
      <AlbumSection
        title="New Albums"
        data={newAlbums}
        showAll={newShowAll}
        onToggleShowAll={() => setNewShowAll((prev) => !prev)}
        slideIndex={newSlide}
        onPrev={() => setNewSlide((prev) => Math.max(0, prev - 1))}
        onNext={() => setNewSlide((prev) => Math.min(newAlbums.length - SLIDE_SIZE, prev + 1))}
      />
      <section className="section">
        <div className="sectionHeader">
          <h2>Songs</h2>
        </div>
        <div className="cardGrid">
          {songs.map((song) => (
            <article key={song.id || song.title} className="albumCard">
              <img src={song.image} alt={song.title} />
              <div className="cardMeta">
                <h3>{song.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
