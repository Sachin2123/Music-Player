import React from "react";
import "./Sidebar.scss";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure you've installed this
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const naviagte = useNavigate();
  const pages = [
    { item: "For You", link: "" },
    { item: "Top Tracks", link: "" },
    { item: "Favourites", link: "/Favourites" },
    { item: "Recently Played", link: "" },
  ];

  const handlenavigation = (link) => {
    console.log(link);
    naviagte(link === "/Favourites" ? "/Favourites" : "");
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <i
          className="fab fa-spotify icon"
          style={{ fontSize: "40px", color: "#1db954" }}
        ></i>

        <h4>Spotify</h4>
      </div>

      {/* Sidebar links */}
      <div className="links">
        <ul>
          {pages.map((page, index) => (
            <li onClick={() => handlenavigation(page.link)} key={index}>
              {page.item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
