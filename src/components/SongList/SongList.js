import React, { useEffect, useState } from "react";
import SongItem from "../SongItem/SongItem";
import "./SongList.scss";
import data from "../../assets/dumyyData.json";

const SongList = ({ setCurrentSong, searchQuery }) => {
  const [songs, setSongs] = useState([]);
  const [debounce, setDebounce] = useState(searchQuery);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    setSongs(data); // Simulate API call
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const results = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(debounce.toLowerCase()) ||
        song.artist.toLowerCase().includes(debounce.toLowerCase()) ||
        song.duration.toLowerCase().includes(debounce.toLowerCase())
    );
    setFilteredSongs(results);
  }, [debounce, songs]);

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
