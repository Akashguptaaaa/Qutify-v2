import { useEffect, useRef, useState } from "react";
import styles from "./SongPlayer.module.css";

function getAudioUrl(song) {
  return song?.url || song?.audio || song?.source || "";
}

function SongPlayer({ currentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    setProgress(0);
  }, [currentSong?.id]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !getAudioUrl(currentSong)) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className={styles.player}>
      <div className={styles.songMeta}>
        {currentSong?.image ? <img src={currentSong.image} alt={currentSong.title} /> : null}
        <div>
          <p>{currentSong?.title || "Select a song"}</p>
          <span>{currentSong?.album?.title || ""}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={togglePlay} disabled={!getAudioUrl(currentSong)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => {
            const value = Number(e.target.value);
            setProgress(value);
            if (!audioRef.current || !audioRef.current.duration) return;
            audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={getAudioUrl(currentSong)}
        onTimeUpdate={() => {
          if (!audioRef.current || !audioRef.current.duration) return;
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }}
        onEnded={() => setIsPlaying(false)}
      />
    </section>
  );
}

export default SongPlayer;
