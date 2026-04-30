import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import FAQSection from "./components/FAQSection/FAQSection";
import SongPlayer from "./components/SongPlayer/SongPlayer";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";
import AlbumDetailsPage from "./pages/AlbumDetailsPage";
import "./App.css";
import { useEffect } from "react";

function HomePage() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    async function fetchAlbumsForSearch() {
      try {
        const [topRes, newRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/albums/top"),
          axios.get("https://qtify-backend.labs.crio.do/albums/new"),
        ]);
        setTopAlbums(topRes.data || []);
        setNewAlbums(newRes.data || []);
      } catch (error) {
        setTopAlbums([]);
        setNewAlbums([]);
      }
    }

    fetchAlbumsForSearch();
  }, []);

  const searchData = useMemo(() => [...topAlbums, ...newAlbums], [topAlbums, newAlbums]);

  return (
    <div className="app">
      <Navbar searchData={searchData} onFeedbackOpen={() => setFeedbackOpen(true)} />
      <Hero />
      <Section
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
      />
      <Section
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
      />
      <Section
        title="Songs"
        endpoint="https://qtify-backend.labs.crio.do/songs"
        isSongsSection
        onSongSelect={setSelectedSong}
      />
      <FAQSection />
      <SongPlayer currentSong={selectedSong} />
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/album/:slug" element={<AlbumDetailsPage />} />
    </Routes>
  );
}

export default App;
