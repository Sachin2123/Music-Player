import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import "./Header.scss";

const Header = () => {
  const [search, setSearch] = useState("");


  const HandleChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div style={{ backgroundColor: "#121212" }}>
      <div className="title">For You</div>
      <div className="header">
        <div className="input-container">
          <input
            value={search}
            onChange={HandleChange}
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
