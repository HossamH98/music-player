import React from "react";
import classNames from "classnames";
import styles from "./controls.module.scss";

export default function Controls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) {
  return (
    <div className={styles.wrapper}>
      <button onClick={onPrevious}>
        <span className={classNames("material-icons", styles.navigation_icon)}>
          navigate_before
        </span>
      </button>

      <button onClick={onPlayPause}>
        <span className={classNames("material-icons", styles.playback_icon)}>
          {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>

      <button onClick={onNext}>
        <span className={classNames("material-icons", styles.navigation_icon)}>
          navigate_next
        </span>
      </button>
    </div>
  );
}
