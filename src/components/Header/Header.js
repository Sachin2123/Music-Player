import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import "./Header.scss";

const Header = ({ setSearchQuery }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    setSearchQuery(query);
  };

  return (
    <div style={{ backgroundColor: "#121212" }}>
      <div className="title">For You</div>
      <div className="header">
        <div className="input-container">
          <input
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Search Song, Artist"
          />
          <Search className="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
