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
import kesariya from "../../assets/songs/kesariya.mp3";

const Player = ({ currentSong }) => {
  const [click, setClick] = useState(PlayCircleIcon);
  const [position, setPosition] = useState(0);
  const [bgColor, setBgColor] = useState(""); // Default color
  const [isFavorite, setIsFavorite] = useState(false);
  const [favpopoverVisible, setFavPopoverVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference to the audio element
  const [volume, setVolume] = useState(1); // Default volume is 100%

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

        // console.log("Dominant Color:", r, g, b); // Log the dominant color for debugging

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
        // console.log("Generated Gradient:", gradientColor); // Log the gradient for debugging
        setBgColor(gradientColor); // Set the gradient background
      } catch (error) {
        console.error("Error generating gradient:", error);
      }
    };

    img.onerror = () => {
      console.error("Error loading image");
    };
  }, [currentSong?.cover]);

  const handlePlayPause = (data) => {
    setClick(!click);
    setIsPlaying(!isPlaying);
    if (!audioRef.current) {
      audioRef.current = new Audio(kesariya);
      audioRef.current.volume = volume; // Set initial volume
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Update song progress based on audio current time
  useEffect(() => {
    const updatePosition = () => {
      if (audioRef.current) {
        setPosition(audioRef.current.currentTime);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updatePosition);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updatePosition);
      }
    };
  }, []);

  const handleVolumeChange = (event, newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
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

            {/* Popover Button with Circle Ellipsis */}

            <Slider
              value={position}
              size="small"
              min={0}
              max={audioRef.current?.duration || 1}
              onChange={(_, value) => setPosition(value)}
              sx={{
                marginTop: "10px",
                color: "white",
                height: 4,
              }}
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

                {click ? (
                  <Button
                    onClick={() => handlePlayPause(currentSong)}
                    style={{ color: "white" }}
                  >
                    <PlayCircleIcon sx={{ color: "white", fontSize: "40px" }} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePlayPause(currentSong)}
                    style={{ color: "white" }}
                  >
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

            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-label="volume"
              size="small"
              min={0}
              max={1}
              step={0.01}
              sx={{
                color: "white",
                height: 4,
                marginTop: "10px",
              }}
            />
          </div>
        </>
      ) : (
        <div>Select a Song</div>
      )}
    </div>
  );
};

export default Player;
