import { React } from "react";
import "./SongItem.scss";

const SongItem = ({ song, setCurrentSong }) => {
  return (
    <div className="song-item" onClick={() => setCurrentSong(song)}>
      <img src={song.cover} alt={song.title} />
      <div className="details">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
      <span>{song.duration}</span>
    </div>
  );
};

export default SongItem;
