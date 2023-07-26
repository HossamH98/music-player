import React, { useState, useRef, useEffect } from "react";
import styles from "./player.module.scss";
import { Controls } from "../controls";
import { ProgressBar } from "../progress-bar";

export default function Player({ song, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [justMounted, setJustMounted] = useState(true);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32) {
        event.preventDefault();
        handlePlayPause();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (justMounted) {
      setJustMounted(false);
    } else {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [song]);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const handleSeekBarChange = (e) => {
    const currentTime = parseFloat(e.target.value);
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const handleLoadedMetadata = (e) => {
    setSongInfo({ currentTime: 0, duration: e.target.duration });
  };

  const handleSongEnd = () => {
    // setIsPlaying(false);
    onNext();
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.artwork} src={song.cover} alt="artwork" />
        <div className={styles.info}>
          <div className={styles.info_name} style={{ color: song.color[0] }}>
            {song.name}
          </div>
          <div className={styles.info_artist} style={{ color: song.color[1] }}>
            {song.artist}
          </div>
        </div>
      </div>
      <ProgressBar
        currentTime={songInfo.currentTime}
        duration={songInfo.duration}
        onSeekBarChange={handleSeekBarChange}
      />
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />
    </div>
  );
}
