import React from "react";
import "./Favourites.scss";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure you've installed this
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const naviagte = useNavigate();
  const pages = [
    { item: "Kesariya", link: "/ForYou" },
    { item: "Pani Da Rang", link: "" },
    { item: "Khwaja", link: "" },
    { item: "Blue Eyes", link: "" },
  ];

  const handlenavigation = (link) => {
    console.log(link);
    naviagte(link === "/ForYou" ? "/ForYou" : "");
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <h4>Your Favourite Tracks</h4>
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

export default Favourites;
