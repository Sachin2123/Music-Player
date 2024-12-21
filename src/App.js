import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import SongList from "./components/SongList/SongList";
import Player from "./components/Player/Player";
import "./App.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Header />
        <SongList setCurrentSong={setCurrentSong} />
      </div>
      <Player currentSong={currentSong} />
    </div>
  );
}

export default App;
