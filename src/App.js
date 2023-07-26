import { useState, useRef } from "react";
import { SidePanel } from "./components/side-panel";
import { Player } from "./components/player";
import getSongs from "./api/data";
import styles from "./App.module.scss";

function App() {
  const songs = useRef(getSongs());
  const initialCurrentSong = songs.current.find((song) => song.active === true) || songs.current[0];
  const [currentSong, setCurrentSong] = useState(initialCurrentSong);

  const handleSongSelect = (selectedSong) => {
    setCurrentSong(selectedSong);
  };

  const handleNextSong = () => {
    const currentSongIndex = songs.current.findIndex(
        (song) => song.id === currentSong.id
    );
    let nextSongIndex = currentSongIndex + 1;

    if (nextSongIndex >= songs.current.length) {
      nextSongIndex = 0;
    }

    setCurrentSong(songs.current[nextSongIndex]);
  };

  const handlePreviousSong = () => {
    const currentSongIndex = songs.current.findIndex(
        (song) => song.id === currentSong.id
    );
    let previousSongIndex = currentSongIndex - 1;

    if (previousSongIndex < 0) {
      previousSongIndex = songs.current.length - 1;
    }

    setCurrentSong(songs.current[previousSongIndex]);
  };

  return (
      <div className={styles.container}>
        <SidePanel
            songs={songs.current}
            currentSongId={currentSong.id}
            onSongSelect={handleSongSelect}
        />
        <Player
            song={currentSong}
            onNext={handleNextSong}
            onPrevious={handlePreviousSong}
        />
      </div>
  );
}

export default App;
