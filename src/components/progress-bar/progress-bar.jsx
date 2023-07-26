import React from "react";
import styles from "./progress-bar.module.scss";

const ProgressBar = ({ currentTime, duration, onSeekBarChange }) => {

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={styles.progress_bar}>
      <span className={styles.time_info}>{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={onSeekBarChange}
      />
      <span className={styles.time_info}>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
