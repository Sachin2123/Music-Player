import ColorThief from "colorthief";
import { React, useEffect, useState, useRef } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Volume2, CircleEllipsis } from "lucide-react";
import Slider from "@mui/material/Slider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Popover, OverlayTrigger } from "react-bootstrap";
import "./Player.scss";

const Player = ({ currentSong }) => {
  const [click, setClick] = useState(PlayCircleIcon);
  const [position, setPosition] = useState(false);
  const [bgColor, setBgColor] = useState(""); // Default color
  const [isFavorite, setIsFavorite] = useState(false);
  const [favpopoverVisible, setFavPopoverVisible] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      // Check if the audio element is ready and play the song
      audioRef.current.src = currentSong.audio; // Set the audio source
      audioRef.current.play().catch((error) => {
        // Handle any errors (like if autoplay is blocked in the browser)
        console.log("Error playing audio:", error);
      });
    }
  }, [currentSong]);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (!currentSong?.cover) return; // Ensure the cover URL is available

    const img = new Image();
    img.src = currentSong.cover; // Use the cover image URL
    img.crossOrigin = "Anonymous"; // Required to avoid CORS issues

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img); // Get dominant color

        console.log("Dominant Color:", r, g, b); // Log the dominant color for debugging

        // Generate a gradient based on the dominant color
        const generateGradient = (r, g, b) => {
          const complementR = 255 - r;
          const complementG = 255 - g;
          const complementB = 255 - b;

          const lightenColor = (r, g, b) => {
            const factor = 0.3; // Adjust this factor to get lighter or deeper colors
            return [
              Math.min(255, r + (255 - r) * factor),
              Math.min(255, g + (255 - g) * factor),
              Math.min(255, b + (255 - b) * factor),
            ];
          };

          const [lightR, lightG, lightB] = lightenColor(r, g, b);
          const gradientStart = `rgb(${lightR}, ${lightG}, ${lightB})`;
          const gradientEnd = `rgb(${complementR}, ${complementG}, ${complementB})`;

          return `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
        };

        const gradientColor = generateGradient(r, g, b);
        console.log("Generated Gradient:", gradientColor); // Log the gradient for debugging
        setBgColor(gradientColor); // Set the gradient background
      } catch (error) {
        console.error("Error generating gradient:", error);
      }
    };

    img.onerror = () => {
      console.error("Error loading image");
    };
  }, [currentSong?.cover]);

  const handlePlayPause = (event) => {
    console.log("clicked");
    setClick(!click);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "8px",
          color: "black",
        }}
      >
        <Button onClick={handleFavorite}>
          {isFavorite ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderRoundedIcon sx={{ color: "black" }} />
          )}
          {isFavorite ? (
            <span style={{ marginLeft: "10px", color: "black" }}>
              Unmark as Favorite{" "}
            </span>
          ) : (
            <span style={{ marginLeft: "10px", color: "black" }}>
              Mark as Favorite
            </span>
          )}
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="player" style={{ backgroundColor: bgColor }}>
      {currentSong ? (
        <>
          <div className="player-info">
            <div className="details">
              <h4>{currentSong.title}</h4>
              <p style={{ color: "grey" }}>{currentSong.artist}</p>
            </div>
            <img
              style={{ marginTop: "40px" }}
              className="SongCoverImage"
              src={currentSong.cover}
              alt={currentSong.title}
            />
            <audioref ref={audioRef} controls />

            {/* Popover Button with Circle Ellipsis */}

            <Slider
              aria-label="time-indicator"
              size="small"
              // value={position}
              min={0}
              step={1}
              // max={currentSong.duration}
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
              <OverlayTrigger
                trigger="click"
                placement="left"
                overlay={popover}
                show={favpopoverVisible}
                onToggle={() => setFavPopoverVisible(!favpopoverVisible)}
              >
                <Button style={{ color: "white" }} variant="link">
                  <CircleEllipsis color="white" backgroundColor="#36454F" />
                </Button>
              </OverlayTrigger>

              <div>
                <Button style={{ color: "white" }}>
                  <FastRewindIcon sx={{ color: "grey", fontSize: "30px" }} />
                </Button>

                {!click ? (
                  <Button onClick={handlePlayPause} style={{ color: "white" }}>
                    <PlayCircleIcon sx={{ color: "white", fontSize: "40px" }} />
                  </Button>
                ) : (
                  <Button onClick={handlePlayPause} style={{ color: "white" }}>
                    <PauseCircleIcon
                      sx={{ color: "white", fontSize: "40px" }}
                    />
                  </Button>
                )}

                <Button style={{ color: "white" }}>
                  <FastForwardIcon sx={{ color: "grey", fontSize: "30px" }} />
                </Button>
              </div>

              <Button style={{ color: "white" }}>
                <Volume2 color="white" backgroundColor="#36454F" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div>Select a Song</div>
      )}
    </div>
  );
};

export default Player;
