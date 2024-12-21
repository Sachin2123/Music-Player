import React, { useEffect, useState } from "react";
import SongItem from "../SongItem/SongItem";
import "./SongList.scss";
import data from "../../assets/dumyyData.json";

const SongList = ({ setCurrentSong, searchQuery }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(data); // Simulate API call
  }, []);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.duration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="song-list">
      {filteredSongs.length > 0 ? (
        filteredSongs.map((song) => (
          <SongItem key={song.id} song={song} setCurrentSong={setCurrentSong} />
        ))
      ) : (
        <p>No songs found.</p>
      )}
    </div>
  );
};

export default SongList;
