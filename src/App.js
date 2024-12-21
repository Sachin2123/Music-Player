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

  return (
    <div className="app">
      <BrowserRouter>
        {/* Use Routes instead of Router in React Router v6 */}
        <Routes>
          <Route exact path="/Favourites" element={<Favourites />} />
          {/* Define other routes if necessary */}
        </Routes>

        {/* Sidebar and other components */}
        <Sidebar />
        <div className="content">
          <Header />
          <SongList setCurrentSong={setCurrentSong} />
        </div>
        <Player currentSong={currentSong} />
      </BrowserRouter>
    </div>
  );
}

export default App;
