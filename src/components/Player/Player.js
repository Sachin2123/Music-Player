import React from "react";
import {
  FastForwardIcon,
  FastRewindIcon,
  PlayCircleRoundedIcon,
  PauseCircleOutlineRoundedIcon,
  FavoriteBorderRoundedIcon,
} from "@mui/icons-material";

import "./Player.scss";

const Player = ({ currentSong }) => {
  return (
    <div className="player">
      {currentSong ? (
        <>
          <div className="player-info">
            <div className="details">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </div>
            <img
              style={{ marginTop: "40px" }}
              className="SongCoverImage"
              src={currentSong.cover}
              alt={currentSong.title}
            />
          </div>
        </>
      ) : (
        <p>Select a song to play</p>
      )}
    </div>
  );
};

export default Player;
