import React from "react";
import styles from "./song-item.module.scss";
import classnames from "classnames";

export default function SongItem({ song, isActive, onSongSelect }) {
  return (
    <div
      className={classnames(styles.wrapper, { [styles.active]: isActive })}
      onClick={() => onSongSelect(song)}
    >
      <img className={styles.artwork} src={song.cover} alt="artwork" />

      <div className={styles.info}>
        <div className={styles.info_name}>{song.name}</div>
        <div className={styles.info_artist}>{song.artist}</div>
      </div>
    </div>
  );
}
