import React, { useEffect, useState } from "react";
import SongItem from "../SongItem/SongItem";
import "./SongList.scss";
import data from "../../assets/dumyyData.json";

const SongList = ({ setCurrentSong }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(data); // Simulate API call
  }, []);

  return (
    <div className="song-list">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} setCurrentSong={setCurrentSong} />
      ))}
    </div>
  );
};

export default SongList;
