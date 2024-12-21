import React, { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Volume2, CircleEllipsis } from "lucide-react";
import Slider from "@mui/material/Slider";
import "./Player.scss";

const Player = ({ currentSong }) => {
  const [click, setClick] = useState(PlayCircleIcon);
  const [position, setPosition] = useState(false);

  const handlePlayPause = (event) => {
    console.log("clicked");
    setClick(!click);
  };
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
            <Slider
              aria-label="time-indicator"
              size="small"
              // value={position}
              min={0}
              step={1}
              // max={duration}
              onChange={(_, value) => setPosition(value)}
              sx={(t) => ({
                marginTop: "10px",
                color: "white",
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 8,
                  height: 8,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&::before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                    ...t.applyStyles("dark", {
                      boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                    }),
                  },
                  "&.Mui-active": {
                    width: 20,
                    height: 20,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                ...t.applyStyles("dark", {
                  color: "#fff",
                }),
              })}
            />
            <div className="controls">
              <Button>
                <CircleEllipsis color="white" backgroundColor="#36454F" />
              </Button>
              <div>
                <Button>
                  <FastRewindIcon sx={{ color: "grey", fontSize: "30px" }} />
                </Button>

                {!click ? (
                  <Button onClick={handlePlayPause}>
                    <PlayCircleIcon sx={{ color: "white", fontSize: "40px" }} />
                  </Button>
                ) : (
                  <Button onClick={handlePlayPause}>
                    <PauseCircleIcon
                      sx={{ color: "white", fontSize: "40px" }}
                    />
                  </Button>
                )}

                <Button>
                  <FastForwardIcon sx={{ color: "grey", fontSize: "30px" }} />
                </Button>
              </div>

              <Button>
                <Volume2 color="white" backgroundColor="#36454F" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>Select a song to play</p>
      )}
    </div>
  );
};

export default Player;
