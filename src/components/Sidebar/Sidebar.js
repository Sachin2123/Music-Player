import React from "react";
import "./Sidebar.scss";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure you've installed this

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Optionally add Font Awesome Spotify icon */}
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
          <li>For You</li>
          <li>Top Tracks</li>
          <li>Favourites</li>
          <li>Recently Played</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
