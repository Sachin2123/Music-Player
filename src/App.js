import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import SongList from "./components/SongList/SongList";
import Player from "./components/Player/Player";
import Favourites from "./Pages/Favourites/Favourites";
import "./App.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/Favourites" element={<Favourites />} />
        </Routes>

        <Sidebar />
        <div className="content">
          <Header setSearchQuery={setSearchQuery} />
          <SongList setCurrentSong={setCurrentSong} searchQuery={searchQuery} />
        </div>
        <Player currentSong={currentSong} />
      </BrowserRouter>
    </div>
  );
}

export default App;
