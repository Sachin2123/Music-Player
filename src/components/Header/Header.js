import React from "react";
import { Search } from "lucide-react";
import "./Header.scss";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#121212" }}>
      <div className="title">For You</div>
      <div className="header">
        <div className="input-container">
          <input type="text" placeholder="Search Song, Artist" />
          <Search className="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
