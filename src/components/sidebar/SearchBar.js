// src/components/SearchBar.js

import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"; 

const SearchBar = ({ onSearch, searchQuery }) => {
  return (
    <div className="search-container">
      <input
        className="search-bar"
        placeholder="Search Songs, Artists"
        type="text"
        onChange={onSearch}
        value={searchQuery}
        style={{ color: "white" }}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
