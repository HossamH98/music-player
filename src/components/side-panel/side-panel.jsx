import React from "react";
import styles from "./side-panel.module.scss";
import { SongItem } from "../song-item";

export default function SidePanel({ songs, currentSongId, onSongSelect }) {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.nav_header}>Library</div>
      <div className={styles.songs_container}>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isActive={currentSongId === song.id}
            onSongSelect={onSongSelect}
          />
        ))}
      </div>
    </nav>
  );
}
