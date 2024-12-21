import React from "react";
import "./Player.scss";

const Player = ({ currentSong }) => {
  return (
    <div className="player">
      {currentSong ? (
        <>
          <img src={currentSong.cover} alt={currentSong.title} />
          <div className="details">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </>
      ) : (
        <p>Select a song to play</p>
      )}
    </div>
  );
};

export default Player;
