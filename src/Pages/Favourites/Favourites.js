import { React, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Favourites.scss";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure you've installed this
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Favourites = () => {
  const [Favorite, setFavorite] = useState(false);
  const naviagte = useNavigate();
  const pages = [
    {
      item: "Kesariya",
      link: "/ForYou",
      icons: <FavoriteIcon />,
      Unfavourite: <FavoriteBorderRoundedIcon />,
    },
    {
      item: "Pani Da Rang",
      link: "",
      icons: <FavoriteIcon />,
      Unfavourite: <FavoriteBorderRoundedIcon />,
    },
    {
      item: "Khwaja",
      link: "",
      icons: <FavoriteIcon />,
      Unfavourite: <FavoriteBorderRoundedIcon />,
    },
    {
      item: "Blue Eyes",
      link: "",
      icons: <FavoriteIcon />,
      Unfavourite: <FavoriteBorderRoundedIcon />,
    },
  ];

  const handleChange = () => {
    setFavorite(!Favorite);
  };

  const handlenavigation = (link) => {
    console.log(link);
    naviagte(link === "/ForYou" ? "/ForYou" : "");
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <h4>Favourite Tracks</h4>
      </div>

      {/* Sidebar links */}
      <div className="links">
        <ul>
          {pages.map((page, index) => (
            <li onClick={() => handlenavigation(page.link)} key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "white" }}>{page.item}</span>
                {!Favorite ? (
                  <Button
                    value={Favorite}
                    onClick={handleChange}
                    style={{
                      color: "red",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    {page.icons}
                  </Button>
                ) : (
                  <Button
                    value={Favorite}
                    onClick={handleChange}
                    style={{
                      color: "red",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    {page.Unfavourite}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favourites;
